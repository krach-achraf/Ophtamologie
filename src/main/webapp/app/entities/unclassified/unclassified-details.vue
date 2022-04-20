<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="unclassified">
        <h2 class="jh-entity-heading" data-cy="unclassifiedDetailsHeading"><span>Unclassified</span> {{ unclassified.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ unclassified.code }}</span>
          </dd>
          <dt>
            <span>Path</span>
          </dt>
          <dd>
            <span>{{ unclassified.path }}</span>
          </dd>
          <dt>
            <span>Maladie</span>
          </dt>
          <dd>
            <div v-if="unclassified.maladie">
              <router-link :to="{ name: 'MaladieView', params: { maladieId: unclassified.maladie.id } }">{{
                unclassified.maladie.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="unclassified.id"
          :to="{ name: 'UnclassifiedEdit', params: { unclassifiedId: unclassified.id } }"
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

<script lang="ts" src="./unclassified-details.component.ts"></script>
