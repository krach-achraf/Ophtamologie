import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IUnclassified } from '@/shared/model/unclassified.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import UnclassifiedService from './unclassified.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Unclassified extends mixins(JhiDataUtils) {
  @Inject('unclassifiedService') private unclassifiedService: () => UnclassifiedService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public unclassifieds: IUnclassified[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllUnclassifieds();
  }

  public clear(): void {
    this.retrieveAllUnclassifieds();
  }

  public retrieveAllUnclassifieds(): void {
    this.isFetching = true;
    this.unclassifiedService()
      .retrieve()
      .then(
        res => {
          this.unclassifieds = res.data;
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

  public prepareRemove(instance: IUnclassified): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeUnclassified(): void {
    this.unclassifiedService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Unclassified is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllUnclassifieds();
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
