<template>
  <div class="alert" :class="alertClasses">
    <slot></slot>
    <button type="button" class="btn-close" aria-label="Close" v-if="dismissible" @click="dismiss()"></button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  dismissible?: boolean;
}>();

const emit = defineEmits<{
  dismissed: [];
}>();

defineSlots<{
  default: (props: Record<string, never>) => void;
}>();

function dismiss() {
  emit('dismissed');
}

const alertClasses = computed(() => `alert-${props.variant}${props.dismissible ? ' alert-dismissible' : ''}` as const);
</script>
