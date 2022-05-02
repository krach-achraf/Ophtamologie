<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="rendezVous">
        <h2 class="jh-entity-heading" data-cy="rendezVousDetailsHeading"><span>RendezVous</span> {{ rendezVous.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ rendezVous.date | formatDate }}</span>
          </dd>
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ rendezVous.code }}</span>
          </dd>
          <dt>
            <span>Status</span>
          </dt>
          <dd>
            <span>{{ rendezVous.status }}</span>
          </dd>
          <dt>
            <span>Patient</span>
          </dt>
          <dd>
            <div v-if="rendezVous.patient">
              <router-link :to="{ name: 'PatientView', params: { patientId: rendezVous.patient.id } }">{{
                rendezVous.patient.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Medecin</span>
          </dt>
          <dd>
            <div v-if="rendezVous.medecin">
              <router-link :to="{ name: 'MedecinView', params: { medecinId: rendezVous.medecin.id } }">{{
                rendezVous.medecin.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="rendezVous.id"
          :to="{ name: 'RendezVousEdit', params: { rendezVousId: rendezVous.id } }"
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
</template>

<script lang="ts" src="./rendez-vous-details.component.ts"></script>
