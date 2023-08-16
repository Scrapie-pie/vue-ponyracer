<template>
  <div>
    <h1>{{ t('races.title') }}</h1>
    <ul class="nav nav-tabs mt-2 mb-4">
      <li class="nav-item">
        <RouterLink :to="{ name: 'pendingRaces' }" class="nav-link" activeClass="active">{{ t('races.pending') }}</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :to="{ name: 'finishedRaces' }" class="nav-link" activeClass="active">{{ t('races.finished') }}</RouterLink>
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useTypedI18n } from '@/composables/TypedI18n';

const { t } = useTypedI18n();
</script>
