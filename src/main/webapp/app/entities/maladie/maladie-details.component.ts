import { Vue, Inject } from 'vue-property-decorator';
import { IMaladie } from '@/shared/model/maladie.model';
import MaladieService from './maladie.service';
import AlertService from '@/shared/alert/alert.service';
import {IStade} from "@/shared/model/stade.model";

export default class MaladieDetails extends Vue  {
  @Inject('maladieService') private maladieService: () => MaladieService;
  @Inject('alertService') private alertService: () => AlertService;

  private maladie: IMaladie = {};
  private stades: IStade[] = [];

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
        this.stades = this.maladie.stades;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }


  public previousState() {
    this.$router.go(-1);
  }
}
