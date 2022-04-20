<template>
  <div>
    <h2 id="page-heading" data-cy="UnclassifiedHeading">
      <span id="unclassified-heading">Unclassifieds</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'UnclassifiedCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-unclassified"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Unclassified </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && unclassifieds && unclassifieds.length === 0">
      <span>No unclassifieds found</span>
    </div>
    <div class="table-responsive" v-if="unclassifieds && unclassifieds.length > 0">
      <table class="table table-striped" aria-describedby="unclassifieds">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Code</span></th>
            <th scope="row"><span>Path</span></th>
            <th scope="row"><span>Maladie</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unclassified in unclassifieds" :key="unclassified.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'UnclassifiedView', params: { unclassifiedId: unclassified.id } }">{{
                unclassified.id
              }}</router-link>
            </td>
            <td>{{ unclassified.code }}</td>
            <td>{{ unclassified.path }}</td>
            <td>
              <div v-if="unclassified.maladie">
                <router-link :to="{ name: 'MaladieView', params: { maladieId: unclassified.maladie.id } }">{{
                  unclassified.maladie.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'UnclassifiedView', params: { unclassifiedId: unclassified.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'UnclassifiedEdit', params: { unclassifiedId: unclassified.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(unclassified)"
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
        ><span id="pathogeneApp.unclassified.delete.question" data-cy="unclassifiedDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-unclassified-heading">Are you sure you want to delete this Unclassified?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-unclassified"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeUnclassified()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./unclassified.component.ts"></script>
