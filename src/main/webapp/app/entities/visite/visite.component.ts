import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IVisite } from '@/shared/model/visite.model';

import VisiteService from './visite.service';
import AlertService from '@/shared/alert/alert.service';
import AccountService from "@/account/account.service";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Visite extends Vue {
  @Inject('visiteService') private visiteService: () => VisiteService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('accountService') private accountService: () => AccountService;

  private removeId: number = null;

  public visites: IVisite[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllVisites();
  }

  public clear(): void {
    this.retrieveAllVisites();
  }

  public retrieveAllVisites(): void {
    this.isFetching = true;
    this.visiteService()
      .retrieve()
      .then(
        res => {
          this.visites = res.data;
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

  public prepareRemove(instance: IVisite): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeVisite(): void {
    this.visiteService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Visite is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllVisites();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }
  public isSecretaire(): boolean {
    return this.accountService().userAuthorities.includes('SECRETAIRE');
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
