<template>
  <div>
    <h2>{{ raceModel.name }}</h2>
    <p>{{ startInstant }}</p>
    <div class="row">
      <div class="col" v-for="pony in raceModel.ponies" :key="pony.id">
        <Pony :ponyModel="pony" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import fromNow from '@/utils/FromNow';
import Pony from '@/components/Pony.vue';

export default defineComponent({
  name: 'Race',

  components: {
    Pony
  },

  props: {
    raceModel: {
      type: Object as PropType<RaceModel>,
      required: true
    }
  },

  setup(props) {
    const startInstant = computed(() => fromNow(props.raceModel.startInstant));
    return { startInstant };
  }
});
</script>
