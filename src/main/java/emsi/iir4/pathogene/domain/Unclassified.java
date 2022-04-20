package emsi.iir4.pathogene.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Unclassified.
 */
@Entity
@Table(name = "unclassified")
public class Unclassified implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "path")
    private String path;

    @ManyToOne
    @JsonIgnoreProperties(value = { "detection", "patients", "stades" }, allowSetters = true)
    private Maladie maladie;

    @OneToMany(mappedBy = "unclassified")
    @JsonIgnoreProperties(value = { "medecin", "stade", "unclassified" }, allowSetters = true)
    private Set<Classification> classifications = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Unclassified id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public Unclassified code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPath() {
        return this.path;
    }

    public Unclassified path(String path) {
        this.setPath(path);
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Maladie getMaladie() {
        return this.maladie;
    }

    public void setMaladie(Maladie maladie) {
        this.maladie = maladie;
    }

    public Unclassified maladie(Maladie maladie) {
        this.setMaladie(maladie);
        return this;
    }

    public Set<Classification> getClassifications() {
        return this.classifications;
    }

    public void setClassifications(Set<Classification> classifications) {
        if (this.classifications != null) {
            this.classifications.forEach(i -> i.setUnclassified(null));
        }
        if (classifications != null) {
            classifications.forEach(i -> i.setUnclassified(this));
        }
        this.classifications = classifications;
    }

    public Unclassified classifications(Set<Classification> classifications) {
        this.setClassifications(classifications);
        return this;
    }

    public Unclassified addClassification(Classification classification) {
        this.classifications.add(classification);
        classification.setUnclassified(this);
        return this;
    }

    public Unclassified removeClassification(Classification classification) {
        this.classifications.remove(classification);
        classification.setUnclassified(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Unclassified)) {
            return false;
        }
        return id != null && id.equals(((Unclassified) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Unclassified{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", path='" + getPath() + "'" +
            "}";
    }
}
