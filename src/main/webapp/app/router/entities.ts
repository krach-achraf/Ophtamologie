import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Medecin = () => import('@/entities/medecin/medecin.vue');
// prettier-ignore
const MedecinUpdate = () => import('@/entities/medecin/medecin-update.vue');
// prettier-ignore
const MedecinDetails = () => import('@/entities/medecin/medecin-details.vue');
// prettier-ignore
const Secretaire = () => import('@/entities/secretaire/secretaire.vue');
// prettier-ignore
const SecretaireUpdate = () => import('@/entities/secretaire/secretaire-update.vue');
// prettier-ignore
const SecretaireDetails = () => import('@/entities/secretaire/secretaire-details.vue');
// prettier-ignore
const Patient = () => import('@/entities/patient/patient.vue');
// prettier-ignore
const PatientUpdate = () => import('@/entities/patient/patient-update.vue');
// prettier-ignore
const PatientDetails = () => import('@/entities/patient/patient-details.vue');
// prettier-ignore
const Detection = () => import('@/entities/detection/detection.vue');
// prettier-ignore
const DetectionUpdate = () => import('@/entities/detection/detection-update.vue');
// prettier-ignore
const DetectionDetails = () => import('@/entities/detection/detection-details.vue');
// prettier-ignore
const RendezVous = () => import('@/entities/rendez-vous/rendez-vous.vue');
// prettier-ignore
const Visite = () => import('@/entities/visite/visite.vue');
// prettier-ignore
const VisiteUpdate = () => import('@/entities/visite/visite-update.vue');
// prettier-ignore
const VisiteDetails = () => import('@/entities/visite/visite-details.vue');
// prettier-ignore
const Compte = () => import('@/entities/compte/compte.vue');
// prettier-ignore
const CompteUpdate = () => import('@/entities/compte/compte-update.vue');
// prettier-ignore
const CompteDetails = () => import('@/entities/compte/compte-details.vue');
// prettier-ignore
const Maladie = () => import('@/entities/maladie/maladie.vue');
// prettier-ignore
const MaladieUpdate = () => import('@/entities/maladie/maladie-update.vue');
// prettier-ignore
const MaladieDetails = () => import('@/entities/maladie/maladie-details.vue');
// prettier-ignore
const Classification = () => import('@/entities/classification/classification.vue');
// prettier-ignore
const ClassificationUpdate = () => import('@/entities/classification/classification-update.vue');
// prettier-ignore
const ClassificationDetails = () => import('@/entities/classification/classification-details.vue');
// prettier-ignore
const Image = () => import('@/entities/image/image.vue');
// prettier-ignore
const ImageUpdate = () => import('@/entities/image/image-update.vue');
// prettier-ignore
const ImageDetails = () => import('@/entities/image/image-details.vue');
// prettier-ignore
const Unclassified = () => import('@/entities/unclassified/unclassified.vue');
// prettier-ignore
const UnclassifiedUpdate = () => import('@/entities/unclassified/unclassified-update.vue');
// prettier-ignore
const UnclassifiedDetails = () => import('@/entities/unclassified/unclassified-details.vue');
// prettier-ignore
const Stade = () => import('@/entities/stade/stade.vue');
// prettier-ignore
const StadeUpdate = () => import('@/entities/stade/stade-update.vue');
// prettier-ignore
const StadeDetails = () => import('@/entities/stade/stade-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here
const PatientMedecins = () => import('@/entities/rendez-vous/medecins/patient-medecins.vue');
const MedecinPatients = () => import('@/entities/rendez-vous/patients/medecin-patients.vue');

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'medecin',
      name: 'Medecin',
      component: Medecin,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'medecin/new',
      name: 'MedecinCreate',
      component: MedecinUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'medecin/:medecinId/edit',
      name: 'MedecinEdit',
      component: MedecinUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'medecin/:medecinId/view',
      name: 'MedecinView',
      component: MedecinDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'secretaire',
      name: 'Secretaire',
      component: Secretaire,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'secretaire/new',
      name: 'SecretaireCreate',
      component: SecretaireUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'secretaire/:secretaireId/edit',
      name: 'SecretaireEdit',
      component: SecretaireUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'secretaire/:secretaireId/view',
      name: 'SecretaireView',
      component: SecretaireDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'patient',
      name: 'Patient',
      component: Patient,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'patient/new',
      name: 'PatientCreate',
      component: PatientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'patient/:patientId/edit',
      name: 'PatientEdit',
      component: PatientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'patient/:patientId/view',
      name: 'PatientView',
      component: PatientDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'detection',
      name: 'Detection',
      component: Detection,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'detection/new',
      name: 'DetectionCreate',
      component: DetectionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'detection/:detectionId/edit',
      name: 'DetectionEdit',
      component: DetectionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'detection/:detectionId/view',
      name: 'DetectionView',
      component: DetectionDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'rendez-vous',
      name: 'RendezVous',
      component: RendezVous,
      meta: { authorities: [Authority.MEDECIN, Authority.PATIENT, Authority.SECRETAIRE] },
    },
    {
      path: 'patient/medecins',
      name: 'PatientMedecins',
      component: PatientMedecins,
      meta: { authorities: [Authority.PATIENT] },
    },
    {
      path: 'medecin/patients',
      name: 'MedecinPatients',
      component: MedecinPatients,
      meta: { authorities: [Authority.MEDECIN] },
    },
    {
      path: 'visite',
      name: 'Visite',
      component: Visite,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'visite/new',
      name: 'VisiteCreate',
      component: VisiteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'visite/:visiteId/edit',
      name: 'VisiteEdit',
      component: VisiteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'visite/:visiteId/view',
      name: 'VisiteView',
      component: VisiteDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'compte',
      name: 'Compte',
      component: Compte,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'compte/new',
      name: 'CompteCreate',
      component: CompteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'compte/:compteId/edit',
      name: 'CompteEdit',
      component: CompteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'compte/:compteId/view',
      name: 'CompteView',
      component: CompteDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'maladie',
      name: 'Maladie',
      component: Maladie,
      meta: { authorities: [Authority.MEDECIN] },
    },
    {
      path: 'maladie/new',
      name: 'MaladieCreate',
      component: MaladieUpdate,
      meta: { authorities: [Authority.MEDECIN] },
    },
    {
      path: 'maladie/:maladieId/edit',
      name: 'MaladieEdit',
      component: MaladieUpdate,
      meta: { authorities: [Authority.MEDECIN] },
    },
    {
      path: 'maladie/:maladieId/view',
      name: 'MaladieView',
      component: MaladieDetails,
      meta: { authorities: [Authority.MEDECIN] },
    },
    {
      path: 'classification',
      name: 'Classification',
      component: Classification,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'classification/new',
      name: 'ClassificationCreate',
      component: ClassificationUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'classification/:classificationId/edit',
      name: 'ClassificationEdit',
      component: ClassificationUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'classification/:classificationId/view',
      name: 'ClassificationView',
      component: ClassificationDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'image',
      name: 'Image',
      component: Image,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'image/new',
      name: 'ImageCreate',
      component: ImageUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'image/:imageId/edit',
      name: 'ImageEdit',
      component: ImageUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'image/:imageId/view',
      name: 'ImageView',
      component: ImageDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'unclassified',
      name: 'Unclassified',
      component: Unclassified,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'unclassified/new',
      name: 'UnclassifiedCreate',
      component: UnclassifiedUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'unclassified/:unclassifiedId/edit',
      name: 'UnclassifiedEdit',
      component: UnclassifiedUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'unclassified/:unclassifiedId/view',
      name: 'UnclassifiedView',
      component: UnclassifiedDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'stade',
      name: 'Stade',
      component: Stade,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'stade/new',
      name: 'StadeCreate',
      component: StadeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'stade/:stadeId/edit',
      name: 'StadeEdit',
      component: StadeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'stade/:stadeId/view',
      name: 'StadeView',
      component: StadeDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
