import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMedecin } from '@/shared/model/medecin.model';
import MedecinService from './medecin.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class MedecinDetails extends Vue {
  @Inject('medecinService') private medecinService: () => MedecinService;
  @Inject('alertService') private alertService: () => AlertService;

  public medecin: IMedecin = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.medecinId) {
        vm.retrieveMedecin(to.params.medecinId);
      }
    });
  }

  public retrieveMedecin(medecinId) {
    this.medecinService()
      .find(medecinId)
      .then(res => {
        this.medecin = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
