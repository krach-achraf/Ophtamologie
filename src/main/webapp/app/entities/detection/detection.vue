<template>
  <div class="container-fluid">
    <div class="card jh-card">
    <h2 id="page-heading" data-cy="DetectionHeading">
      <span id="detection-heading">Detections</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span>Refresh List</span>
        </button>
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
          <th scope="row"><span>Photo</span></th>
          <th scope="row"><span>Validation</span></th>
          <th scope="row"><span>Stade</span></th>
          <th scope="row"><span>Description</span></th>
          <th scope="row"><span>Maladie</span></th>
          <th scope="row" v-if="isMedecin()"><span>Patient</span></th>
          <th scope="row"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="detection in detections" :key="detection.id" data-cy="entityTable">

          <td>
            <a v-if="detection.photo" v-on:click="openFile(detection.photoContentType, detection.photo)">
              <img
                v-bind:src="'data:' + detection.photoContentType + ';base64,' + detection.photo"
                style="max-height: 70px"
                alt="detection image"
              />
            </a>
          </td>
          <td v-if="detection.validation">Validé</td>
          <td v-if="!detection.validation">Non validé</td>
          <td>{{ detection.stade }}</td>
          <td>{{ detection.description }}</td>
          <td>
            <div v-if="detection.maladie">
              {{detection.maladie.nom}}
            </div>
          </td>
          <td v-if="isMedecin()">
            <div v-if="detection.patient">
              {{detection.patient.nom}} {{detection.patient.prenom}}
            </div>
          </td>
          <td class="text-right">
            <div class="btn-group">
              <router-link :to="{ name: 'DetectionView', params: { detectionId: detection.id } }" custom
                           v-slot="{ navigate }" >
                <button @click="navigate" class="btn btn-info btn-sm details mr-1" data-cy="entityDetailsButton">
                  <font-awesome-icon icon="eye"></font-awesome-icon>
                  <span class="d-none d-md-inline">View</span>
                </button>
              </router-link>
              <router-link :to="{ name: 'DetectionEdit', params: { detectionId: detection.id } }" custom
                           v-slot="{ navigate }"  v-if="isMedecin()">
                <button @click="navigate" class="btn btn-primary btn-sm edit mr-1" data-cy="entityEditButton">
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
                v-if="isMedecin()"
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
  </div>
</template>

<script lang="ts" src="./detection.component.ts"></script>
