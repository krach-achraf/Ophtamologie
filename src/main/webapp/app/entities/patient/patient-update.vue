<template>
  <div class="container-fluid">
    <div class="card jh-card">
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="pathogeneApp.patient.home.createOrEditLabel" data-cy="PatientCreateUpdateHeading">Create or edit a Patient</h2>
        <div>
          <div class="form-group" v-if="patient.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="patient.id" readonly />
          </div>

          <div class="form-group">
            <label class="form-control-label" for="patient-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="patient-nom"
              data-cy="nom"
              :class="{ valid: !$v.patient.nom.$invalid, invalid: $v.patient.nom.$invalid }"
              v-model="$v.patient.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="patient-prenom">Prenom</label>
            <input
              type="text"
              class="form-control"
              name="prenom"
              id="patient-prenom"
              data-cy="prenom"
              :class="{ valid: !$v.patient.prenom.$invalid, invalid: $v.patient.prenom.$invalid }"
              v-model="$v.patient.prenom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="patient-dateNaissance">Date Naissance</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="patient-dateNaissance"
                  v-model="$v.patient.dateNaissance.$model"
                  name="dateNaissance"
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
                id="patient-dateNaissance"
                data-cy="dateNaissance"
                type="text"
                class="form-control"
                name="dateNaissance"
                :class="{ valid: !$v.patient.dateNaissance.$invalid, invalid: $v.patient.dateNaissance.$invalid }"
                v-model="$v.patient.dateNaissance.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="patient-adresse">Adresse</label>
            <input
              type="text"
              class="form-control"
              name="adresse"
              id="patient-adresse"
              data-cy="adresse"
              :class="{ valid: !$v.patient.adresse.$invalid, invalid: $v.patient.adresse.$invalid }"
              v-model="$v.patient.adresse.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="patient-genre">Genre</label>
            <select
              class="form-control"
              name="genre"
              :class="{ valid: !$v.patient.genre.$invalid, invalid: $v.patient.genre.$invalid }"
              v-model="$v.patient.genre.$model"
              id="patient-genre"
              data-cy="genre"
            >
              <option v-for="genre in genreValues" :key="genre" v-bind:value="genre">{{ genre }}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="patient-telephone">Telephone</label>
            <input
              type="text"
              class="form-control"
              name="telephone"
              id="patient-telephone"
              data-cy="telephone"
              :class="{ valid: !$v.patient.telephone.$invalid, invalid: $v.patient.telephone.$invalid }"
              v-model="$v.patient.telephone.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="patient-poids">Poids</label>
            <input
              type="number"
              class="form-control"
              name="poids"
              id="patient-poids"
              data-cy="poids"
              :class="{ valid: !$v.patient.poids.$invalid, invalid: $v.patient.poids.$invalid }"
              v-model.number="$v.patient.poids.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="patient-taille">Taille</label>
            <input
              type="number"
              class="form-control"
              name="taille"
              id="patient-taille"
              data-cy="taille"
              :class="{ valid: !$v.patient.taille.$invalid, invalid: $v.patient.taille.$invalid }"
              v-model.number="$v.patient.taille.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="patient-photo">Photo</label>
            <div>
              <img
                v-bind:src="'data:' + patient.photoContentType + ';base64,' + patient.photo"
                style="max-height: 100px"
                v-if="patient.photo"
                alt="patient image"
              />
              <div v-if="patient.photo" class="form-text text-danger clearfix">
                <span class="pull-left">{{ patient.photoContentType }}, {{ byteSize(patient.photo) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('photo', 'photoContentType', 'file_photo')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_photo"
                id="file_photo"
                data-cy="photo"
                v-on:change="setFileData($event, patient, 'photo', true)"
                accept="image/*"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="photo"
              id="patient-photo"
              data-cy="photo"
              :class="{ valid: !$v.patient.photo.$invalid, invalid: $v.patient.photo.$invalid }"
              v-model="$v.patient.photo.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="photoContentType"
              id="patient-photoContentType"
              v-model="patient.photoContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="patient-user">User</label>
            <select class="form-control" id="patient-user" data-cy="user" name="user" v-model="patient.user">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="patient.user && userOption.id === patient.user.id ? patient.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.login }}
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
            :disabled="$v.patient.$invalid || isSaving"
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
<script lang="ts" src="./patient-update.component.ts"></script>
