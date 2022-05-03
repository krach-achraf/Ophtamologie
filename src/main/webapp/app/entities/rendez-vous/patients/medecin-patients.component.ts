import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import JhiDataUtils from "@/shared/data/data-utils.service";
import AccountService from "@/account/account.service";
import {IPatient} from "@/shared/model/patient.model";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class MedecinPatients extends mixins(JhiDataUtils) {
  @Inject('accountService') private accountService: () => AccountService;

  public patients: IPatient[] = [];

  public mounted(): void {
    this.retrieveAllPatients();
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
}
