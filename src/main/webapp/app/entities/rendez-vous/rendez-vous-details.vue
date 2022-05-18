<template>
  <div class="container-fluid">
    <div class="card jh-card">
      <div class="row justify-content-center">
        <div class="col-8">
          <div v-if="rendezVous">
            <h2 class="jh-entity-heading" data-cy="rendezVousDetailsHeading"><span>Rendez-vous</span>
            </h2>
            <dl class="row jh-entity-details">
              <dt>
                <span>Code</span>
              </dt>
              <dd>
                <span>{{ rendezVous.code }}</span>
              </dd>
              <dt>
                <span>Date</span>
              </dt>
              <dd>
                <span>{{ rendezVous.date | formatDate }}</span>
              </dd>

              <dt>
                <span>Status</span>
              </dt>
              <dd>
                <span>{{ rendezVous.status }}</span>
              </dd>
              <dt v-if="!isPatient()">
                <span>Patient</span>
              </dt>
              <dd v-if="!isPatient()">
                <div v-if="rendezVous.patient">
                  {{ rendezVous.patient.nom }} {{ rendezVous.patient.prenom }}
                </div>
              </dd>
              <dt v-if="!isMedecin()">
                <span>Medecin</span>
              </dt>
              <dd v-if="!isMedecin()">
                <div v-if="rendezVous.medecin">
                  {{ rendezVous.medecin.nom }} {{ rendezVous.medecin.prenom }}
                </div>
              </dd>
            </dl>
            <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info"
                    data-cy="entityDetailsBackButton">
              <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./rendez-vous-details.component.ts"></script>
