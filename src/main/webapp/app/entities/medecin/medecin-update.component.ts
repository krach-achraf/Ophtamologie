import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import CompteService from '@/entities/compte/compte.service';
import { ICompte } from '@/shared/model/compte.model';

import SecretaireService from '@/entities/secretaire/secretaire.service';
import { ISecretaire } from '@/shared/model/secretaire.model';

import { IMedecin, Medecin } from '@/shared/model/medecin.model';
import MedecinService from './medecin.service';

const validations: any = {
  medecin: {
    code: {},
    nom: {},
    numEmp: {},
    prenom: {},
    admin: {},
    expertLevel: {},
  },
};

@Component({
  validations,
})
export default class MedecinUpdate extends Vue {
  @Inject('medecinService') private medecinService: () => MedecinService;
  @Inject('alertService') private alertService: () => AlertService;

  public medecin: IMedecin = new Medecin();

  @Inject('compteService') private compteService: () => CompteService;

  public comptes: ICompte[] = [];

  @Inject('secretaireService') private secretaireService: () => SecretaireService;

  public secretaires: ISecretaire[] = [];
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

  public save(): void {
    this.isSaving = true;
    if (this.medecin.id) {
      this.medecinService()
        .update(this.medecin)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
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
      this.medecinService()
        .create(this.medecin)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Medecin is created with identifier ' + param.id;
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

  public initRelationships(): void {
    this.compteService()
      .retrieve()
      .then(res => {
        this.comptes = res.data;
      });
    this.secretaireService()
      .retrieve()
      .then(res => {
        this.secretaires = res.data;
      });
  }
}
