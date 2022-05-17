<template>
  <b-navbar data-cy="navbar" toggleable="md" type="dark">
    <b-navbar-brand class="logo" b-link to="/">
      <span class="navbar-title">HealthCare</span>
    </b-navbar-brand>

    <b-collapse is-nav id="header-tabs">
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/" exact>Home</b-nav-item>
        <b-nav-item to="/admin/user-management" v-if="(hasAnyAuthority('ROLE_ADMIN') || hasAnyAuthority('SECRETAIRE')) && authenticated">Users</b-nav-item>
        <b-nav-item to="/medecin" v-if="hasAnyAuthority('ROLE_ADMIN') && authenticated">Medecins</b-nav-item>
        <b-nav-item to="/patient" v-if="hasAnyAuthority('SECRETAIRE') && authenticated">Patients</b-nav-item>
        <b-nav-item to="/secretaire" v-if="hasAnyAuthority('ROLE_ADMIN') && authenticated">Secretaires</b-nav-item>
        <b-nav-item to="/rendez-vous" v-if="(hasAnyAuthority('PATIENT') || hasAnyAuthority('SECRETAIRE') || hasAnyAuthority('MEDECIN')) && authenticated">Rendez-vous</b-nav-item>
        <b-nav-item to="/visite" v-if="(hasAnyAuthority('PATIENT') || hasAnyAuthority('SECRETAIRE')) && authenticated">Visites</b-nav-item>
        <b-nav-item to="/detection" v-if="hasAnyAuthority('MEDECIN') && authenticated">Detections</b-nav-item>
        <b-nav-item to="/maladie" v-if="(hasAnyAuthority('MEDECIN') || hasAnyAuthority('PATIENT')) && authenticated">Maladies</b-nav-item>
        <b-nav-item to="/image" v-if="hasAnyAuthority('MEDECIN') && authenticated">Images</b-nav-item>
        <b-nav-item to="/stade" v-if="hasAnyAuthority('MEDECIN') && authenticated">Stades</b-nav-item>

        <b-nav-item-dropdown
          right
          href="javascript:void(0);"
          id="account-menu"
          :class="{ 'router-link-active': subIsActive('/account') }"
          active-class="active"
          class="pointer"
          data-cy="accountMenu"
        >
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="user" />
            <span class="no-bold"> Account </span>
          </span>
          <b-dropdown-item data-cy="settings" to="/account/settings" tag="b-dropdown-item" v-if="authenticated" active-class="active">
            <font-awesome-icon icon="wrench" />
            <span>Settings</span>
          </b-dropdown-item>
          <b-dropdown-item data-cy="passwordItem" to="/account/password" tag="b-dropdown-item" v-if="authenticated" active-class="active">
            <font-awesome-icon icon="lock" />
            <span>Password</span>
          </b-dropdown-item>
          <b-dropdown-item data-cy="logout" v-if="authenticated" v-on:click="logout()" id="logout" active-class="active">
            <font-awesome-icon icon="sign-out-alt" />
            <span>Sign out</span>
          </b-dropdown-item>
          <b-dropdown-item data-cy="login" v-if="!authenticated" v-on:click="openLogin()" id="login" active-class="active">
            <font-awesome-icon icon="sign-in-alt" />
            <span>Sign in</span>
          </b-dropdown-item>
          <b-dropdown-item
            data-cy="register"
            to="/register"
            tag="b-dropdown-item"
            id="register"
            v-if="!authenticated"
            active-class="active"
          >
            <font-awesome-icon icon="user-plus" />
            <span>Register</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts" src="./jhi-navbar.component.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* ==========================================================================
    Navbar
    ========================================================================== */
.navbar-version {
  font-size: 10px;
}

.navbar {
  font-size: 0.95rem;
  text-transform: none;
  padding: 0.7rem 1rem;
  background-color: #106eea;
}

@media screen and (min-width: 768px) {
  .jh-navbar-toggler {
    display: none;
  }
}

@media screen and (min-width: 768px) and (max-width: 1150px) {
  span span {
    display: none;
  }
}

.navbar-title {
  display: inline-block;
  vertical-align: middle;
}

/* ==========================================================================
    Logo styles
    ========================================================================== */
.navbar-brand.logo {
  padding: 5px 15px;
}

.logo .logo-img {
  height: 45px;
  display: inline-block;
  vertical-align: middle;
  width: 70px;
}

.logo-img {
  height: 100%;
  background: url('../../../content/images/logo-jhipster.png') no-repeat center center;
  background-size: contain;
  width: 100%;
  filter: drop-shadow(0 0 0.05rem white);
}
</style>
