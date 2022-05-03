<template>
  <div>
    <h2 id="page-heading" data-cy="MedecinHeading">
      <span id="medecin-heading">Medecins</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'MedecinCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-medecin"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Medecin </span>
          </button>
        </router-link>
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
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Code</span></th>
            <th scope="row"><span>Nom</span></th>
            <th scope="row"><span>Num Emp</span></th>
            <th scope="row"><span>Prenom</span></th>
            <th scope="row"><span>Expert Level</span></th>
            <th scope="row"><span>Photo</span></th>
            <th scope="row"><span>Type</span></th>
            <th scope="row"><span>Nbr Patients</span></th>
            <th scope="row"><span>Rating</span></th>
            <th scope="row"><span>Description</span></th>
            <th scope="row"><span>User</span></th>
            <th scope="row"><span>Secretaire</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="medecin in medecins" :key="medecin.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'MedecinView', params: { medecinId: medecin.id } }">{{ medecin.id }}</router-link>
            </td>
            <td>{{ medecin.code }}</td>
            <td>{{ medecin.nom }}</td>
            <td>{{ medecin.numEmp }}</td>
            <td>{{ medecin.prenom }}</td>
            <td>{{ medecin.expertLevel }}</td>
            <td>
              <a v-if="medecin.photo" v-on:click="openFile(medecin.photoContentType, medecin.photo)">
                <img
                  v-bind:src="'data:' + medecin.photoContentType + ';base64,' + medecin.photo"
                  style="max-height: 30px"
                  alt="medecin image"
                />
              </a>
              <span v-if="medecin.photo">{{ medecin.photoContentType }}, {{ byteSize(medecin.photo) }}</span>
            </td>
            <td>{{ medecin.type }}</td>
            <td>{{ medecin.nbrPatients }}</td>
            <td>{{ medecin.rating }}</td>
            <td>{{ medecin.description }}</td>
            <td>
              {{ medecin.user ? medecin.user.id : '' }}
            </td>
            <td>
              <div v-if="medecin.secretaire">
                <router-link :to="{ name: 'SecretaireView', params: { secretaireId: medecin.secretaire.id } }">{{
                  medecin.secretaire.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'MedecinView', params: { medecinId: medecin.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'MedecinEdit', params: { medecinId: medecin.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
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
</template>

<script lang="ts" src="./medecin.component.ts"></script>
