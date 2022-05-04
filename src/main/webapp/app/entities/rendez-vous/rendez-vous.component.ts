import {Component, Vue, Inject} from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import {IRendezVous, RendezVous} from '@/shared/model/rendez-vous.model';
import FullCalendar from "@fullcalendar/vue";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import RendezVousService from './rendez-vous.service';
import AlertService from '@/shared/alert/alert.service';
import PatientService from "@/entities/patient/patient.service";
import {IPatient} from "@/shared/model/patient.model";
import MedecinService from "@/entities/medecin/medecin.service";
import {IMedecin} from "@/shared/model/medecin.model";
import AccountService from "@/account/account.service";

const validations: any = {
  rendezVous: {
    code: {},
  },
};

@Component({
  mixins: [Vue2Filters.mixin],
  validations,
  components: {
    FullCalendar
  }
})
export default class RendezVouss extends Vue {
  @Inject('rendezVousService') private rendezVousService: () => RendezVousService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('patientService') private patientService: () => PatientService;
  @Inject('medecinService') private medecinService: () => MedecinService;
  @Inject('accountService') private accountService: () => AccountService;

  public rendezVouss: IRendezVous[] = [];
  public rendezVous: IRendezVous;
  public idPatient: number = null;
  public idMedecin: number = null;
  public patients: IPatient[] = [];
  public patient: IPatient;
  public medecins: IMedecin[] = [];
  public medecin: IMedecin;
  private idRdv: number = null;

  public calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    locale: "fr",
    headerToolbar: {
      left: "prev today next",
      center: "title",
      right: "timeGridDay,timeGridWeek,dayGridMonth,listWeek",
    },
    buttonText: {
      today: "Ajourd'hui",
      month: "Mois",
      week: "Semaine",
      day: "Jour",
      list: "Liste",
    },
    hiddenDays: [0],
    selectable: true,
    editable: true,
    events: [],
    select: this.selectDate,
    eventClick: this.eventClick,
    eventDrop: this.changeDate,
  };

  public mounted(): void {
    if (this.isSecretaire()) {
      this.retrieveAllRendezVouss();
    } else if (this.isMedecin()) {
      this.calendarOptions.selectable = false;
      this.calendarOptions.editable = false;
      let medecin = JSON.parse(sessionStorage.getItem('user-info'));
      this.medecin = medecin.medecin;
      this.retrieveAllRendezVousMedecin();
    } else if (this.isPatient()) {
      this.calendarOptions.editable = false;
      let patient = JSON.parse(sessionStorage.getItem('user-info'));
      this.patient = patient.patient;
      this.retrieveAllRendezVousPatient();
    }
    this.retrievePatientsMedecins();
  }

  // recuperer tous les rdvs
  public async retrieveAllRendezVouss() {
    try {
      this.idRdv = null;
      this.idPatient = null;
      this.idMedecin = null;
      this.calendarOptions.events = [];
      this.rendezVous = new RendezVous();
      let ev = await this.rendezVousService().retrieve();
      this.rendezVouss = ev.data;
      if (this.rendezVouss  != null) {
        for (let i = 0; i < this.rendezVouss.length; i++) {
          if (this.rendezVouss[i].status == "validé")
            this.calendarOptions.events.push({
              id: this.rendezVouss[i].id,
              title: `M: ${this.rendezVouss[i].medecin.nom} P: ${this.rendezVouss[i].patient.nom}`,
              start: this.rendezVouss[i].date,
              color: "green"
            })
          else
            this.calendarOptions.events.push({
              id: this.rendezVouss[i].id,
              title: `M: ${this.rendezVouss[i].medecin.nom} P: ${this.rendezVouss[i].patient.nom}`,
              start: this.rendezVouss[i].date,
              color: "orange"
            })
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  // recuperer tous les rdvs d'un medecin
  public async retrieveAllRendezVousMedecin() {
    try {
      this.calendarOptions.events = [];
      this.rendezVouss = this.medecin.rendezVous
      if (this.rendezVouss != null) {
        for (let i = 0; i < this.rendezVouss.length; i++) {
          if (this.rendezVouss[i].status == "validé")
            this.calendarOptions.events.push({
              id: this.rendezVouss[i].id,
              title: `P: ${this.rendezVouss[i].patient.nom}`,
              start: this.rendezVouss[i].date,
              color: "green"
            })
          else
            this.calendarOptions.events.push({
              id: this.rendezVouss[i].id,
              title: `P: ${this.rendezVouss[i].patient.nom}`,
              start: this.rendezVouss[i].date,
              color: "orange"
            })
        }
      } else
        this.$root.$bvToast.toast("Vous n'avez aucun rendez-vous", {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'info',
          solid: true,
          autoHideDelay: 5000,
        });
    } catch (e) {
      console.log(e);
    }
  }

  // recuperer tous les rdvs d'un patient
  public async retrieveAllRendezVousPatient() {
    try {
      this.idRdv = null;
      this.idMedecin = null;
      this.calendarOptions.events = [];
      this.rendezVous = new RendezVous();
      this.rendezVouss = this.patient.rendezVous;
      if (this.rendezVouss != null) {
        for (let i = 0; i < this.rendezVouss.length; i++) {
          if (this.rendezVouss[i].status == "validé")
            this.calendarOptions.events.push({
              id: this.rendezVouss[i].id,
              title: `M: ${this.rendezVouss[i].medecin.nom}`,
              start: this.rendezVouss[i].date,
              color: "green"
            })
          else
            this.calendarOptions.events.push({
              id: this.rendezVouss[i].id,
              title: `M: ${this.rendezVouss[i].medecin.nom}`,
              start: this.rendezVouss[i].date,
              color: "orange"
            })
        }
      } else
        this.$root.$bvToast.toast("Vous n'avez aucun rendez-vous", {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'info',
          solid: true,
          autoHideDelay: 5000,
        });
    } catch (e) {
      console.log(e);
    }
  }

  // recuperer tous les medecins et les patients
  public async retrievePatientsMedecins() {
    try {
      let dataPatients = await this.patientService().retrieve();
      let dataMedecins = await this.medecinService().retrieve();
      this.patients = dataPatients.data;
      this.medecins = dataMedecins.data;
    } catch (e) {
      console.log(e);
    }
  }

  // ajourner un rdv
  public async changeDate(selectionInfo) {
    try {
      if (this.validDate(selectionInfo.event.start)) {
        this.rendezVous = await this.rendezVousService().find(selectionInfo.event.id);
        this.rendezVous.date = selectionInfo.event.start;
        await this.rendezVousService().update(this.rendezVous);
        this.$root.$bvToast.toast('Rendez-vous ajourné avec success', {
          toaster: 'b-toaster-top-center',
          title: 'Success',
          variant: 'success',
          solid: true,
          autoHideDelay: 5000,
        });
      } else this.alertService().showError(this, 'Veuillez saisir une date convenable!')
    } catch (e) {
      console.log(e);
    }
    this.retrieveAllRendezVouss();
  }

  // sauvegarder un rdv
  public async save() {
    try {
      if(this.isPatient()){
        this.rendezVous.patient = this.patient;
        this.rendezVous.status = 'en attente';
      }else if(this.isSecretaire()){
        this.rendezVous.patient = await this.patientService().find(this.idPatient);
        this.rendezVous.status = 'validé';
      }
      this.rendezVous.medecin = await this.medecinService().find(this.idMedecin);
      console.log(this.rendezVous);
      await this.rendezVousService().create(this.rendezVous);
      (<any>this.$refs.createEntity).hide();
      this.$root.$bvToast.toast('Rendez-vous ajouté avec success', {
        toaster: 'b-toaster-top-center',
        title: 'Success',
        variant: 'success',
        solid: true,
        autoHideDelay: 5000,
      });
      if(this.isSecretaire())
        this.retrieveAllRendezVouss();
      else if(this.isPatient()){
        this.rendezVouss.push(this.rendezVous);
        this.retrieveAllRendezVousPatient();
      }
    } catch (e) {
      console.log(e);
    }
  }

  // valider un rdv
  public async validRendezVous() {
    try {
      this.rendezVous = await this.rendezVousService().find(this.idRdv);
      this.rendezVous.status = 'validé';
      await this.rendezVousService().update(this.rendezVous);
      (<any>this.$refs.valideOrRemoveEntity).hide();
      this.$root.$bvToast.toast('Rendez-vous validé avec success', {
        toaster: 'b-toaster-top-center',
        title: 'Success',
        variant: 'success',
        solid: true,
        autoHideDelay: 5000,
      });
    } catch (e) {
      console.log(e);
    }
    this.retrieveAllRendezVouss();
  }

  // annuler un rdv
  public async removeRendezVous() {
    try {
      await this.rendezVousService().delete(this.idRdv);
      this.$bvToast.toast('Le rendez-vous est annulé avec success', {
        toaster: 'b-toaster-top-center',
        title: 'Success',
        variant: 'success',
        solid: true,
        autoHideDelay: 5000,
      });
    } catch (e) {
      console.log(e);
    }
    this.retrieveAllRendezVouss();
    this.closeDialog();
  }

  // evenement du click sur un rdv
  public eventClick(selectionInfo) {
    this.idRdv = selectionInfo.event.id;
    if (this.isSecretaire()) {
      if (selectionInfo.event.backgroundColor == 'green')
        (<any>this.$refs.removeEntity).show();
      else if (selectionInfo.event.backgroundColor == 'orange')
        (<any>this.$refs.valideOrRemoveEntity).show();
    }else if(this.isPatient())
      (<any>this.$refs.removeEntity).show();
  }

  // evenement du selection d'un jour
  public selectDate(selectionInfo): void {
    if (this.validDate(selectionInfo.start)) {
      this.rendezVous.date = selectionInfo.start;
      (<any>this.$refs.createEntity).show();
    } else this.alertService().showError(this, 'Veuillez saisir une date convenable!')
  }

  // verification de la validation d'une date choisit
  public validDate(date): boolean {
    let newDate = new Date();
    let dd = String(newDate.getDate()).padStart(2, '0');
    let mm = String(newDate.getMonth() + 1).padStart(2, '0');
    let yyyy = newDate.getFullYear();
    let today = yyyy + '-' + mm + '-' + dd;
    return this.formatDate(date) > today;
  }

  // formater la date pour la verification
  public formatDate(date): String {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  public isMedecin(): boolean {
    return this.accountService().userAuthorities[0] == 'MEDECIN';
  }

  public isPatient(): boolean {
    return this.accountService().userAuthorities[0] == 'PATIENT';
  }

  public isSecretaire(): boolean {
    return this.accountService().userAuthorities[0] == 'SECRETAIRE';
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }

  public closeCreateDialog(): void {
    (<any>this.$refs.createEntity).hide();
  }

  public closeValidOrRemoveDialog(): void {
    (<any>this.$refs.valideOrRemoveEntity).hide();
  }

}
