<template>
  <div class="container-fluid">
    <div class="card jh-card">
    <!-- bouttons pour affiches mes medecins et les patients -->
    <h2 id="page-heading" data-cy="RendezVousHeading">
      <span id="rendez-vous-heading">Rendez Vous</span>
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

        <div class="form-group">
          <label >Heure</label>
          <input list="calltimeslist" class="form-control" v-model="$v.rendezVous.heure.$model">
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
      ><span id="pathogeneApp.rendezVous.delete.question" data-cy="rendezVousDeleteDialogHeading">Choisissez l'operation</span></span
      >
      <div class="modal-body">

      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Quitter</button>
        <button
          type="button"
          class="btn btn-success"
          id="jhi-confirm-vlaide-rendezVous"
          data-cy="entityConfirmVaideButton"
          v-on:click="valideRendezVous()"
        >
          Valider
        </button>
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

    <datalist id="calltimeslist">
      <option value="08:30"/>
      <option value="08:45"/>
      <option value="09:00"/>
      <option value="09:15"/>
      <option value="09:30"/>
      <option value="09:45"/>
      <option value="10:00"/>
      <option value="10:15"/>
      <option value="10:30"/>
      <option value="10:45"/>
      <option value="11:00"/>
      <option value="11:15"/>
      <option value="11:30"/>
      <option value="11:45"/>
      <option value="12:00"/>
      <option value="12:15"/>
      <option value="12:30"/>
      <option value="12:45"/>
      <option value="13:00"/>
      <option value="13:15"/>
      <option value="13:30"/>
      <option value="13:45"/>
      <option value="14:00"/>
      <option value="14:15"/>
      <option value="14:30"/>
      <option value="14:45"/>
      <option value="15:00"/>
      <option value="15:15"/>
      <option value="15:30"/>
      <option value="15:45"/>
      <option value="16:00"/>
      <option value="16:15"/>
      <option value="16:30"/>
      <option value="16:45"/>
      <option value="17:00"/>
      <option value="17:15"/>
      <option value="17:30"/>
      <option value="17:45"/>
      <option value="18:00"/>
    </datalist>
  </div>
</template>

<script lang="ts" src="./rendez-vous.component.ts"></script>
