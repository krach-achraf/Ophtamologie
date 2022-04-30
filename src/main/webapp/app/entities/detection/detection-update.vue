<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="pathogeneApp.detection.home.createOrEditLabel" data-cy="DetectionCreateUpdateHeading">Create or edit a Detection</h2>
        <div>
          <div class="form-group" v-if="detection.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="detection.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="detection-image">Image</label>
            <input
              type="text"
              class="form-control"
              name="image"
              id="detection-image"
              data-cy="image"
              :class="{ valid: !$v.detection.image.$invalid, invalid: $v.detection.image.$invalid }"
              v-model="$v.detection.image.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="detection-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="detection-code"
              data-cy="code"
              :class="{ valid: !$v.detection.code.$invalid, invalid: $v.detection.code.$invalid }"
              v-model="$v.detection.code.$model"
            />
            <div v-if="$v.detection.code.$anyDirty && $v.detection.code.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="detection-validation">Validation</label>
            <input
              type="checkbox"
              class="form-check"
              name="validation"
              id="detection-validation"
              data-cy="validation"
              :class="{ valid: !$v.detection.validation.$invalid, invalid: $v.detection.validation.$invalid }"
              v-model="$v.detection.validation.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="detection-stade">Stade</label>
            <input
              type="text"
              class="form-control"
              name="stade"
              id="detection-stade"
              data-cy="stade"
              :class="{ valid: !$v.detection.stade.$invalid, invalid: $v.detection.stade.$invalid }"
              v-model="$v.detection.stade.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="detection-date">Date</label>
            <div class="d-flex">
              <input
                id="detection-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.detection.date.$invalid, invalid: $v.detection.date.$invalid }"
                :value="convertDateTimeFromServer($v.detection.date.$model)"
                @change="updateZonedDateTimeField('date', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="detection-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="detection-description"
              data-cy="description"
              :class="{ valid: !$v.detection.description.$invalid, invalid: $v.detection.description.$invalid }"
              v-model="$v.detection.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="detection-maladie">Maladie</label>
            <select class="form-control" id="detection-maladie" data-cy="maladie" name="maladie" v-model="detection.maladie">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="detection.maladie && maladieOption.id === detection.maladie.id ? detection.maladie : maladieOption"
                v-for="maladieOption in maladies"
                :key="maladieOption.id"
              >
                {{ maladieOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="detection-patient">Patient</label>
            <select class="form-control" id="detection-patient" data-cy="patient" name="patient" v-model="detection.patient">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="detection.patient && patientOption.id === detection.patient.id ? detection.patient : patientOption"
                v-for="patientOption in patients"
                :key="patientOption.id"
              >
                {{ patientOption.id }}
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
            :disabled="$v.detection.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./detection-update.component.ts"></script>
