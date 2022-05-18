<template>
  <div class="container-fluid">
    <div class="card jh-card">
      <div class="row justify-content-center">
        <div class="col-8">
          <div v-if="maladie">
            <h2 class="jh-entity-heading" data-cy="maladieDetailsHeading"><span>Maladie</span></h2>
            <dl class="row jh-entity-details">
              <dt>
                <span>Code</span>
              </dt>
              <dd>
                <span>{{ maladie.code }}</span>
              </dd>
              <dt>
                <span>Date</span>
              </dt>
              <dd>
                <span>{{ maladie.date }}</span>
              </dd>
            </dl>

            <br/>
            <div v-if="stades && stades.length > 0">
              <h2 id="page-heading" data-cy="StadeHeading">
                <span id="stade-heading">Stades</span>
              </h2>
              <hr>
              <div class="table-responsive">
                <table class="table table-striped" aria-describedby="stades">
                  <thead>
                  <tr>
                    <th scope="row"><span>Code</span></th>
                    <th scope="row"><span>Level</span></th>
                    <th scope="row"><span>Description</span></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="stade in stades" :key="stade.id" data-cy="entityTable">
                    <td>{{ stade.code }}</td>
                    <td>{{ stade.level }}</td>
                    <td>{{ stade.description }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info"
                    data-cy="entityDetailsBackButton">
              <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
            </button>
            <router-link v-if="maladie.id && isMedecin()" :to="{ name: 'MaladieEdit', params: { maladieId: maladie.id } }" custom
                         v-slot="{ navigate }" >
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

<script lang="ts" src="./maladie-details.component.ts"></script>
