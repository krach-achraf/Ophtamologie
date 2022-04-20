import { Component, Vue, Inject } from 'vue-property-decorator';

import { IStade } from '@/shared/model/stade.model';
import StadeService from './stade.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class StadeDetails extends Vue {
  @Inject('stadeService') private stadeService: () => StadeService;
  @Inject('alertService') private alertService: () => AlertService;

  public stade: IStade = {};

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
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
