package emsi.iir4.pathogene.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Medecin.
 */
@Entity
@Table(name = "medecin")
public class Medecin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "nom")
    private String nom;

    @Column(name = "num_emp")
    private String numEmp;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "admin")
    private Boolean admin;

    @Column(name = "expert_level")
    private Integer expertLevel;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "patients", "medecins" }, allowSetters = true)
    private Secretaire secretaire;

    @OneToMany(mappedBy = "medecin")
    @JsonIgnoreProperties(value = { "patient", "medecin", "visite" }, allowSetters = true)
    private Set<RendezVous> rendezVous = new HashSet<>();

    @OneToMany(mappedBy = "medecin")
    @JsonIgnoreProperties(value = { "medecin", "stade", "unclassified" }, allowSetters = true)
    private Set<Classification> classifications = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Medecin id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public Medecin code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return this.nom;
    }

    public Medecin nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNumEmp() {
        return this.numEmp;
    }

    public Medecin numEmp(String numEmp) {
        this.setNumEmp(numEmp);
        return this;
    }

    public void setNumEmp(String numEmp) {
        this.numEmp = numEmp;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Medecin prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Boolean getAdmin() {
        return this.admin;
    }

    public Medecin admin(Boolean admin) {
        this.setAdmin(admin);
        return this;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public Integer getExpertLevel() {
        return this.expertLevel;
    }

    public Medecin expertLevel(Integer expertLevel) {
        this.setExpertLevel(expertLevel);
        return this;
    }

    public void setExpertLevel(Integer expertLevel) {
        this.expertLevel = expertLevel;
    }

    public byte[] getPhoto() {
        return this.photo;
    }

    public Medecin photo(byte[] photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return this.photoContentType;
    }

    public Medecin photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Medecin user(User user) {
        this.setUser(user);
        return this;
    }

    public Secretaire getSecretaire() {
        return this.secretaire;
    }

    public void setSecretaire(Secretaire secretaire) {
        this.secretaire = secretaire;
    }

    public Medecin secretaire(Secretaire secretaire) {
        this.setSecretaire(secretaire);
        return this;
    }

    public Set<RendezVous> getRendezVous() {
        return this.rendezVous;
    }

    public void setRendezVous(Set<RendezVous> rendezVous) {
        if (this.rendezVous != null) {
            this.rendezVous.forEach(i -> i.setMedecin(null));
        }
        if (rendezVous != null) {
            rendezVous.forEach(i -> i.setMedecin(this));
        }
        this.rendezVous = rendezVous;
    }

    public Medecin rendezVous(Set<RendezVous> rendezVous) {
        this.setRendezVous(rendezVous);
        return this;
    }

    public Medecin addRendezVous(RendezVous rendezVous) {
        this.rendezVous.add(rendezVous);
        rendezVous.setMedecin(this);
        return this;
    }

    public Medecin removeRendezVous(RendezVous rendezVous) {
        this.rendezVous.remove(rendezVous);
        rendezVous.setMedecin(null);
        return this;
    }

    public Set<Classification> getClassifications() {
        return this.classifications;
    }

    public void setClassifications(Set<Classification> classifications) {
        if (this.classifications != null) {
            this.classifications.forEach(i -> i.setMedecin(null));
        }
        if (classifications != null) {
            classifications.forEach(i -> i.setMedecin(this));
        }
        this.classifications = classifications;
    }

    public Medecin classifications(Set<Classification> classifications) {
        this.setClassifications(classifications);
        return this;
    }

    public Medecin addClassification(Classification classification) {
        this.classifications.add(classification);
        classification.setMedecin(this);
        return this;
    }

    public Medecin removeClassification(Classification classification) {
        this.classifications.remove(classification);
        classification.setMedecin(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Medecin)) {
            return false;
        }
        return id != null && id.equals(((Medecin) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Medecin{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", nom='" + getNom() + "'" +
            ", numEmp='" + getNumEmp() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", admin='" + getAdmin() + "'" +
            ", expertLevel=" + getExpertLevel() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            "}";
    }
}
