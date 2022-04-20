<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="pathogeneApp.unclassified.home.createOrEditLabel" data-cy="UnclassifiedCreateUpdateHeading">
          Create or edit a Unclassified
        </h2>
        <div>
          <div class="form-group" v-if="unclassified.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="unclassified.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="unclassified-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="unclassified-code"
              data-cy="code"
              :class="{ valid: !$v.unclassified.code.$invalid, invalid: $v.unclassified.code.$invalid }"
              v-model="$v.unclassified.code.$model"
            />
            <div v-if="$v.unclassified.code.$anyDirty && $v.unclassified.code.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="unclassified-path">Path</label>
            <input
              type="text"
              class="form-control"
              name="path"
              id="unclassified-path"
              data-cy="path"
              :class="{ valid: !$v.unclassified.path.$invalid, invalid: $v.unclassified.path.$invalid }"
              v-model="$v.unclassified.path.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="unclassified-maladie">Maladie</label>
            <select class="form-control" id="unclassified-maladie" data-cy="maladie" name="maladie" v-model="unclassified.maladie">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="unclassified.maladie && maladieOption.id === unclassified.maladie.id ? unclassified.maladie : maladieOption"
                v-for="maladieOption in maladies"
                :key="maladieOption.id"
              >
                {{ maladieOption.id }}
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
            :disabled="$v.unclassified.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./unclassified-update.component.ts"></script>
