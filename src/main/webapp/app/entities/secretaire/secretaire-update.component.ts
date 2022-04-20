import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import CompteService from '@/entities/compte/compte.service';
import { ICompte } from '@/shared/model/compte.model';

import PatientService from '@/entities/patient/patient.service';
import { IPatient } from '@/shared/model/patient.model';

import MedecinService from '@/entities/medecin/medecin.service';
import { IMedecin } from '@/shared/model/medecin.model';

import { ISecretaire, Secretaire } from '@/shared/model/secretaire.model';
import SecretaireService from './secretaire.service';

const validations: any = {
  secretaire: {
    code: {},
    nom: {},
    numEmp: {},
    prenom: {},
    admin: {},
  },
};

@Component({
  validations,
})
export default class SecretaireUpdate extends Vue {
  @Inject('secretaireService') private secretaireService: () => SecretaireService;
  @Inject('alertService') private alertService: () => AlertService;

  public secretaire: ISecretaire = new Secretaire();

  @Inject('compteService') private compteService: () => CompteService;

  public comptes: ICompte[] = [];

  @Inject('patientService') private patientService: () => PatientService;

  public patients: IPatient[] = [];

  @Inject('medecinService') private medecinService: () => MedecinService;

  public medecins: IMedecin[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.secretaireId) {
        vm.retrieveSecretaire(to.params.secretaireId);
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

  public save(): void {
    this.isSaving = true;
    if (this.secretaire.id) {
      this.secretaireService()
        .update(this.secretaire)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Secretaire is updated with identifier ' + param.id;
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
      this.secretaireService()
        .create(this.secretaire)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Secretaire is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveSecretaire(secretaireId): void {
    this.secretaireService()
      .find(secretaireId)
      .then(res => {
        this.secretaire = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.compteService()
      .retrieve()
      .then(res => {
        this.comptes = res.data;
      });
    this.patientService()
      .retrieve()
      .then(res => {
        this.patients = res.data;
      });
    this.medecinService()
      .retrieve()
      .then(res => {
        this.medecins = res.data;
      });
  }
}
