<template>
  <figure @click="clicked">
    <img :src="ponyImageUrl" :alt="ponyModel.name" />
    <figcaption>{{ ponyModel.name }}</figcaption>
  </figure>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { PonyModel } from '@/models/PonyModel';

export default defineComponent({
  name: 'Pony',

  props: {
    ponyModel: {
      type: Object as PropType<PonyModel>,
      required: true
    }
  },

  emits: {
    ponySelected: () => true
  },

  setup(props, { emit }) {
    const ponyImageUrl = computed(() => `/images/pony-${props.ponyModel.color.toLowerCase()}.gif`);

    function clicked() {
      emit('ponySelected');
    }

    return { ponyImageUrl, clicked };
  }
});
</script>

<style scoped>
figure {
  margin: 3px;
  padding: 3px;
  font-size: 12px;
}

img {
  height: 50px;
}
</style>
