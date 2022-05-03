import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import JhiDataUtils from "@/shared/data/data-utils.service";
import AccountService from "@/account/account.service";
import {IMedecin} from "@/shared/model/medecin.model";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class PatientMedecins extends mixins(JhiDataUtils) {
  @Inject('accountService') private accountService: () => AccountService;

  public medecins: IMedecin[] = [];

  public mounted(): void {
    this.retrieveAllMedecins();
  }

  public async retrieveAllMedecins() {
    try{
      let medecins = await this.accountService().retrieveMedecins();
      this.medecins = medecins.data;
      if(this.medecins == null || this.medecins.length == 0){
        this.$root.$bvToast.toast("Vous n'avez aucun medecin", {
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
