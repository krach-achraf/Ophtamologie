package emsi.iir4.pathogene.web.rest;

import emsi.iir4.pathogene.domain.Medecin;
import emsi.iir4.pathogene.domain.Patient;
import emsi.iir4.pathogene.domain.RendezVous;
import emsi.iir4.pathogene.domain.User;
import emsi.iir4.pathogene.repository.MedecinRepository;
import emsi.iir4.pathogene.repository.PatientRepository;
import emsi.iir4.pathogene.repository.RendezVousRepository;
import emsi.iir4.pathogene.repository.SecretaireRepository;
import emsi.iir4.pathogene.repository.UserRepository;
import emsi.iir4.pathogene.security.AuthoritiesConstants;
import emsi.iir4.pathogene.security.SecurityUtils;
import emsi.iir4.pathogene.service.MailService;
import emsi.iir4.pathogene.service.UserService;
import emsi.iir4.pathogene.service.dto.AdminUserDTO;
import emsi.iir4.pathogene.service.dto.PasswordChangeDTO;
import emsi.iir4.pathogene.web.rest.errors.*;
import emsi.iir4.pathogene.web.rest.vm.KeyAndPasswordVM;
import emsi.iir4.pathogene.web.rest.vm.ManagedUserVM;
import java.util.*;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private static class AccountResourceException extends RuntimeException {

        private AccountResourceException(String message) {
            super(message);
        }
    }

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;

    private final UserService userService;

    private final MailService mailService;
    private final PatientRepository patientRepository;
    private final SecretaireRepository secretaireRepository;
    private final MedecinRepository medecinRepository;
    private final RendezVousRepository rendezVousRepository;

    public AccountResource(
        UserRepository userRepository,
        UserService userService,
        MailService mailService,
        RendezVousRepository rendezVousRepository,
        PatientRepository patientRepository,
        SecretaireRepository secretaireRepository,
        MedecinRepository medecinRepository
    ) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.mailService = mailService;
        this.rendezVousRepository = rendezVousRepository;
        this.patientRepository = patientRepository;
        this.secretaireRepository = secretaireRepository;
        this.medecinRepository = medecinRepository;
    }

    @PutMapping("/account")
    public void updateAccount(@RequestBody AdminUserDTO userDTO, @RequestBody PasswordChangeDTO passwordChangeDTO) {
        String userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new AccountResourceException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new AccountResourceException("User could not be found");
        }
        if (isPasswordLengthInvalid(passwordChangeDTO.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.updateUser(userDTO);
        userService.changePassword(passwordChangeDTO.getCurrentPassword(), passwordChangeDTO.getNewPassword());
    }

    /**
     * {@code POST  /register} : register the user.
     *
     * @param managedUserVM the managed user View Model.
     * @throws InvalidPasswordException  {@code 400 (Bad Request)} if the password
     *                                   is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is
     *                                   already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is
     *                                   already used.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {
        if (isPasswordLengthInvalid(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
        mailService.sendActivationEmail(user);
        patientRepository.save(new Patient().user(user).nom(user.getLastName()).prenom(user.getFirstName()));
    }

    /**
     * {@code GET  /activate} : activate the registered user.
     *
     * @param key the activation key.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user
     *                          couldn't be activated.
     */
    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this activation key");
        }
    }

    /**
     * {@code GET  /authenticate} : check if the user is authenticated, and return
     * its login.
     *
     * @param request the HTTP request.
     * @return the login if the user is authenticated.
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * {@code GET  /account} : get the current user.
     *
     * @return the current user.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user
     *                          couldn't be returned.
     */
    @GetMapping("/account")
    public AdminUserDTO getAccount() {
        AdminUserDTO userDTO = new AdminUserDTO();
        userDTO =
            userService
                .getUserWithAuthorities()
                .map(AdminUserDTO::new)
                .orElseThrow(() -> new AccountResourceException("User could not be found"));
        if (
            userDTO.getAuthorities().contains(AuthoritiesConstants.MEDECIN) && medecinRepository.findByUserId(userDTO.getId()).isPresent()
        ) {
            if (userDTO.getId() == medecinRepository.findByUserId(userDTO.getId()).get().getUser().getId()) {
                userDTO.setMedecin(medecinRepository.findByUserId(userDTO.getId()).get());
            }
        }

        if (
            userDTO.getAuthorities().contains(AuthoritiesConstants.SECRETAIRE) &&
            secretaireRepository.findByUserId(userDTO.getId()).isPresent()
        ) {
            if (userDTO.getId() == secretaireRepository.findByUserId(userDTO.getId()).get().getUser().getId()) {
                userDTO.setSecretaire(secretaireRepository.findByUserId(userDTO.getId()).get());
            }
        }

        if (
            userDTO.getAuthorities().contains(AuthoritiesConstants.PATIENT) && patientRepository.findByUserId(userDTO.getId()).isPresent()
        ) {
            if (userDTO.getId() == patientRepository.findByUserId(userDTO.getId()).get().getUser().getId()) {
                userDTO.setPatient(patientRepository.findByUserId(userDTO.getId()).get());
            }
        }

        return userDTO;
    }

    @GetMapping("/medecin/patients")
    @PreAuthorize("hasAnyAuthority('" + AuthoritiesConstants.MEDECIN + "','" + AuthoritiesConstants.ADMIN + "')")
    public Set<Patient> getPatients() {
        Set<Patient> patients = new HashSet<>();
        if ((medecinRepository.findByUserId(getAccount().getId())).isPresent()) {
            Set<RendezVous> rdvs = rendezVousRepository.findByMedecin_UserId(getAccount().getId());
            patients.addAll(rdvs.stream().map(RendezVous::getPatient).collect(Collectors.toSet()));
        }
        return patients;
    }

    @GetMapping("/patient/medecins")
    @PreAuthorize("hasAnyAuthority('" + AuthoritiesConstants.PATIENT + "','" + AuthoritiesConstants.ADMIN + "')")
    public Set<Medecin> getMedecins() {
        System.out.println();
        Set<Medecin> medecins = new HashSet<>();
        if ((patientRepository.findByUserId(getAccount().getId())).isPresent()) {
            Set<RendezVous> rdvs = rendezVousRepository.findByPatient_UserId(getAccount().getId());
            medecins.addAll(rdvs.stream().map(RendezVous::getMedecin).collect(Collectors.toSet()));
        }
        return medecins;
    }

    /**
     * {@code POST  /account} : update the current user information.
     *
     * @param userDTO the current user information.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is
     *                                   already used.
     * @throws RuntimeException          {@code 500 (Internal Server Error)} if the
     *                                   user login wasn't found.
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody AdminUserDTO userDTO) {
        String userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new AccountResourceException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new AccountResourceException("User could not be found");
        }
        userService.updateUser(
            userDTO.getFirstName(),
            userDTO.getLastName(),
            userDTO.getEmail(),
            userDTO.getLangKey(),
            userDTO.getImageUrl()
        );
    }

    /**
     * {@code POST  /account/change-password} : changes the current user's password.
     *
     * @param passwordChangeDto current and new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the new
     *                                  password is incorrect.
     */
    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        if (isPasswordLengthInvalid(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    /**
     * {@code POST   /account/reset-password/init} : Send an email to reset the
     * password of the user.
     *
     * @param mail the mail of the user.
     */
    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody String mail) {
        Optional<User> user = userService.requestPasswordReset(mail);
        if (user.isPresent()) {
            mailService.sendPasswordResetMail(user.get());
        } else {
            // Pretend the request has been successful to prevent checking which emails
            // really exist
            // but log that an invalid attempt has been made
            log.warn("Password reset requested for non existing mail");
        }
    }

    /**
     * {@code POST   /account/reset-password/finish} : Finish to reset the password
     * of the user.
     *
     * @param keyAndPassword the generated key and the new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is
     *                                  incorrect.
     * @throws RuntimeException         {@code 500 (Internal Server Error)} if the
     *                                  password could not be reset.
     */
    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
        if (isPasswordLengthInvalid(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> user = userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());

        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this reset key");
        }
    }

    private static boolean isPasswordLengthInvalid(String password) {
        return (
            StringUtils.isEmpty(password) ||
            password.length() < ManagedUserVM.PASSWORD_MIN_LENGTH ||
            password.length() > ManagedUserVM.PASSWORD_MAX_LENGTH
        );
    }
}
