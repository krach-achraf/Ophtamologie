<template>
  <div class="container-fluid">
    <div class="card jh-card">
    <h2 id="page-heading" data-cy="MaladieHeading">
      <span id="maladie-heading">Maladies</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'MaladieCreate' }" custom v-slot="{ navigate }" v-if="isMedecin()">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-maladie"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> New Maladie </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && maladies && maladies.length === 0">
      <span>No maladies found</span>
    </div>
    <div class="table-responsive" v-if="maladies && maladies.length > 0">
      <table class="table table-striped" aria-describedby="maladies">
        <thead>
          <tr>
            <th scope="row"><span>Code</span></th>
            <th scope="row"><span>Date</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="maladie in maladies" :key="maladie.id" data-cy="entityTable">
            <td>{{ maladie.code }}</td>
            <td>{{ maladie.date }}</td>
            <td class="text-right">
              <div class="btn-group">

                <router-link :to="{ name: 'MaladieView', params: { maladieId: maladie.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details mr-1" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>

                <router-link :to="{ name: 'MaladieEdit', params: { maladieId: maladie.id } }" custom v-slot="{ navigate }" v-if="isMedecin()">
                  <button @click="navigate" class="btn btn-primary btn-sm edit mr-1" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>

                <b-button
                  v-if="isMedecin()"
                  v-on:click="prepareRemove(maladie)"
                  variant="danger"
                  class="btn btn-sm mr-1"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>

                <b-button
                  v-if="isMedecin()"
                  v-on:click="prepareAffecte(maladie)"
                  variant="success"
                  class="btn btn-sm"
                  data-cy="entityAffecteButton"
                  v-b-modal.affecteEntity
                >
                  <font-awesome-icon icon="plus"></font-awesome-icon>
                  <span class="d-none d-md-inline">Stade</span>
                </b-button>

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="pathogeneApp.maladie.delete.question" data-cy="maladieDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-maladie-heading">Are you sure you want to delete this Maladie?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-maladie"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeMaladie()"
        >
          Delete
        </button>
      </div>
    </b-modal>

    <b-modal ref="affecteEntity" id="affecteEntity">
      <span slot="modal-title"
      ><span id="pathogeneApp.maladie.affecte.question" data-cy="maladieAffecteDialogHeading">Créer le stade</span></span
      >
      <div class="modal-body">

        <form name="editForm" role="form" novalidate v-on:submit.prevent="saveStade()">
          <div>

            <div class="form-group">
              <label class="form-control-label" for="stade-level">Level</label>
              <input
                type="text"
                class="form-control"
                name="level"
                id="stade-level"
                data-cy="level"
                :class="{ valid: !$v.stade.level.$invalid, invalid: $v.stade.level.$invalid }"
                v-model="$v.stade.level.$model"
              />
            </div>

            <div class="form-group">
              <label class="form-control-label" for="stade-description">Description</label>
              <input
                type="text"
                class="form-control"
                name="description"
                id="stade-description"
                data-cy="description"
                :class="{ valid: !$v.stade.description.$invalid, invalid: $v.stade.description.$invalid }"
                v-model="$v.stade.description.$model"
              />
            </div>

          </div>
          <div>
            <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
              <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
            </button>
            <button
              type="submit"
              id="save-entity"
              data-cy="entityCreateSaveButton"
              class="btn btn-primary"
            >
              <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
            </button>
          </div>
        </form>

      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Annuler</button>
      </div>
    </b-modal>
  </div>
  </div>
</template>

<script lang="ts" src="./maladie.component.ts"></script>
