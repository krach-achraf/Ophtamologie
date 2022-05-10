<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="maladie">
        <h2 class="jh-entity-heading" data-cy="maladieDetailsHeading"><span>Maladie</span> {{ maladie.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ maladie.code }}</span>
          </dd>
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ maladie.date }}</span>
          </dd>
        </dl>

        <br/>
        <div v-if="stades && stades.length > 0">
          <h2 id="page-heading" data-cy="StadeHeading">
            <span id="stade-heading">Stades</span>
          </h2>
          <hr>
          <div class="table-responsive">
            <table class="table table-striped" aria-describedby="stades">
              <thead>
              <tr>
                <th scope="row"><span>ID</span></th>
                <th scope="row"><span>Code</span></th>
                <th scope="row"><span>Level</span></th>
                <th scope="row"><span>Description</span></th>
                <th scope="row"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="stade in stades" :key="stade.id" data-cy="entityTable">
                <td>
                  <router-link :to="{ name: 'StadeView', params: { stadeId: stade.id } }">{{ stade.id }}</router-link>
                </td>
                <td>{{ stade.code }}</td>
                <td>{{ stade.level }}</td>
                <td>{{ stade.description }}</td>
                <td class="text-right">
                  <div class="btn-group">
                    <b-button
                      v-on:click="prepareCeate(stade)"
                      variant="info"
                      class="btn btn-sm"
                      data-cy="entityCreateButton"
                      v-b-modal.removeEntity
                    >
                      <font-awesome-icon icon="plus"></font-awesome-icon>
                      <span class="d-none d-md-inline">Image</span>
                    </b-button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info"
                data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="maladie.id" :to="{ name: 'MaladieEdit', params: { maladieId: maladie.id } }" custom
                     v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>

    <b-modal ref="createEntity" id="affecteEntity">
      <span slot="modal-title"
      ><span id="pathogeneApp.maladie.affecte.question"
             data-cy="maladieAffecteDialogHeading">Créer le stade</span></span
      >
      <div class="modal-body">

        <form name="editForm" role="form" novalidate v-on:submit.prevent="saveImage()">
          <div>
            <div class="form-group">
              <label class="form-control-label" for="image-photo">Photo</label>
              <div>
                <img
                  v-bind:src="'data:' + image.photoContentType + ';base64,' + image.photo"
                  style="max-height: 100px"
                  v-if="image.photo"
                  alt="image image"
                />
                <div v-if="image.photo" class="form-text text-danger clearfix">
                  <span class="pull-left">{{ image.photoContentType }}, {{ byteSize(image.photo) }}</span>
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
                  v-on:change="setFileData($event, image, 'photo', true)"
                  accept="image/*"
                />
              </div>
              <input
                type="hidden"
                class="form-control"
                name="photo"
                id="image-photo"
                data-cy="photo"
                :class="{ valid: !$v.image.photo.$invalid, invalid: $v.image.photo.$invalid }"
                v-model="$v.image.photo.$model"
              />
              <input
                type="hidden"
                class="form-control"
                name="photoContentType"
                id="image-photoContentType"
                v-model="image.photoContentType"
              />
            </div>

          </div>
          <div>
            <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary"
                    v-on:click="previousState()">
              <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
            </button>
            <button
              type="submit"
              id="save-entity"
              data-cy="entityCreateSaveButton"
              class="btn btn-primary"
            >
              <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
            </button>
          </div>
        </form>

      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Annuler</button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./maladie-details.component.ts"></script>
