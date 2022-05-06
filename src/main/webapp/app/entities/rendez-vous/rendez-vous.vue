<template>
  <div>
    <!-- bouttons pour affiches mes medecins et les patients -->
    <h2 id="page-heading" data-cy="RendezVousHeading">
      <span id="rendez-vous-heading">Rendez Vous</span>
      <div class="d-flex justify-content-end">
        <router-link :to="{ name: 'MedecinPatients' }" custom v-slot="{ navigate }" class="mr-2" v-if="this.isMedecin()">
          <button
            @click="navigate"
            id="jh-patients-entity"
            data-cy="entityPatients'Button"
            class="btn btn-primary jh-create-entity affiche-patient"
          >
            <span> Mes patients </span>
          </button>
        </router-link>
        <router-link :to="{ name: 'PatientMedecins' }" custom v-slot="{ navigate }" v-if="this.isPatient()">
          <button
            @click="navigate"
            id="jh-medecins-entity"
            data-cy="entityMedecinsButton"
            class="btn btn-primary jh-create-entity affiche-patient"
          >
            <span> Mes medecins </span>
          </button>
        </router-link>
      </div>
    </h2>
    <!-- end bouttons pour affiches mes medecins et les patients -->

    <hr>

    <!-- Fullcalendar -->
    <FullCalendar :options="calendarOptions"/>
    <!-- end Fullcalendar -->

    <!-- modal create rdv -->
    <b-modal ref="createEntity" id="createEntity">
      <span slot="modal-title"
      ><span id="pathogeneApp.rendezVous.create.question"
             data-cy="rendezVousCreateDialogHeading">Entrez les détails</span></span
      >
      <div class="modal-body">

        <div class="form-group">
          <label class="form-control-label">Patient</label>
          <select class="form-control" id="rendez-vous-patient" data-cy="patient" name="patient" v-model="idPatient">
            <option
              v-for="patient in patients"
              :key="patient.id"
              v-bind:value="patient.id"
            >
              {{ patient.nom }} {{ patient.prenom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-control-label" for="rendez-vous-medecin">Medecin</label>
          <select class="form-control" id="rendez-vous-medecin" data-cy="medecin" name="medecin" v-model="idMedecin">
            <option
              v-for="medecin in medecins"
              :key="medecin.id"
              v-bind:value="medecin.id"
            >
              {{ medecin.nom }} {{ medecin.prenom }}
            </option>
          </select>
        </div>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Annuler</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-create-rendezVous"
          data-cy="entityConfirmCreateButton"
          v-on:click="save()"
        >
          Sauvegarder
        </button>
      </div>
    </b-modal>
    <!-- end modal create rdv -->

    <!-- modal delete rdv -->
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
      ><span id="pathogeneApp.rendezVous.delete.question" data-cy="rendezVousDeleteDialogHeading">Confirmation de l'annulation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-rendezVous-heading">Vous etes sur?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Quitter</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-rendezVous"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeRendezVous()"
        >
          Annuler
        </button>
      </div>
    </b-modal>
    <!-- end modal delete rdv -->

  </div>
</template>

<script lang="ts" src="./rendez-vous.component.ts"></script>
