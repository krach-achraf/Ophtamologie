import { Component, Vue, Inject } from 'vue-property-decorator';
import { IMaladie } from '@/shared/model/maladie.model';
import MaladieService from './maladie.service';
import AlertService from '@/shared/alert/alert.service';
import {IStade} from "@/shared/model/stade.model";
import AccountService from "@/account/account.service";

@Component
export default class MaladieDetails extends Vue  {
  @Inject('maladieService') private maladieService: () => MaladieService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('accountService') private accountService: () => AccountService;

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

  public isMedecin(): boolean {
    return this.accountService().userAuthorities.includes('MEDECIN');
  }

  public previousState() {
    this.$router.go(-1);
  }
}
