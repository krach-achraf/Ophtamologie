import {Component, Inject, Vue} from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import {IMaladie} from '@/shared/model/maladie.model';

import MaladieService from './maladie.service';
import AlertService from '@/shared/alert/alert.service';
import StadeService from "@/entities/stade/stade.service";
import {IStade} from "@/shared/model/stade.model";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Maladie extends Vue {
  @Inject('maladieService') private maladieService: () => MaladieService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('stadeService') private stadeService: () => StadeService;

  private removeId: number = null;

  private affecteId: number = null;

  public maladies: IMaladie[] = [];

  public stades: IStade[] = [];

  private stade: IStade;

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMaladies();
  }

  public clear(): void {
    this.retrieveAllMaladies();
  }

  public retrieveAllMaladies(): void {
    this.isFetching = true;
    this.maladieService()
      .retrieve()
      .then(
        res => {
          this.maladies = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public async retrieveAllStades() {
      let response = await this.stadeService().retrieve();
      this.stades = response.data;
      console.log(this.stades);
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IMaladie): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  // preparation de l'affectation
  public prepareAffecte(instance: IMaladie): void{
    this.affecteId = instance.id;
    this.retrieveAllStades();
    if (<any>this.$refs.affecteEntity) {
      (<any>this.$refs.affecteEntity).show();
    }
  }

  public removeMaladie(): void {
    this.maladieService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Maladie is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllMaladies();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  // affecter le stade avec la maladie
  public async affecteStade(instance: IStade){
    this.stade = instance;
    try{
      this.stade.maladie = await this.maladieService().find(this.affecteId);
      await this.stadeService().update(this.stade);
      this.$bvToast.toast("Affectation faite avec succès", {
        toaster: 'b-toaster-top-center',
        title: 'Sucess',
        variant: 'sucess',
        solid: true,
        autoHideDelay: 5000,
      });
      this.closeDialog();
    }catch (e){
      console.log(e);
    }

  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
    (<any>this.$refs.affecteEntity).hide();
  }


}
