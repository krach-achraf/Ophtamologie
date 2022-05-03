import { Component, Vue, Inject } from 'vue-property-decorator';

import { IStade } from '@/shared/model/stade.model';
import StadeService from './stade.service';
import AlertService from '@/shared/alert/alert.service';
import JhiDataUtils from '@/shared/data/data-utils.service';
import { mixins } from 'vue-class-component';
import { IImage } from '@/shared/model/image.model';

@Component
export default class StadeDetails extends mixins(JhiDataUtils) {
  @Inject('stadeService') private stadeService: () => StadeService;
  @Inject('alertService') private alertService: () => AlertService;

  public stade: IStade = {};
  public images: IImage[] = [];

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.stadeId) {
        vm.retrieveStade(to.params.stadeId);
      }
    });
  }

  public retrieveStade(stadeId) {
    this.stadeService()
      .find(stadeId)
      .then(res => {
        this.stade = res;
        this.images = res.images;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
