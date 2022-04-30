import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMaladie } from '@/shared/model/maladie.model';

import MaladieService from './maladie.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Maladie extends Vue {
  @Inject('maladieService') private maladieService: () => MaladieService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public maladies: IMaladie[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMaladies();
  }

  public clear(): void {
    this.retrieveAllMaladies();
  }

  public retrieveAllMaladies(): void {
    this.isFetching = true;
    this.maladieService()
      .retrieve()
      .then(
        res => {
          this.maladies = res.data;
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

  public prepareRemove(instance: IMaladie): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMaladie(): void {
    this.maladieService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Maladie is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllMaladies();
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
