<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="pathogeneApp.secretaire.home.createOrEditLabel" data-cy="SecretaireCreateUpdateHeading">Create or edit a Secretaire</h2>
        <div>
          <div class="form-group" v-if="secretaire.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="secretaire.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secretaire-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="secretaire-code"
              data-cy="code"
              :class="{ valid: !$v.secretaire.code.$invalid, invalid: $v.secretaire.code.$invalid }"
              v-model="$v.secretaire.code.$model"
            />
            <div v-if="$v.secretaire.code.$anyDirty && $v.secretaire.code.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secretaire-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="secretaire-nom"
              data-cy="nom"
              :class="{ valid: !$v.secretaire.nom.$invalid, invalid: $v.secretaire.nom.$invalid }"
              v-model="$v.secretaire.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secretaire-numEmp">Num Emp</label>
            <input
              type="text"
              class="form-control"
              name="numEmp"
              id="secretaire-numEmp"
              data-cy="numEmp"
              :class="{ valid: !$v.secretaire.numEmp.$invalid, invalid: $v.secretaire.numEmp.$invalid }"
              v-model="$v.secretaire.numEmp.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secretaire-prenom">Prenom</label>
            <input
              type="text"
              class="form-control"
              name="prenom"
              id="secretaire-prenom"
              data-cy="prenom"
              :class="{ valid: !$v.secretaire.prenom.$invalid, invalid: $v.secretaire.prenom.$invalid }"
              v-model="$v.secretaire.prenom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secretaire-admin">Admin</label>
            <input
              type="checkbox"
              class="form-check"
              name="admin"
              id="secretaire-admin"
              data-cy="admin"
              :class="{ valid: !$v.secretaire.admin.$invalid, invalid: $v.secretaire.admin.$invalid }"
              v-model="$v.secretaire.admin.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secretaire-compte">Compte</label>
            <select class="form-control" id="secretaire-compte" data-cy="compte" name="compte" v-model="secretaire.compte">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="secretaire.compte && compteOption.id === secretaire.compte.id ? secretaire.compte : compteOption"
                v-for="compteOption in comptes"
                :key="compteOption.id"
              >
                {{ compteOption.id }}
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
            :disabled="$v.secretaire.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./secretaire-update.component.ts"></script>
