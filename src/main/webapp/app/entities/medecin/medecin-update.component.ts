import {Component, Inject} from 'vue-property-decorator';

import {mixins} from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import AlertService from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';

import SecretaireService from '@/entities/secretaire/secretaire.service';
import {ISecretaire} from '@/shared/model/secretaire.model';

import RendezVousService from '@/entities/rendez-vous/rendez-vous.service';
import {IRendezVous} from '@/shared/model/rendez-vous.model';

import ClassificationService from '@/entities/classification/classification.service';
import {IClassification} from '@/shared/model/classification.model';

import {IMedecin, Medecin} from '@/shared/model/medecin.model';
import MedecinService from './medecin.service';
import UserManagementService from "@/admin/user-management/user-management.service";
import {IUser, User} from "@/shared/model/user.model";

const validations: any = {
  medecin: {
    code: {},
    nom: {},
    numEmp: {},
    prenom: {},
    expertLevel: {},
    photo: {},
    type: {},
    nbrPatients: {},
    rating: {},
    description: {},
  },
  user: {
    login: {},
    email: {},
    password: {},
  }
};

@Component({
  validations,
})
export default class MedecinUpdate extends mixins(JhiDataUtils) {
  @Inject('medecinService') private medecinService: () => MedecinService;
  @Inject('alertService') private alertService: () => AlertService;

  public user: IUser = new User();

  @Inject('userManagementService') private userManagementService: () => UserManagementService;

  public medecin: IMedecin = new Medecin();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('secretaireService') private secretaireService: () => SecretaireService;

  public secretaires: ISecretaire[] = [];

  @Inject('rendezVousService') private rendezVousService: () => RendezVousService;

  public rendezVous: IRendezVous[] = [];

  @Inject('classificationService') private classificationService: () => ClassificationService;

  public classifications: IClassification[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.medecinId) {
        vm.retrieveMedecin(to.params.medecinId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public async save() {
    this.isSaving = true;
    if (this.medecin.id) {
      this.medecinService()
        .update(this.medecin)
        .then(param => {
          this.isSaving = false;
          this.$router.push('/medecin');
          const message = 'A Medecin is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.user.firstName = this.medecin.prenom;
      this.user.lastName = this.medecin.nom;
      try {
        await this.userManagementService().createMedecin({
          user: this.user,
          medecin: this.medecin
        });
        this.isSaving = false;
        this.$router.go(-1);
        const message = 'A Medecin is created';
        this.$root.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Success',
          variant: 'success',
          solid: true,
          autoHideDelay: 5000,
        })
      } catch (e) {
        this.alertService().showHttpError(this, e.response);
      }
    }
  }

  public retrieveMedecin(medecinId): void {
    this.medecinService()
      .find(medecinId)
      .then(res => {
        this.medecin = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.medecin && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.medecin, field)) {
        this.medecin[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.medecin, fieldContentType)) {
        this.medecin[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.secretaireService()
      .retrieve()
      .then(res => {
        this.secretaires = res.data;
      });
    this.rendezVousService()
      .retrieve()
      .then(res => {
        this.rendezVous = res.data;
      });
    this.classificationService()
      .retrieve()
      .then(res => {
        this.classifications = res.data;
      });
  }
}
