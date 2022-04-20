import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMaladie } from '@/shared/model/maladie.model';
import MaladieService from './maladie.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class MaladieDetails extends Vue {
  @Inject('maladieService') private maladieService: () => MaladieService;
  @Inject('alertService') private alertService: () => AlertService;

  public maladie: IMaladie = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.maladieId) {
        vm.retrieveMaladie(to.params.maladieId);
      }
    });
  }

  public retrieveMaladie(maladieId) {
    this.maladieService()
      .find(maladieId)
      .then(res => {
        this.maladie = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
