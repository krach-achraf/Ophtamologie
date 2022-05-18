<template>
  <div class="container-fluid">
    <div class="card jh-card">
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="pathogeneApp.maladie.home.createOrEditLabel" data-cy="MaladieCreateUpdateHeading">Create or edit a Maladie</h2>
        <div>
          <div class="form-group" v-if="maladie.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="maladie.id" readonly />
          </div>

          <div class="form-group">
            <label class="form-control-label" for="maladie-date">Date</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="maladie-date"
                  v-model="$v.maladie.date.$model"
                  name="date"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="maladie-date"
                data-cy="date"
                type="text"
                class="form-control"
                name="date"
                :class="{ valid: !$v.maladie.date.$invalid, invalid: $v.maladie.date.$invalid }"
                v-model="$v.maladie.date.$model"
              />
            </b-input-group>
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
            :disabled="$v.maladie.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
    </div>
  </div>
</template>
<script lang="ts" src="./maladie-update.component.ts"></script>
