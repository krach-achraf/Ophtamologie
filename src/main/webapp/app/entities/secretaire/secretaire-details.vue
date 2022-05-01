<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="secretaire">
        <h2 class="jh-entity-heading" data-cy="secretaireDetailsHeading"><span>Secretaire</span> {{ secretaire.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ secretaire.code }}</span>
          </dd>
          <dt>
            <span>Nom</span>
          </dt>
          <dd>
            <span>{{ secretaire.nom }}</span>
          </dd>
          <dt>
            <span>Num Emp</span>
          </dt>
          <dd>
            <span>{{ secretaire.numEmp }}</span>
          </dd>
          <dt>
            <span>Prenom</span>
          </dt>
          <dd>
            <span>{{ secretaire.prenom }}</span>
          </dd>
          <dt>
            <span>Admin</span>
          </dt>
          <dd>
            <span>{{ secretaire.admin }}</span>
          </dd>
          <dt>
            <span>Compte</span>
          </dt>
          <dd>
            <div v-if="secretaire.compte">
              <router-link :to="{ name: 'CompteView', params: { compteId: secretaire.compte.id } }">{{ secretaire.compte.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="secretaire.id"
          :to="{ name: 'SecretaireEdit', params: { secretaireId: secretaire.id } }"
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

<script lang="ts" src="./secretaire-details.component.ts"></script>
