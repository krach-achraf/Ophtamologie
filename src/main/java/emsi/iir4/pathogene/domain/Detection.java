package emsi.iir4.pathogene.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Detection.
 */
@Entity
@Table(name = "detection")
public class Detection implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "image")
    private String image;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "validation")
    private Boolean validation;

    @Column(name = "stade")
    private String stade;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "description")
    private String description;

    @JsonIgnoreProperties(value = { "detection", "patients", "stades" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Maladie maladie;

    @ManyToOne
    @JsonIgnoreProperties(value = { "compte", "secretaire", "maladie", "detections" }, allowSetters = true)
    private Patient patient;

    @JsonIgnoreProperties(value = { "rendezVous", "detection" }, allowSetters = true)
    @OneToOne(mappedBy = "detection")
    private Visite visite;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Detection id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return this.image;
    }

    public Detection image(String image) {
        this.setImage(image);
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCode() {
        return this.code;
    }

    public Detection code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Boolean getValidation() {
        return this.validation;
    }

    public Detection validation(Boolean validation) {
        this.setValidation(validation);
        return this;
    }

    public void setValidation(Boolean validation) {
        this.validation = validation;
    }

    public String getStade() {
        return this.stade;
    }

    public Detection stade(String stade) {
        this.setStade(stade);
        return this;
    }

    public void setStade(String stade) {
        this.stade = stade;
    }

    public ZonedDateTime getDate() {
        return this.date;
    }

    public Detection date(ZonedDateTime date) {
        this.setDate(date);
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getDescription() {
        return this.description;
    }

    public Detection description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Maladie getMaladie() {
        return this.maladie;
    }

    public void setMaladie(Maladie maladie) {
        this.maladie = maladie;
    }

    public Detection maladie(Maladie maladie) {
        this.setMaladie(maladie);
        return this;
    }

    public Patient getPatient() {
        return this.patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Detection patient(Patient patient) {
        this.setPatient(patient);
        return this;
    }

    public Visite getVisite() {
        return this.visite;
    }

    public void setVisite(Visite visite) {
        if (this.visite != null) {
            this.visite.setDetection(null);
        }
        if (visite != null) {
            visite.setDetection(this);
        }
        this.visite = visite;
    }

    public Detection visite(Visite visite) {
        this.setVisite(visite);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Detection)) {
            return false;
        }
        return id != null && id.equals(((Detection) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Detection{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", code='" + getCode() + "'" +
            ", validation='" + getValidation() + "'" +
            ", stade='" + getStade() + "'" +
            ", date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
