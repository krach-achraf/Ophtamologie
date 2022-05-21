package emsi.iir4.pathogene.domain;

import emsi.iir4.pathogene.domain.enumeration.Genre;
import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Patient.class)
public abstract class Patient_ {

	public static volatile SingularAttribute<Patient, String> code;
	public static volatile SingularAttribute<Patient, LocalDate> dateNaissance;
	public static volatile SingularAttribute<Patient, Double> poids;
	public static volatile SingularAttribute<Patient, byte[]> photo;
	public static volatile SingularAttribute<Patient, Secretaire> secretaire;
	public static volatile SingularAttribute<Patient, String> telephone;
	public static volatile SingularAttribute<Patient, Stade> stade;
	public static volatile SetAttribute<Patient, RendezVous> rendezVous;
	public static volatile SingularAttribute<Patient, String> nom;
	public static volatile SingularAttribute<Patient, Double> taille;
	public static volatile SingularAttribute<Patient, String> adresse;
	public static volatile SingularAttribute<Patient, Genre> genre;
	public static volatile SingularAttribute<Patient, Long> id;
	public static volatile SingularAttribute<Patient, String> prenom;
	public static volatile SingularAttribute<Patient, String> photoContentType;
	public static volatile SingularAttribute<Patient, User> user;
	public static volatile SetAttribute<Patient, Detection> detections;

	public static final String CODE = "code";
	public static final String DATE_NAISSANCE = "dateNaissance";
	public static final String POIDS = "poids";
	public static final String PHOTO = "photo";
	public static final String SECRETAIRE = "secretaire";
	public static final String TELEPHONE = "telephone";
	public static final String STADE = "stade";
	public static final String RENDEZ_VOUS = "rendezVous";
	public static final String NOM = "nom";
	public static final String TAILLE = "taille";
	public static final String ADRESSE = "adresse";
	public static final String GENRE = "genre";
	public static final String ID = "id";
	public static final String PRENOM = "prenom";
	public static final String PHOTO_CONTENT_TYPE = "photoContentType";
	public static final String USER = "user";
	public static final String DETECTIONS = "detections";

}

