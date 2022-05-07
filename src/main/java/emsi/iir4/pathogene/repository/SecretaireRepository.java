package emsi.iir4.pathogene.repository;

import emsi.iir4.pathogene.domain.Secretaire;
import emsi.iir4.pathogene.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Secretaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SecretaireRepository extends JpaRepository<Secretaire, Long> {
    Optional<Secretaire> findByUserId(Long id);
    Optional<Secretaire> findByUserLogin(String login);
}
