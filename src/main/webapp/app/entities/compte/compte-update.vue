<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="pathogeneApp.compte.home.createOrEditLabel" data-cy="CompteCreateUpdateHeading">Create or edit a Compte</h2>
        <div>
          <div class="form-group" v-if="compte.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="compte.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="compte-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="compte-email"
              data-cy="email"
              :class="{ valid: !$v.compte.email.$invalid, invalid: $v.compte.email.$invalid }"
              v-model="$v.compte.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="compte-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="compte-code"
              data-cy="code"
              :class="{ valid: !$v.compte.code.$invalid, invalid: $v.compte.code.$invalid }"
              v-model="$v.compte.code.$model"
            />
            <div v-if="$v.compte.code.$anyDirty && $v.compte.code.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="compte-motDePasse">Mot De Passe</label>
            <input
              type="text"
              class="form-control"
              name="motDePasse"
              id="compte-motDePasse"
              data-cy="motDePasse"
              :class="{ valid: !$v.compte.motDePasse.$invalid, invalid: $v.compte.motDePasse.$invalid }"
              v-model="$v.compte.motDePasse.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="compte-role">Role</label>
            <input
              type="text"
              class="form-control"
              name="role"
              id="compte-role"
              data-cy="role"
              :class="{ valid: !$v.compte.role.$invalid, invalid: $v.compte.role.$invalid }"
              v-model="$v.compte.role.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="compte-ip">Ip</label>
            <input
              type="text"
              class="form-control"
              name="ip"
              id="compte-ip"
              data-cy="ip"
              :class="{ valid: !$v.compte.ip.$invalid, invalid: $v.compte.ip.$invalid }"
              v-model="$v.compte.ip.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="compte-status">Status</label>
            <input
              type="text"
              class="form-control"
              name="status"
              id="compte-status"
              data-cy="status"
              :class="{ valid: !$v.compte.status.$invalid, invalid: $v.compte.status.$invalid }"
              v-model="$v.compte.status.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="compte-user">User</label>
            <select class="form-control" id="compte-user" data-cy="user" name="user" v-model="compte.user">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="compte.user && userOption.id === compte.user.id ? compte.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.id }}
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
            :disabled="$v.compte.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./compte-update.component.ts"></script>
