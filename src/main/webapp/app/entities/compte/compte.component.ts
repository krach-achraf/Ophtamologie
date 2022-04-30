import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICompte } from '@/shared/model/compte.model';

import CompteService from './compte.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Compte extends Vue {
  @Inject('compteService') private compteService: () => CompteService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public comptes: ICompte[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllComptes();
  }

  public clear(): void {
    this.retrieveAllComptes();
  }

  public retrieveAllComptes(): void {
    this.isFetching = true;
    this.compteService()
      .retrieve()
      .then(
        res => {
          this.comptes = res.data;
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

  public prepareRemove(instance: ICompte): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCompte(): void {
    this.compteService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Compte is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllComptes();
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
