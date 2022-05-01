import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import MedecinService from './medecin/medecin.service';
import SecretaireService from './secretaire/secretaire.service';
import PatientService from './patient/patient.service';
import DetectionService from './detection/detection.service';
import RendezVousService from './rendez-vous/rendez-vous.service';
import VisiteService from './visite/visite.service';
import CompteService from './compte/compte.service';
import MaladieService from './maladie/maladie.service';
import ClassificationService from './classification/classification.service';
import ImageService from './image/image.service';
import UnclassifiedService from './unclassified/unclassified.service';
import StadeService from './stade/stade.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('medecinService') private medecinService = () => new MedecinService();
  @Provide('secretaireService') private secretaireService = () => new SecretaireService();
  @Provide('patientService') private patientService = () => new PatientService();
  @Provide('detectionService') private detectionService = () => new DetectionService();
  @Provide('rendezVousService') private rendezVousService = () => new RendezVousService();
  @Provide('visiteService') private visiteService = () => new VisiteService();
  @Provide('compteService') private compteService = () => new CompteService();
  @Provide('maladieService') private maladieService = () => new MaladieService();
  @Provide('classificationService') private classificationService = () => new ClassificationService();
  @Provide('imageService') private imageService = () => new ImageService();
  @Provide('unclassifiedService') private unclassifiedService = () => new UnclassifiedService();
  @Provide('stadeService') private stadeService = () => new StadeService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
