<template>
  <div class="container-fluid">
    <div class="card jh-card">
    <h2  id="page-heading" data-cy="MedecinHeading">
      <span id="medecin-heading">Patients</span>
    </h2>
    <hr>
    <div class="table-responsive" >
      <table class="table table-striped" aria-describedby="medecins">
        <thead>
        <tr>
          <th scope="row"><span>ID</span></th>
          <th scope="row"><span>Nom</span></th>
          <th scope="row"><span>Prenom</span></th>
          <th scope="row"><span>Adresse</span></th>
          <th scope="row"><span>Telephone</span></th>
          <th scope="row"><span>Photo</span></th>
          <th scope="row"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="patient in patients" :key="patient.id" data-cy="entityTable">
          <td>{{ patient.id }}</td>
          <td>{{ patient.nom }}</td>
          <td>{{ patient.prenom }}</td>
          <td>{{ patient.adresse }}</td>
          <td>{{ patient.telephone }}</td>
          <td>
            <a v-if="patient.photo" v-on:click="openFile(patient.photoContentType, patient.photo)">
              <img
                v-bind:src="'data:' + patient.photoContentType + ';base64,' + patient.photo"
                style="max-height: 30px"
                alt="patient image"
              />
            </a>
          </td>
          <td>
            <div class="btn-group">
              <router-link :to="{ name: 'MedecinPatientsDetails', params: { patientId: patient.id } }" custom v-slot="{ navigate }">
                <button @click="navigate" class="btn btn-info btn-sm details mr-1" data-cy="entityDetailsButton">
                  <font-awesome-icon icon="eye"></font-awesome-icon>
                  <span class="d-none d-md-inline">View</span>
                </button>
              </router-link>
              <b-button
                v-on:click="prepareDetection(patient)"
                variant="success"
                class="btn btn-sm mr-1"
                data-cy="entityDetectionButton"
                v-b-modal.detectionEntity
              >
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span class="d-none d-md-inline">Detection</span>
              </b-button>
              <b-button
                v-on:click="prepareStade(patient)"
                variant="dark"
                class="btn btn-sm"
                data-cy="entityStadeButton"
                v-b-modal.stadeEntity
              >
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span class="d-none d-md-inline">Stade</span>
              </b-button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <b-modal ref="detectionEntity" id="detectionEntity">
      <span slot="modal-title"
      ><span id="pathogeneApp.patient.detection.question" data-cy="patientDetectionDialogHeading">Créer la detection</span></span
      >
      <div class="modal-body">

        <div class="form-group">
          <label class="form-control-label" for="detection-photo">Photo</label>
          <div>
            <img
              v-bind:src="'data:' + detection.photoContentType + ';base64,' + detection.photo"
              style="max-height: 100px"
              v-if="detection.photo"
              alt="detection image"
            />
            <div v-if="detection.photo" class="form-text text-danger clearfix">
              <span class="pull-left">{{ detection.photoContentType }}, {{ byteSize(detection.photo) }}</span>
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
              v-on:change="setFileData($event, detection, 'photo', true)"
              accept="image/*"
            />
          </div>
          <input
            type="hidden"
            class="form-control"
            name="photo"
            id="detection-photo"
            data-cy="photo"
            :class="{ valid: !$v.detection.photo.$invalid, invalid: $v.detection.photo.$invalid }"
            v-model="$v.detection.photo.$model"
          />
          <input
            type="hidden"
            class="form-control"
            name="photoContentType"
            id="detection-photoContentType"
            v-model="detection.photoContentType"
          />
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
          <label class="form-control-label">Visite</label>
          <select class="form-control" id="visite-patient" data-cy="visite" name="patient" v-model="idVisite">
            <option
              v-for="visite in visites"
              :key="visite.id"
              v-bind:value="visite.id"
            >
               {{ visite.code}} - {{visite.date}}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-control-label">Maladie</label>
          <select class="form-control" id="maladie-patient" data-cy="maladie" name="maladie" v-model="idMaladie">
            <option
              v-for="maladie in maladies"
              :key="maladie.id"
              v-bind:value="maladie.id"
            >
              {{ maladie.nom}}
            </option>
          </select>
        </div>

      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Annuler</button>
        <button
          type="submit"
          id="save-entity"
          data-cy="entityCreateSaveButton"
          class="btn btn-primary"
          v-on:click="saveDetection()"
        >
          <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
        </button>
      </div>
    </b-modal>

      <b-modal ref="stadeEntity" id="stadeEntity">
      <span slot="modal-title"
      ><span id="pathogeneApp.patient.stade.question" data-cy="patientStadeDialogHeading">Affecter le stade</span></span
      >
        <div class="modal-body">
          <table class="table table-striped" aria-describedby="stades">
            <thead>
            <tr>
              <th scope="row"><span>Level</span></th>
              <th scope="row"><span>Maladie</span></th>
              <th scope="row"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="stade in stades" :key="stade.id" data-cy="entityTable">
              <td>{{ stade.level }}</td>
              <td>
                <div v-if="stade.maladie">{{ stade.maladie.nom }}</div>
              </td>
              <td class="text-right">
                <div class="btn-group">
                  <b-button
                    v-on:click="saveStade(stade)"
                    variant="success"
                    class="btn btn-sm"
                    data-cy="entityCreateButton"
                  >
                    <span class="d-none d-md-inline">Choisir</span>
                  </b-button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>

        </div>
        <div slot="modal-footer">
          <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Annuler</button>

        </div>
      </b-modal>


      <b-modal ref="afficheEntity" id="afficheEntity">
      <span slot="modal-title"
      ><span id="pathogeneApp.detection.affiche.question" data-cy="detectionAfficheDialogHeading">Result AI</span></span
      >
      <div class="modal-body">

        <dl class="row jh-entity-details">
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="detection.photo">
              <a v-on:click="openFile(detection.photoContentType, detection.photo)">
                <img
                  v-bind:src="'data:' + detection.photoContentType + ';base64,' + detection.photo"
                  style="max-width: 100%"
                  alt="patient image"
                />
              </a>
            </div>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ detection.description }}</span>
          </dd>
        </dl>

      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Quitter</button>
      </div>
    </b-modal>
  </div>
  </div>
</template>

<script lang="ts" src="./medecin-patients.component.ts"></script>
