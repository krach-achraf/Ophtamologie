<template>
  <div>
    <h2 id="page-heading" data-cy="ClassificationHeading">
      <span id="classification-heading">Classifications</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ClassificationCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-classification"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Classification </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && classifications && classifications.length === 0">
      <span>No classifications found</span>
    </div>
    <div class="table-responsive" v-if="classifications && classifications.length > 0">
      <table class="table table-striped" aria-describedby="classifications">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Code</span></th>
            <th scope="row"><span>Score</span></th>
            <th scope="row"><span>Medecin</span></th>
            <th scope="row"><span>Stade</span></th>
            <th scope="row"><span>Unclassified</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="classification in classifications" :key="classification.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ClassificationView', params: { classificationId: classification.id } }">{{
                classification.id
              }}</router-link>
            </td>
            <td>{{ classification.code }}</td>
            <td>{{ classification.score }}</td>
            <td>
              <div v-if="classification.medecin">
                <router-link :to="{ name: 'MedecinView', params: { medecinId: classification.medecin.id } }">{{
                  classification.medecin.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="classification.stade">
                <router-link :to="{ name: 'StadeView', params: { stadeId: classification.stade.id } }">{{
                  classification.stade.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="classification.unclassified">
                <router-link :to="{ name: 'UnclassifiedView', params: { unclassifiedId: classification.unclassified.id } }">{{
                  classification.unclassified.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'ClassificationView', params: { classificationId: classification.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'ClassificationEdit', params: { classificationId: classification.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(classification)"
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
        ><span id="pathogeneApp.classification.delete.question" data-cy="classificationDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-classification-heading">Are you sure you want to delete this Classification?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-classification"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeClassification()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./classification.component.ts"></script>
