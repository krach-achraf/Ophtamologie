import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import JhiDataUtils from "@/shared/data/data-utils.service";
import AccountService from "@/account/account.service";
import {IPatient} from "@/shared/model/patient.model";
import {Detection, IDetection} from "@/shared/model/detection.model";
import DetectionService from "@/entities/detection/detection.service";
import {IVisite, Visite} from "@/shared/model/visite.model";
import VisiteService from "@/entities/visite/visite.service";

const validations: any = {
  detection: {
    photo: {},
    validation: {},
    stade: {},
  },
};

@Component({
  mixins: [Vue2Filters.mixin],
  validations

})
export default class MedecinPatients extends mixins(JhiDataUtils) {
  @Inject('accountService') private accountService: () => AccountService;
  @Inject('detectionService') private detectionService: () => DetectionService;
  @Inject('visiteService') private visiteService: () => VisiteService;

  public patients: IPatient[] = [];
  public patient: IPatient;
  private detection: IDetection = new Detection();
  private visites: IVisite[] = [];
  private visite: IVisite;
  private idVisite: number = null;

  public mounted(): void {
    this.retrieveAllPatients();
    this.retrieveAllVisites();
  }

  public async retrieveAllPatients() {
    try{
      let patients = await this.accountService().retrievePatients();
      this.patients = patients.data;
      if(this.patients == null || this.patients.length == 0){
        this.$root.$bvToast.toast("Vous n'avez aucun patient", {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'info',
          solid: true,
          autoHideDelay: 5000,
        });
        this.$router.push('/rendez-vous');
      }
    }catch (e){
      console.log(e);
    }
  }

  public async retrieveAllVisites() {
    try{
      let visites = await this.visiteService().retrieve();
      this.visites = visites.data;
    }catch (e){
      console.log(e);
    }
  }

  public prepareDetection(instance: IPatient): void{
    this.patient = instance;
    if (<any>this.$refs.detectionEntity) {
      (<any>this.$refs.detectionEntity).show();
    }
  }

  public async saveDetection(){
    this.detection.date = new Date();
    this.detection.patient = this.patient;
    let response = await this.detectionService().create(this.detection);
    this.detection = response;
    this.visite = await this.visiteService().find(this.idVisite);
    this.visite.detection = this.detection;
    await this.visiteService().update(this.visite);
    this.$root.$bvToast.toast("A detection is created", {
      toaster: 'b-toaster-top-center',
      title: 'Info',
      variant: 'info',
      solid: true,
      autoHideDelay: 5000,
    });
    this.closeDialog();
    if (<any>this.$refs.afficheEntity) {
      (<any>this.$refs.afficheEntity).show();
    }
  }

  public closeDialog(): void {
    (<any>this.$refs.detectionEntity).hide();
    (<any>this.$refs.afficheEntity).hide();
  }

}
