import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRendezVous } from '@/shared/model/rendez-vous.model';

import RendezVousService from './rendez-vous.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class RendezVous extends Vue {
  @Inject('rendezVousService') private rendezVousService: () => RendezVousService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public rendezVous: IRendezVous[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllRendezVouss();
  }

  public clear(): void {
    this.retrieveAllRendezVouss();
  }

  public retrieveAllRendezVouss(): void {
    this.isFetching = true;
    this.rendezVousService()
      .retrieve()
      .then(
        res => {
          this.rendezVous = res.data;
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

  public prepareRemove(instance: IRendezVous): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeRendezVous(): void {
    this.rendezVousService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A RendezVous is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllRendezVouss();
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
