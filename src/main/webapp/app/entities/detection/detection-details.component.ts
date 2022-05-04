import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IDetection } from '@/shared/model/detection.model';
import DetectionService from './detection.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class DetectionDetails extends mixins(JhiDataUtils) {
  @Inject('detectionService') private detectionService: () => DetectionService;
  @Inject('alertService') private alertService: () => AlertService;

  public detection: IDetection = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.detectionId) {
        vm.retrieveDetection(to.params.detectionId);
      }
    });
  }

  public retrieveDetection(detectionId) {
    this.detectionService()
      .find(detectionId)
      .then(res => {
        this.detection = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
