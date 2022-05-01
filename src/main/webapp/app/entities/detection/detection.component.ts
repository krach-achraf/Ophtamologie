import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IDetection } from '@/shared/model/detection.model';

import DetectionService from './detection.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Detection extends Vue {
  @Inject('detectionService') private detectionService: () => DetectionService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public detections: IDetection[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllDetections();
  }

  public clear(): void {
    this.retrieveAllDetections();
  }

  public retrieveAllDetections(): void {
    this.isFetching = true;
    this.detectionService()
      .retrieve()
      .then(
        res => {
          this.detections = res.data;
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

  public prepareRemove(instance: IDetection): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeDetection(): void {
    this.detectionService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Detection is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllDetections();
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
