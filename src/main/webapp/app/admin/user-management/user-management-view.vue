<template>
  <div class="container-fluid">
    <div class="card jh-card">
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="user">
        <h2 class="jh-entity-heading">
          <span>User</span> [<strong>{{ user.login }}</strong
          >]
        </h2>
        <dl class="row jh-entity-details">
          <dt><span>Login</span></dt>
          <dd>
            <span>{{ user.login }}</span>
            <b-badge variant="success" v-if="user.activated">Activated</b-badge>
            <b-badge variant="danger" v-if="!user.activated">Deactivated</b-badge>
          </dd>
          <dt><span>First Name</span></dt>
          <dd>{{ user.firstName }}</dd>
          <dt><span>Last Name</span></dt>
          <dd>{{ user.lastName }}</dd>
          <dt><span>Email</span></dt>
          <dd>{{ user.email }}</dd>
          <dt><span>Created By</span></dt>
          <dd>{{ user.createdBy }}</dd>
          <dt><span>Created Date</span></dt>
          <dd>{{ user.createdDate | formatDate }}</dd>
          <dt><span>Last Modified By</span></dt>
          <dd>{{ user.lastModifiedBy }}</dd>
          <dt><span>Last Modified Date</span></dt>
          <dd>{{ user.lastModifiedDate | formatDate }}</dd>
          <dt><span>Profiles</span></dt>
          <dd>
            <ul class="list-unstyled">
              <li v-for="authority of user.authorities" :key="authority">
                <b-badge variant="info">{{ authority }}</b-badge>
              </li>
            </ul>
          </dd>
        </dl>
        <router-link custom v-slot="{ navigate }" :to="{ name: 'JhiUser' }">
          <button @click="navigate" class="btn btn-info">
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script lang="ts" src="./user-management-view.component.ts"></script>
