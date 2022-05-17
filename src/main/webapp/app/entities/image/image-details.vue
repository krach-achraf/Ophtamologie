<template>
  <div class="container-fluid">
    <div class="card jh-card">
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="image">
        <h2 class="jh-entity-heading" data-cy="imageDetailsHeading"><span>Image</span> {{ image.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ image.code }}</span>
          </dd>
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="image.photo">
              <a v-on:click="openFile(image.photoContentType, image.photo)">
                <img v-bind:src="'data:' + image.photoContentType + ';base64,' + image.photo" style="max-width: 100%" alt="image image" />
              </a>
              {{ image.photoContentType }}, {{ byteSize(image.photo) }}
            </div>
          </dd>
          <dt>
            <span>Stade</span>
          </dt>
          <dd>
            <div v-if="image.stade">
              <router-link :to="{ name: 'StadeView', params: { stadeId: image.stade.id } }">{{ image.stade.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="image.id" :to="{ name: 'ImageEdit', params: { imageId: image.id } }" custom v-slot="{ navigate }">
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

<script lang="ts" src="./image-details.component.ts"></script>
