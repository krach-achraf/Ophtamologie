<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="medecin">
        <h2 class="jh-entity-heading" data-cy="medecinDetailsHeading"><span>Medecin</span> {{ medecin.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ medecin.code }}</span>
          </dd>
          <dt>
            <span>Nom</span>
          </dt>
          <dd>
            <span>{{ medecin.nom }}</span>
          </dd>
          <dt>
            <span>Num Emp</span>
          </dt>
          <dd>
            <span>{{ medecin.numEmp }}</span>
          </dd>
          <dt>
            <span>Prenom</span>
          </dt>
          <dd>
            <span>{{ medecin.prenom }}</span>
          </dd>
          <dt>
            <span>Admin</span>
          </dt>
          <dd>
            <span>{{ medecin.admin }}</span>
          </dd>
          <dt>
            <span>Expert Level</span>
          </dt>
          <dd>
            <span>{{ medecin.expertLevel }}</span>
          </dd>
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="medecin.photo">
              <a v-on:click="openFile(medecin.photoContentType, medecin.photo)">
                <img
                  v-bind:src="'data:' + medecin.photoContentType + ';base64,' + medecin.photo"
                  style="max-width: 100%"
                  alt="medecin image"
                />
              </a>
              {{ medecin.photoContentType }}, {{ byteSize(medecin.photo) }}
            </div>
          </dd>
          <dt>
            <span>User</span>
          </dt>
          <dd>
            {{ medecin.user ? medecin.user.id : '' }}
          </dd>
          <dt>
            <span>Secretaire</span>
          </dt>
          <dd>
            <div v-if="medecin.secretaire">
              <router-link :to="{ name: 'SecretaireView', params: { secretaireId: medecin.secretaire.id } }">{{
                medecin.secretaire.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="medecin.id" :to="{ name: 'MedecinEdit', params: { medecinId: medecin.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./medecin-details.component.ts"></script>
