<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="pathogeneApp.image.home.createOrEditLabel" data-cy="ImageCreateUpdateHeading">Create or edit a Image</h2>
        <div>
          <div class="form-group" v-if="image.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="image.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="image-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="image-code"
              data-cy="code"
              :class="{ valid: !$v.image.code.$invalid, invalid: $v.image.code.$invalid }"
              v-model="$v.image.code.$model"
            />
            <div v-if="$v.image.code.$anyDirty && $v.image.code.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="image-path">Path</label>
            <input
              type="text"
              class="form-control"
              name="path"
              id="image-path"
              data-cy="path"
              :class="{ valid: !$v.image.path.$invalid, invalid: $v.image.path.$invalid }"
              v-model="$v.image.path.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="image-stade">Stade</label>
            <select class="form-control" id="image-stade" data-cy="stade" name="stade" v-model="image.stade">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="image.stade && stadeOption.id === image.stade.id ? image.stade : stadeOption"
                v-for="stadeOption in stades"
                :key="stadeOption.id"
              >
                {{ stadeOption.id }}
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
            :disabled="$v.image.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./image-update.component.ts"></script>
