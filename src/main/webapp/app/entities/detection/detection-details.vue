<template>
  <div class="container-fluid">
    <div class="card jh-card">
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="detection">
        <h2 class="jh-entity-heading" data-cy="detectionDetailsHeading"><span>Detection</span></h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="detection.photo">
              <a v-on:click="openFile(detection.photoContentType, detection.photo)">
                <img
                  v-bind:src="'data:' + detection.photoContentType + ';base64,' + detection.photo"
                  style="max-width: 100%"
                  alt="detection image"
                />
              </a>
            </div>
          </dd>
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ detection.code }}</span>
          </dd>
          <dt>
            <span>Validation</span>
          </dt>
          <dd v-if="detection.validation">
            <span>Validé</span>
          </dd>
          <dd v-if="!detection.validation">
            <span>Non validé</span>
          </dd>
          <dt>
            <span>Stade</span>
          </dt>
          <dd>
            <span>{{ detection.stade }}</span>
          </dd>
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ detection.date | formatDate }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ detection.description }}</span>
          </dd>
          <dt>
            <span>Maladie</span>
          </dt>
          <dd>
            <div v-if="detection.maladie">
              {{detection.maladie.nom}}
            </div>
          </dd>
          <dt v-if="isMedecin()">
            <span>Patient</span>
          </dt>
          <dd v-if="isMedecin()">
            <div v-if="detection.patient">{{detection.patient.nom}} {{detection.patient.prenom }}</div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="detection.id"
          :to="{ name: 'DetectionEdit', params: { detectionId: detection.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script lang="ts" src="./detection-details.component.ts"></script>
