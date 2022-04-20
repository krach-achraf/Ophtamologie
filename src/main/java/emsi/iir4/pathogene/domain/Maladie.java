package emsi.iir4.pathogene.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Maladie.
 */
@Entity
@Table(name = "maladie")
public class Maladie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "nom")
    private String nom;

    @Column(name = "description")
    private String description;

    @JsonIgnoreProperties(value = { "maladie", "patient", "visite" }, allowSetters = true)
    @OneToOne(mappedBy = "maladie")
    private Detection detection;

    @OneToMany(mappedBy = "maladie")
    @JsonIgnoreProperties(value = { "compte", "secretaire", "maladie", "detections" }, allowSetters = true)
    private Set<Patient> patients = new HashSet<>();

    @OneToMany(mappedBy = "maladie")
    @JsonIgnoreProperties(value = { "maladie" }, allowSetters = true)
    private Set<Stade> stades = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Maladie id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public Maladie code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return this.nom;
    }

    public Maladie nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return this.description;
    }

    public Maladie description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Detection getDetection() {
        return this.detection;
    }

    public void setDetection(Detection detection) {
        if (this.detection != null) {
            this.detection.setMaladie(null);
        }
        if (detection != null) {
            detection.setMaladie(this);
        }
        this.detection = detection;
    }

    public Maladie detection(Detection detection) {
        this.setDetection(detection);
        return this;
    }

    public Set<Patient> getPatients() {
        return this.patients;
    }

    public void setPatients(Set<Patient> patients) {
        if (this.patients != null) {
            this.patients.forEach(i -> i.setMaladie(null));
        }
        if (patients != null) {
            patients.forEach(i -> i.setMaladie(this));
        }
        this.patients = patients;
    }

    public Maladie patients(Set<Patient> patients) {
        this.setPatients(patients);
        return this;
    }

    public Maladie addPatient(Patient patient) {
        this.patients.add(patient);
        patient.setMaladie(this);
        return this;
    }

    public Maladie removePatient(Patient patient) {
        this.patients.remove(patient);
        patient.setMaladie(null);
        return this;
    }

    public Set<Stade> getStades() {
        return this.stades;
    }

    public void setStades(Set<Stade> stades) {
        if (this.stades != null) {
            this.stades.forEach(i -> i.setMaladie(null));
        }
        if (stades != null) {
            stades.forEach(i -> i.setMaladie(this));
        }
        this.stades = stades;
    }

    public Maladie stades(Set<Stade> stades) {
        this.setStades(stades);
        return this;
    }

    public Maladie addStade(Stade stade) {
        this.stades.add(stade);
        stade.setMaladie(this);
        return this;
    }

    public Maladie removeStade(Stade stade) {
        this.stades.remove(stade);
        stade.setMaladie(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Maladie)) {
            return false;
        }
        return id != null && id.equals(((Maladie) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Maladie{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", nom='" + getNom() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
