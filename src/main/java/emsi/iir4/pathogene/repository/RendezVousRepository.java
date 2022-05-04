package emsi.iir4.pathogene.repository;

import emsi.iir4.pathogene.domain.RendezVous;
import java.util.Set;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the RendezVous entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    Set<RendezVous> findByPatient_UserId(Long id);

    Set<RendezVous> findByMedecin_UserId(Long id);
}
