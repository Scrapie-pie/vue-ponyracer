<template>
  <div class="text-center" style="margin-top: 100px">
    <div>
      <h1>
        {{ t('home.title') }}
        <small>{{ t('home.tagline') }}</small>
      </h1>
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="!userModel">
        <RouterLink to="/login" class="btn btn-large btn-primary me-2">{{ t('home.login') }}</RouterLink>
        <RouterLink to="/register" class="btn btn-large btn-primary">{{ t('home.register') }}</RouterLink>
      </div>
      <div v-else>
        <RouterLink to="/races" class="btn btn-large btn-primary">{{ t('home.races') }}</RouterLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/composables/UserStore';
import { useTypedI18n } from '@/composables/TypedI18n';

const { userModel } = storeToRefs(useUserStore());
const { t } = useTypedI18n();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
