<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="pathogeneApp.medecin.home.createOrEditLabel" data-cy="MedecinCreateUpdateHeading">Create or edit a Medecin</h2>
        <div>
          <div class="form-group" v-if="medecin.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="medecin.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="medecin-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="medecin-code"
              data-cy="code"
              :class="{ valid: !$v.medecin.code.$invalid, invalid: $v.medecin.code.$invalid }"
              v-model="$v.medecin.code.$model"
            />
            <div v-if="$v.medecin.code.$anyDirty && $v.medecin.code.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="medecin-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="medecin-nom"
              data-cy="nom"
              :class="{ valid: !$v.medecin.nom.$invalid, invalid: $v.medecin.nom.$invalid }"
              v-model="$v.medecin.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="medecin-numEmp">Num Emp</label>
            <input
              type="text"
              class="form-control"
              name="numEmp"
              id="medecin-numEmp"
              data-cy="numEmp"
              :class="{ valid: !$v.medecin.numEmp.$invalid, invalid: $v.medecin.numEmp.$invalid }"
              v-model="$v.medecin.numEmp.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="medecin-prenom">Prenom</label>
            <input
              type="text"
              class="form-control"
              name="prenom"
              id="medecin-prenom"
              data-cy="prenom"
              :class="{ valid: !$v.medecin.prenom.$invalid, invalid: $v.medecin.prenom.$invalid }"
              v-model="$v.medecin.prenom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="medecin-admin">Admin</label>
            <input
              type="checkbox"
              class="form-check"
              name="admin"
              id="medecin-admin"
              data-cy="admin"
              :class="{ valid: !$v.medecin.admin.$invalid, invalid: $v.medecin.admin.$invalid }"
              v-model="$v.medecin.admin.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="medecin-expertLevel">Expert Level</label>
            <input
              type="number"
              class="form-control"
              name="expertLevel"
              id="medecin-expertLevel"
              data-cy="expertLevel"
              :class="{ valid: !$v.medecin.expertLevel.$invalid, invalid: $v.medecin.expertLevel.$invalid }"
              v-model.number="$v.medecin.expertLevel.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="medecin-compte">Compte</label>
            <select class="form-control" id="medecin-compte" data-cy="compte" name="compte" v-model="medecin.compte">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="medecin.compte && compteOption.id === medecin.compte.id ? medecin.compte : compteOption"
                v-for="compteOption in comptes"
                :key="compteOption.id"
              >
                {{ compteOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="medecin-secretaire">Secretaire</label>
            <select class="form-control" id="medecin-secretaire" data-cy="secretaire" name="secretaire" v-model="medecin.secretaire">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="medecin.secretaire && secretaireOption.id === medecin.secretaire.id ? medecin.secretaire : secretaireOption"
                v-for="secretaireOption in secretaires"
                :key="secretaireOption.id"
              >
                {{ secretaireOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.medecin.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./medecin-update.component.ts"></script>
