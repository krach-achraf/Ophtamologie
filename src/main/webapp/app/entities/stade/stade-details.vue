<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="stade">
        <h2 class="jh-entity-heading" data-cy="stadeDetailsHeading"><span>Stade</span> {{ stade.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ stade.code }}</span>
          </dd>
          <dt>
            <span>Level</span>
          </dt>
          <dd>
            <span>{{ stade.level }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ stade.description }}</span>
          </dd>
          <dt>
            <span>Maladie</span>
          </dt>
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="stade.images[0].photo">
              <a v-on:click="openFile(stade.images[0].photoContentType, stade.images[0].photo)">
                <img
                  v-bind:src="'data:' + stade.images[0].photoContentType + ';base64,' + stade.images[0].photo"
                  style="max-width: 100%"
                  alt="stade.images[0] stade.images[0]"
                />
              </a>
              {{ stade.images[0].photoContentType }}, {{ byteSize(stade.images[0].photo) }}
            </div>
          </dd>
          <dd>
            <div v-if="stade.maladie">
              <router-link :to="{ name: 'MaladieView', params: { maladieId: stade.maladie.id } }">{{ stade.maladie.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="stade.id" :to="{ name: 'StadeEdit', params: { stadeId: stade.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./stade-details.component.ts"></script>
