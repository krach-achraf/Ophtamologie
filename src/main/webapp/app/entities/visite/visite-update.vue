<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="pathogeneApp.visite.home.createOrEditLabel" data-cy="VisiteCreateUpdateHeading">Create or edit a Visite</h2>
        <div>
          <div class="form-group" v-if="visite.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="visite.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="visite-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="visite-code"
              data-cy="code"
              :class="{ valid: !$v.visite.code.$invalid, invalid: $v.visite.code.$invalid }"
              v-model="$v.visite.code.$model"
            />
            <div v-if="$v.visite.code.$anyDirty && $v.visite.code.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="visite-date">Date</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="visite-date"
                  v-model="$v.visite.date.$model"
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
                id="visite-date"
                data-cy="date"
                type="text"
                class="form-control"
                name="date"
                :class="{ valid: !$v.visite.date.$invalid, invalid: $v.visite.date.$invalid }"
                v-model="$v.visite.date.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="visite-rendezVous">Rendez Vous</label>
            <select class="form-control" id="visite-rendezVous" data-cy="rendezVous" name="rendezVous" v-model="visite.rendezVous">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="visite.rendezVous && rendezVousOption.id === visite.rendezVous.id ? visite.rendezVous : rendezVousOption"
                v-for="rendezVousOption in rendezVous"
                :key="rendezVousOption.id"
              >
                {{ rendezVousOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="visite-detection">Detection</label>
            <select class="form-control" id="visite-detection" data-cy="detection" name="detection" v-model="visite.detection">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="visite.detection && detectionOption.id === visite.detection.id ? visite.detection : detectionOption"
                v-for="detectionOption in detections"
                :key="detectionOption.id"
              >
                {{ detectionOption.id }}
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
            :disabled="$v.visite.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./visite-update.component.ts"></script>
