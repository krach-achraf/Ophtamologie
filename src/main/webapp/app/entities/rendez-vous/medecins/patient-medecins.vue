<template>
  <div class="container-fluid">
    <div class="card jh-card">
    <h2  id="page-heading" data-cy="MedecinHeading">
      <span id="medecin-heading">Medecins</span>
    </h2>
    <hr>
    <div class="table-responsive" >
      <table class="table table-striped" aria-describedby="medecins">
        <thead>
        <tr>
          <th scope="row"><span>Nom</span></th>
          <th scope="row"><span>Num Emp</span></th>
          <th scope="row"><span>Prenom</span></th>
          <th scope="row"><span>Expert Level</span></th>
          <th scope="row"><span>Photo</span></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="medecin in medecins" :key="medecin.id" data-cy="entityTable">
          <td>{{ medecin.nom }}</td>
          <td>{{ medecin.numEmp }}</td>
          <td>{{ medecin.prenom }}</td>
          <td>{{ medecin.expertLevel }}</td>
          <td>
            <a v-if="medecin.photo" v-on:click="openFile(medecin.photoContentType, medecin.photo)">
              <img
                v-bind:src="'data:' + medecin.photoContentType + ';base64,' + medecin.photo"
                style="max-height: 70px"
                alt="medecin image"
              />
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script lang="ts" src="./patient-medecins.component.ts"></script>
