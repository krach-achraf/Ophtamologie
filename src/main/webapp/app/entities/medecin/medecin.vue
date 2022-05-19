<template>
  <div class="container-fluid">
    <div class="card jh-card">
    <h2 id="page-heading" data-cy="MedecinHeading">
      <span id="medecin-heading">Medecins</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>

      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && medecins && medecins.length === 0">
      <span>No medecins found</span>
    </div>
    <div class="table-responsive" v-if="medecins && medecins.length > 0">
      <table class="table table-striped" aria-describedby="medecins">
        <thead>
          <tr>
            <th scope="row"><span>Nom</span></th>
            <th scope="row"><span>Prenom</span></th>
            <th scope="row"><span>Photo</span></th>
            <th scope="row"><span>Type</span></th>
            <th scope="row"><span>Description</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="medecin in medecins" :key="medecin.id" data-cy="entityTable">
            <td>{{ medecin.nom }}</td>
            <td>{{ medecin.prenom }}</td>
            <td>
              <a v-if="medecin.photo" v-on:click="openFile(medecin.photoContentType, medecin.photo)">
                <img
                  v-bind:src="'data:' + medecin.photoContentType + ';base64,' + medecin.photo"
                  style="max-height: 70px"
                  alt="medecin image"
                />
              </a>
            </td>
            <td>{{ medecin.type }}</td>
            <td>{{ medecin.description }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'MedecinView', params: { medecinId: medecin.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details mr-1" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'MedecinEdit', params: { medecinId: medecin.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit mr-1" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(medecin)"
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
        ><span id="pathogeneApp.medecin.delete.question" data-cy="medecinDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-medecin-heading">Are you sure you want to delete this Medecin?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-medecin"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeMedecin()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
  </div>
</template>

<script lang="ts" src="./medecin.component.ts"></script>
