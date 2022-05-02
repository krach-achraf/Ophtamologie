import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ISecretaire } from '@/shared/model/secretaire.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import SecretaireService from './secretaire.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Secretaire extends mixins(JhiDataUtils) {
  @Inject('secretaireService') private secretaireService: () => SecretaireService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public secretaires: ISecretaire[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllSecretaires();
  }

  public clear(): void {
    this.retrieveAllSecretaires();
  }

  public retrieveAllSecretaires(): void {
    this.isFetching = true;
    this.secretaireService()
      .retrieve()
      .then(
        res => {
          this.secretaires = res.data;
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

  public prepareRemove(instance: ISecretaire): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeSecretaire(): void {
    this.secretaireService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Secretaire is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllSecretaires();
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
