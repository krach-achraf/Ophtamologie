import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPatient } from '@/shared/model/patient.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import PatientService from './patient.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Patient extends mixins(JhiDataUtils) {
  @Inject('patientService') private patientService: () => PatientService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public patients: IPatient[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPatients();
  }

  public clear(): void {
    this.retrieveAllPatients();
  }

  public retrieveAllPatients(): void {
    this.isFetching = true;
    this.patientService()
      .retrieve()
      .then(
        res => {
          this.patients = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IPatient): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePatient(): void {
    this.patientService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Patient is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllPatients();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
