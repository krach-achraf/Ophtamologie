<template>
  <div class="container-fluid">
    <div class="card jh-card">
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="patient">
        <h2 class="jh-entity-heading" data-cy="patientDetailsHeading"><span>Patient</span></h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="patient.photo">
              <a v-on:click="openFile(patient.photoContentType, patient.photo)">
                <img
                  v-bind:src="'data:' + patient.photoContentType + ';base64,' + patient.photo"
                  style="max-width: 100%"
                  alt="patient image"
                />
              </a>
            </div>
          </dd>
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ patient.code }}</span>
          </dd>
          <dt>
            <span>Nom</span>
          </dt>
          <dd>
            <span>{{ patient.nom }}</span>
          </dd>
          <dt>
            <span>Prenom</span>
          </dt>
          <dd>
            <span>{{ patient.prenom }}</span>
          </dd>
          <dt>
            <span>Date Naissance</span>
          </dt>
          <dd>
            <span>{{ patient.dateNaissance }}</span>
          </dd>
          <dt>
            <span>Adresse</span>
          </dt>
          <dd>
            <span>{{ patient.adresse }}</span>
          </dd>
          <dt>
            <span>Genre</span>
          </dt>
          <dd>
            <span>{{ patient.genre }}</span>
          </dd>
          <dt>
            <span>Telephone</span>
          </dt>
          <dd>
            <span>{{ patient.telephone }}</span>
          </dd>
          <dt>
            <span>Poids</span>
          </dt>
          <dd>
            <span>{{ patient.poids }}</span>
          </dd>
          <dt>
            <span>Taille</span>
          </dt>
          <dd>
            <span>{{ patient.taille }}</span>
          </dd>

        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="patient.id" :to="{ name: 'PatientEdit', params: { patientId: patient.id } }" custom v-slot="{ navigate }">
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

<script lang="ts" src="./patient-details.component.ts"></script>
