<template>
  <div class="container-fluid">
    <div class="card jh-card">
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="stade">
        <h2 class="jh-entity-heading" data-cy="stadeDetailsHeading"><span>Stade</span></h2>
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
          <dd>
            <div v-if="stade.maladie">
              <router-link :to="{ name: 'MaladieView', params: { maladieId: stade.maladie.id } }">{{ stade.maladie.code }} </router-link>
            </div>
          </dd>

        </dl>

        <div v-if="images && images.length > 0">
          <br />
          <h2 id="page-heading" data-cy="ImageHeading">
            <span id="image-heading">Images</span>
          </h2>

          <div class="table-responsive">
            <table class="table table-striped" aria-describedby="stades">
              <thead>
                <tr>
                  <th scope="row"><span>Code</span></th>
                  <th scope="row"><span>Photo</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="image in images" :key="image.id" data-cy="entityTable">
                  <td>{{ image.code }}</td>
                  <td>
                    <a v-if="image.photo" v-on:click="openFile(image.photoContentType, image.photo)">
                      <img
                        v-bind:src="'data:' + image.photoContentType + ';base64,' + image.photo"
                        style="max-height: 70px"
                        alt="image image"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
    </div>
  </div>
</template>

<script lang="ts" src="./stade-details.component.ts"></script>
