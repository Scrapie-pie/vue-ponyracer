<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">PonyRacer</RouterLink>
      <button type="button" class="navbar-toggler" @click="toggleNavbar()">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbar" class="navbar-collapse" :class="{ collapse: navbarCollapsed }">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink to="/races" v-if="userModel" class="nav-link">{{ t('navbar.races') }}</RouterLink>
          </li>
        </ul>
        <div class="navbar-nav">
          <select class="form-select form-select-sm" :aria-label="t('navbar.language')" v-model="locale">
            <option v-for="availableLocale in availableLocales" :value="availableLocale" :key="availableLocale">
              {{ availableLocale }}
            </option>
          </select>
        </div>
        <ul class="navbar-nav" v-if="userModel">
          <li class="nav-item">
            <RouterLink :to="{ name: 'score' }" class="nav-link">
              <span id="current-user" class="me-2">
                {{ userModel.login }}
                <span class="fa fa-star"></span>
                {{ n(userModel.money!) }}
              </span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <a id="logout-link" @click="logout()" class="nav-link" role="button">
              <span class="fa fa-power-off"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/composables/UserStore';
import { useTypedI18n } from '@/composables/TypedI18n';

const { t, locale, availableLocales, n } = useTypedI18n();

const navbarCollapsed = ref(true);
function toggleNavbar() {
  navbarCollapsed.value = !navbarCollapsed.value;
}

const userStore = useUserStore();
const { userModel } = storeToRefs(userStore);

const router = useRouter();
function logout() {
  userStore.logoutAndForget();
  router.push({ name: 'home' });
}
</script>
