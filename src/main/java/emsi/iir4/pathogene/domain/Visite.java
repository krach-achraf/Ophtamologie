package emsi.iir4.pathogene.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Visite.
 */
@Entity
@Table(name = "visite")
public class Visite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "date")
    private LocalDate date;

    @JsonIgnoreProperties(value = { "patient", "medecin" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private RendezVous rendezVous;

    @JsonIgnoreProperties(value = { "maladie", "patient", "visite" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Detection detection;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Visite id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public Visite code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Visite date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public RendezVous getRendezVous() {
        return this.rendezVous;
    }

    public void setRendezVous(RendezVous rendezVous) {
        this.rendezVous = rendezVous;
    }

    public Visite rendezVous(RendezVous rendezVous) {
        this.setRendezVous(rendezVous);
        return this;
    }

    public Detection getDetection() {
        return this.detection;
    }

    public void setDetection(Detection detection) {
        this.detection = detection;
    }

    public Visite detection(Detection detection) {
        this.setDetection(detection);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Visite)) {
            return false;
        }
        return id != null && id.equals(((Visite) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Visite{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
