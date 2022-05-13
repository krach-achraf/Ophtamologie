<template>
  <div>
    <h2 id="page-heading" data-cy="DetectionHeading">
      <span id="detection-heading">Detections</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'DetectionCreate' }" custom v-slot="{ navigate }" v-if="isMedecin()">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-detection"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Detection </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br/>
    <div class="alert alert-warning" v-if="!isFetching && detections && detections.length === 0">
      <span>No detections found</span>
    </div>
    <div class="table-responsive" v-if="detections && detections.length > 0">
      <table class="table table-striped" aria-describedby="detections">
        <thead>
        <tr>
          <th scope="row"><span>ID</span></th>
          <th scope="row"><span>Photo</span></th>
          <th scope="row"><span>Code</span></th>
          <th scope="row"><span>Validation</span></th>
          <th scope="row"><span>Stade</span></th>
          <th scope="row"><span>Date</span></th>
          <th scope="row"><span>Description</span></th>
          <th scope="row"><span>Maladie</span></th>
          <th scope="row" v-if="isMedecin()"><span>Patient</span></th>
          <th scope="row" v-if="isMedecin()"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="detection in detections" :key="detection.id" data-cy="entityTable">
          <td>
            <router-link :to="{ name: 'DetectionView', params: { detectionId: detection.id } }">{{
                detection.id
              }}
            </router-link>
          </td>
          <td>
            <a v-if="detection.photo" v-on:click="openFile(detection.photoContentType, detection.photo)">
              <img
                v-bind:src="'data:' + detection.photoContentType + ';base64,' + detection.photo"
                style="max-height: 30px"
                alt="detection image"
              />
            </a>
            <span v-if="detection.photo">{{ detection.photoContentType }}, {{ byteSize(detection.photo) }}</span>
          </td>
          <td>{{ detection.code }}</td>
          <td>{{ detection.validation }}</td>
          <td>{{ detection.stade }}</td>
          <td>{{ detection.date | formatDate }}</td>
          <td>{{ detection.description }}</td>
          <td>
            <div v-if="detection.maladie">
              {{detection.maladie.code}}
            </div>
          </td>
          <td v-if="isMedecin()">
            <div v-if="detection.patient">
              {{detection.patient.nom}} {{detection.patient.prenom}}
            </div>
          </td>
          <td class="text-right" v-if="isMedecin()">
            <div class="btn-group">
              <router-link :to="{ name: 'DetectionView', params: { detectionId: detection.id } }" custom
                           v-slot="{ navigate }">
                <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                  <font-awesome-icon icon="eye"></font-awesome-icon>
                  <span class="d-none d-md-inline">View</span>
                </button>
              </router-link>
              <router-link :to="{ name: 'DetectionEdit', params: { detectionId: detection.id } }" custom
                           v-slot="{ navigate }">
                <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                  <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                  <span class="d-none d-md-inline">Edit</span>
                </button>
              </router-link>
              <b-button
                v-on:click="prepareRemove(detection)"
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
      ><span id="pathogeneApp.detection.delete.question"
             data-cy="detectionDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-detection-heading">Are you sure you want to delete this Detection?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-detection"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeDetection()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./detection.component.ts"></script>
