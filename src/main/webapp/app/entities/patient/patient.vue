<template>
  <div class="container-fluid">
    <div class="card jh-card">
    <h2 id="page-heading" data-cy="PatientHeading">
      <span id="patient-heading">Patients</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>

        <router-link custom v-slot="{ navigate }" :to="{ name: 'AddPatients' }">
          <button @click="navigate" class="btn btn-dark jh-create-entity">
            <font-awesome-icon icon="plus"></font-awesome-icon> <span>New Patient</span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && patients && patients.length === 0">
      <span>No patients found</span>
    </div>
    <div class="table-responsive" v-if="patients && patients.length > 0">
      <table class="table table-striped" aria-describedby="patients">
        <thead>
          <tr>
            <th scope="row"><span>Nom</span></th>
            <th scope="row"><span>Prenom</span></th>
            <th scope="row"><span>Adresse</span></th>
            <th scope="row"><span>Telephone</span></th>
            <th scope="row"><span>Photo</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id" data-cy="entityTable">
            <td>{{ patient.nom }}</td>
            <td>{{ patient.prenom }}</td>
            <td>{{ patient.adresse }}</td>
            <td>{{ patient.telephone }}</td>
            <td>
              <a v-if="patient.photo" v-on:click="openFile(patient.photoContentType, patient.photo)">
                <img
                  v-bind:src="'data:' + patient.photoContentType + ';base64,' + patient.photo"
                  style="max-height: 70px"
                  alt="patient image"
                />
              </a>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'PatientView', params: { patientId: patient.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details mr-1" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'PatientEdit', params: { patientId: patient.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit mr-1" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(patient)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="pathogeneApp.patient.delete.question" data-cy="patientDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-patient-heading">Are you sure you want to delete this Patient?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-patient"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removePatient()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
  </div>
</template>

<script lang="ts" src="./patient.component.ts"></script>
