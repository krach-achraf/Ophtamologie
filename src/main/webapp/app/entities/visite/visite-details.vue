<template>
  <div class="container-fluid">
    <div class="card jh-card">
      <div class="row justify-content-center">
        <div class="col-8">
          <div v-if="visite">
            <h2 class="jh-entity-heading" data-cy="visiteDetailsHeading"><span>Visite</span></h2>
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
                  {{visite.rendezVous.code}}
                </div>
              </dd>
              <dt>
                <span>Detection</span>
              </dt>
              <dd>
                <div v-if="visite.detection">
                 {{visite.detection.code}}
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

<script lang="ts" src="./visite-details.component.ts"></script>
