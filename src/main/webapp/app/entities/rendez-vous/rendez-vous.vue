<template>
  <div>
    <h2 id="page-heading" data-cy="RendezVousHeading">
      <span id="rendez-vous-heading">Rendez Vous</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'RendezVousCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-rendez-vous"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Rendez Vous </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && rendezVous && rendezVous.length === 0">
      <span>No rendezVous found</span>
    </div>
    <div class="table-responsive" v-if="rendezVous && rendezVous.length > 0">
      <table class="table table-striped" aria-describedby="rendezVous">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Date</span></th>
            <th scope="row"><span>Code</span></th>
            <th scope="row"><span>Status</span></th>
            <th scope="row"><span>Patient</span></th>
            <th scope="row"><span>Medecin</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rendezVous in rendezVous" :key="rendezVous.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'RendezVousView', params: { rendezVousId: rendezVous.id } }">{{ rendezVous.id }}</router-link>
            </td>
            <td>{{ rendezVous.date | formatDate }}</td>
            <td>{{ rendezVous.code }}</td>
            <td>{{ rendezVous.status }}</td>
            <td>
              <div v-if="rendezVous.patient">
                <router-link :to="{ name: 'PatientView', params: { patientId: rendezVous.patient.id } }">{{
                  rendezVous.patient.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="rendezVous.medecin">
                <router-link :to="{ name: 'MedecinView', params: { medecinId: rendezVous.medecin.id } }">{{
                  rendezVous.medecin.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'RendezVousView', params: { rendezVousId: rendezVous.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'RendezVousEdit', params: { rendezVousId: rendezVous.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(rendezVous)"
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
        ><span id="pathogeneApp.rendezVous.delete.question" data-cy="rendezVousDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-rendezVous-heading">Are you sure you want to delete this Rendez Vous?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-rendezVous"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeRendezVous()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./rendez-vous.component.ts"></script>
