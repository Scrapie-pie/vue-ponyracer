<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>Log in</h1>

      <Alert v-if="authenticationFailed" variant="danger" dismissible @dismissed="authenticationFailed = false">Nope, try again.</Alert>

      <Form @submit="authenticate($event)" v-slot="{ meta: formMeta }">
        <Field name="login" rules="required" v-slot="{ field, meta }">
          <div class="mb-3">
            <label for="login" class="form-label" v-meta-class:text-danger="meta">Login</label>
            <input id="login" class="form-control" v-meta-class:is-invalid="meta" v-bind="field" />
            <ErrorMessage name="login" class="invalid-feedback" />
          </div>
        </Field>
        <Field name="password" rules="required" v-slot="{ field, meta }">
          <div class="mb-3">
            <label for="password" class="form-label" v-meta-class:text-danger="meta">Password</label>
            <input id="password" type="password" class="form-control" v-meta-class:is-invalid="meta" v-bind="field" />
            <ErrorMessage name="password" class="invalid-feedback" />
          </div>
        </Field>
        <button class="btn btn-primary" :class="{ shake: authenticationFailed }" type="submit" :disabled="!formMeta.valid">
          Log me in!
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { useUserStore } from '@/composables/UserStore';
import { useForms } from '@/composables/Forms';
import { vMetaClass } from '@/directives/MetaClass';

useForms();
const userService = useUserStore();
const router = useRouter();
const authenticationFailed = ref(false);
async function authenticate(credentials: Record<string, unknown>) {
  authenticationFailed.value = false;
  try {
    await userService.authenticate(credentials as { login: string; password: string });
    router.push({ name: 'home' });
  } catch (e) {
    authenticationFailed.value = true;
  }
}
</script>

<style scoped>
.shake {
  animation: shake 300ms ease;
}
@keyframes shake {
  10%,
  50%,
  90% {
    transform: translateX(0.5rem);
  }
  30%,
  70% {
    transform: translateX(-0.5rem);
  }
}
</style>
