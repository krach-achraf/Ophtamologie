<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="classification">
        <h2 class="jh-entity-heading" data-cy="classificationDetailsHeading"><span>Classification</span> {{ classification.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ classification.code }}</span>
          </dd>
          <dt>
            <span>Score</span>
          </dt>
          <dd>
            <span>{{ classification.score }}</span>
          </dd>
          <dt>
            <span>Medecin</span>
          </dt>
          <dd>
            <div v-if="classification.medecin">
              <router-link :to="{ name: 'MedecinView', params: { medecinId: classification.medecin.id } }">{{
                classification.medecin.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Stade</span>
          </dt>
          <dd>
            <div v-if="classification.stade">
              <router-link :to="{ name: 'StadeView', params: { stadeId: classification.stade.id } }">{{
                classification.stade.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Unclassified</span>
          </dt>
          <dd>
            <div v-if="classification.unclassified">
              <router-link :to="{ name: 'UnclassifiedView', params: { unclassifiedId: classification.unclassified.id } }">{{
                classification.unclassified.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="classification.id"
          :to="{ name: 'ClassificationEdit', params: { classificationId: classification.id } }"
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

<script lang="ts" src="./classification-details.component.ts"></script>
