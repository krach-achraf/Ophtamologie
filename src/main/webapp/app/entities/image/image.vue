<template>
  <div>
    <h2 id="page-heading" data-cy="ImageHeading">
      <span id="image-heading">Images</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ImageCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-image"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Image </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && images && images.length === 0">
      <span>No images found</span>
    </div>
    <div class="table-responsive" v-if="images && images.length > 0">
      <table class="table table-striped" aria-describedby="images">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Code</span></th>
            <th scope="row"><span>Photo</span></th>
            <th scope="row"><span>Stade</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="image in images" :key="image.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ImageView', params: { imageId: image.id } }">{{ image.id }}</router-link>
            </td>
            <td>{{ image.code }}</td>
            <td>
              <a v-if="image.photo" v-on:click="openFile(image.photoContentType, image.photo)">
                <img v-bind:src="'data:' + image.photoContentType + ';base64,' + image.photo" style="max-height: 30px" alt="image image" />
              </a>
              <span v-if="image.photo">{{ image.photoContentType }}, {{ byteSize(image.photo) }}</span>
            </td>
            <td>
              <div v-if="image.stade">
                <router-link :to="{ name: 'StadeView', params: { stadeId: image.stade.id } }">{{ image.stade.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ImageView', params: { imageId: image.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ImageEdit', params: { imageId: image.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(image)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="pathogeneApp.image.delete.question" data-cy="imageDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-image-heading">Are you sure you want to delete this Image?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-image"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeImage()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./image.component.ts"></script>
