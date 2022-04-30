import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMedecin } from '@/shared/model/medecin.model';

import MedecinService from './medecin.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Medecin extends Vue {
  @Inject('medecinService') private medecinService: () => MedecinService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public medecins: IMedecin[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMedecins();
  }

  public clear(): void {
    this.retrieveAllMedecins();
  }

  public retrieveAllMedecins(): void {
    this.isFetching = true;
    this.medecinService()
      .retrieve()
      .then(
        res => {
          this.medecins = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IMedecin): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMedecin(): void {
    this.medecinService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Medecin is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllMedecins();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
