import { Component, Vue, Inject } from 'vue-property-decorator';

import { IUnclassified } from '@/shared/model/unclassified.model';
import UnclassifiedService from './unclassified.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class UnclassifiedDetails extends Vue {
  @Inject('unclassifiedService') private unclassifiedService: () => UnclassifiedService;
  @Inject('alertService') private alertService: () => AlertService;

  public unclassified: IUnclassified = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.unclassifiedId) {
        vm.retrieveUnclassified(to.params.unclassifiedId);
      }
    });
  }

  public retrieveUnclassified(unclassifiedId) {
    this.unclassifiedService()
      .find(unclassifiedId)
      .then(res => {
        this.unclassified = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
