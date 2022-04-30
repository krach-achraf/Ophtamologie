package emsi.iir4.pathogene.repository;

import emsi.iir4.pathogene.domain.Secretaire;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Secretaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SecretaireRepository extends JpaRepository<Secretaire, Long> {}
