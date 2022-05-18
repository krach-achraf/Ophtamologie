import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IDetection } from '@/shared/model/detection.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import DetectionService from './detection.service';
import AlertService from '@/shared/alert/alert.service';
import AccountService from "@/account/account.service";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Detection extends mixins(JhiDataUtils) {
  @Inject('detectionService') private detectionService: () => DetectionService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('accountService') private accountService: () => AccountService;

  private removeId: number = null;

  public detections: IDetection[] = [];

  public isFetching = false;

  public mounted(): void {
    if(this.isMedecin())
      this.retrieveAllDetections();
    else
      this.retrievePatientDetections();
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

  public retrievePatientDetections(): void {
    let user = JSON.parse(sessionStorage.getItem('user-info'));
    this.detections = user.patient.detections;
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
        const message = 'A Detection is deleted';
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

  public isMedecin(): boolean {
    return this.accountService().userAuthorities.includes('MEDECIN');
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
