<template>
  <div class="container-fluid">
    <div class="card jh-card">
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="visite">
        <h2 class="jh-entity-heading" data-cy="visiteDetailsHeading"><span>Visite</span> {{ visite.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ visite.code }}</span>
          </dd>
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ visite.date }}</span>
          </dd>
          <dt>
            <span>Rendez Vous</span>
          </dt>
          <dd>
            <div v-if="visite.rendezVous">
              <router-link :to="{ name: 'RendezVousView', params: { rendezVousId: visite.rendezVous.id } }">{{
                visite.rendezVous.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Detection</span>
          </dt>
          <dd>
            <div v-if="visite.detection">
              <router-link :to="{ name: 'DetectionView', params: { detectionId: visite.detection.id } }">{{
                visite.detection.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="visite.id" :to="{ name: 'VisiteEdit', params: { visiteId: visite.id } }" custom v-slot="{ navigate }">
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

<script lang="ts" src="./visite-details.component.ts"></script>
