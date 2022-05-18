<template>
  <div class="container-fluid">
    <div class="card jh-card">
    <h2 id="page-heading" data-cy="VisiteHeading">
      <span id="visite-heading">Visites</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && visites && visites.length === 0">
      <span>No visites found</span>
    </div>
    <div class="table-responsive" v-if="visites && visites.length > 0">
      <table class="table table-striped" aria-describedby="visites">
        <thead>
          <tr>
            <th scope="row"><span>Date</span></th>
            <th scope="row"><span>Rendez Vous</span></th>
            <th scope="row"><span>Detection</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="visite in visites" :key="visite.id" data-cy="entityTable">
            <td>{{ visite.date }}</td>
            <td>
              <div v-if="visite.rendezVous">
                <router-link :to="{ name: 'RendezVousView', params: { rendezVousId: visite.rendezVous.id } }">{{
                    visite.rendezVous.code
                  }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="visite.detection">
                <router-link :to="{ name: 'DetectionView', params: { detectionId: visite.detection.id } }">{{
                    visite.detection.code
                  }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'VisiteView', params: { visiteId: visite.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details mr-1" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <b-button
                  v-if="isSecretaire()"
                  v-on:click="prepareRemove(visite)"
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
        ><span id="pathogeneApp.visite.delete.question" data-cy="visiteDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-visite-heading">Are you sure you want to delete this Visite?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-visite"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeVisite()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
  </div>
</template>

<script lang="ts" src="./visite.component.ts"></script>
