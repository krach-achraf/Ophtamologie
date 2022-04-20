import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IClassification } from '@/shared/model/classification.model';

import ClassificationService from './classification.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Classification extends Vue {
  @Inject('classificationService') private classificationService: () => ClassificationService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public classifications: IClassification[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllClassifications();
  }

  public clear(): void {
    this.retrieveAllClassifications();
  }

  public retrieveAllClassifications(): void {
    this.isFetching = true;
    this.classificationService()
      .retrieve()
      .then(
        res => {
          this.classifications = res.data;
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

  public prepareRemove(instance: IClassification): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeClassification(): void {
    this.classificationService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Classification is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllClassifications();
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
