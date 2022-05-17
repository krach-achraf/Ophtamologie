<template>
  <div class="container-fluid">
    <div class="card jh-card">
    <h2 id="page-heading" data-cy="SecretaireHeading">
      <span id="secretaire-heading">Secretaires</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'SecretaireCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-secretaire"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Secretaire </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && secretaires && secretaires.length === 0">
      <span>No secretaires found</span>
    </div>
    <div class="table-responsive" v-if="secretaires && secretaires.length > 0">
      <table class="table table-striped" aria-describedby="secretaires">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Code</span></th>
            <th scope="row"><span>Nom</span></th>
            <th scope="row"><span>Num Emp</span></th>
            <th scope="row"><span>Prenom</span></th>
            <th scope="row"><span>Admin</span></th>
            <th scope="row"><span>Photo</span></th>
            <th scope="row"><span>User</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="secretaire in secretaires" :key="secretaire.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'SecretaireView', params: { secretaireId: secretaire.id } }">{{ secretaire.id }}</router-link>
            </td>
            <td>{{ secretaire.code }}</td>
            <td>{{ secretaire.nom }}</td>
            <td>{{ secretaire.numEmp }}</td>
            <td>{{ secretaire.prenom }}</td>
            <td>{{ secretaire.admin }}</td>
            <td>
              <a v-if="secretaire.photo" v-on:click="openFile(secretaire.photoContentType, secretaire.photo)">
                <img
                  v-bind:src="'data:' + secretaire.photoContentType + ';base64,' + secretaire.photo"
                  style="max-height: 30px"
                  alt="secretaire image"
                />
              </a>
              <span v-if="secretaire.photo">{{ secretaire.photoContentType }}, {{ byteSize(secretaire.photo) }}</span>
            </td>
            <td>
              {{ secretaire.user ? secretaire.user.id : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'SecretaireView', params: { secretaireId: secretaire.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'SecretaireEdit', params: { secretaireId: secretaire.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(secretaire)"
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
        ><span id="pathogeneApp.secretaire.delete.question" data-cy="secretaireDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-secretaire-heading">Are you sure you want to delete this Secretaire?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-secretaire"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeSecretaire()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
  </div>
</template>

<script lang="ts" src="./secretaire.component.ts"></script>
