package emsi.iir4.pathogene.repository;

import emsi.iir4.pathogene.domain.Unclassified;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Unclassified entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnclassifiedRepository extends JpaRepository<Unclassified, Long> {}
