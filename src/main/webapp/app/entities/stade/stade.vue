<template>
  <div>
    <h2 id="page-heading" data-cy="StadeHeading">
      <span id="stade-heading">Stades</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'StadeCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-stade"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Stade </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && stades && stades.length === 0">
      <span>No stades found</span>
    </div>
    <div class="table-responsive" v-if="stades && stades.length > 0">
      <table class="table table-striped" aria-describedby="stades">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Code</span></th>
            <th scope="row"><span>Level</span></th>
            <th scope="row"><span>Description</span></th>
            <th scope="row"><span>Maladie</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stade in stades" :key="stade.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'StadeView', params: { stadeId: stade.id } }">{{ stade.id }}</router-link>
            </td>
            <td>{{ stade.code }}</td>
            <td>{{ stade.level }}</td>
            <td>{{ stade.description }}</td>
            <td>
              <div v-if="stade.maladie">
                <router-link :to="{ name: 'MaladieView', params: { maladieId: stade.maladie.id } }">{{ stade.maladie.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'StadeView', params: { stadeId: stade.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'StadeEdit', params: { stadeId: stade.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(stade)"
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
        ><span id="pathogeneApp.stade.delete.question" data-cy="stadeDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-stade-heading">Are you sure you want to delete this Stade?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-stade"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeStade()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./stade.component.ts"></script>
