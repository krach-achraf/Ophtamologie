<template>
  <div>
    <h2  id="page-heading" data-cy="MedecinHeading">
      <span id="medecin-heading">Patients</span>
    </h2>
    <hr>
    <div class="table-responsive" >
      <table class="table table-striped" aria-describedby="medecins">
        <thead>
        <tr>
          <th scope="row"><span>ID</span></th>
          <th scope="row"><span>Code</span></th>
          <th scope="row"><span>Nom</span></th>
          <th scope="row"><span>Prenom</span></th>
          <th scope="row"><span>Date Naissance</span></th>
          <th scope="row"><span>Adresse</span></th>
          <th scope="row"><span>Genre</span></th>
          <th scope="row"><span>Telephone</span></th>
          <th scope="row"><span>Poids</span></th>
          <th scope="row"><span>Taille</span></th>
          <th scope="row"><span>Photo</span></th>
          <th scope="row"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="patient in patients" :key="patient.id" data-cy="entityTable">
          <td>{{ patient.id }}</td>
          <td>{{ patient.code }}</td>
          <td>{{ patient.nom }}</td>
          <td>{{ patient.prenom }}</td>
          <td>{{ patient.dateNaissance }}</td>
          <td>{{ patient.adresse }}</td>
          <td>{{ patient.genre }}</td>
          <td>{{ patient.telephone }}</td>
          <td>{{ patient.poids }}</td>
          <td>{{ patient.taille }}</td>
          <td>
            <a v-if="patient.photo" v-on:click="openFile(patient.photoContentType, patient.photo)">
              <img
                v-bind:src="'data:' + patient.photoContentType + ';base64,' + patient.photo"
                style="max-height: 30px"
                alt="patient image"
              />
            </a>
            <span v-if="patient.photo">{{ patient.photoContentType }}, {{ byteSize(patient.photo) }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" src="./medecin-patients.component.ts"></script>
