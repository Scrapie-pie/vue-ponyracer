<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>Log in</h1>

      <Alert v-if="authenticationFailed" variant="danger" dismissible @dismissed="authenticationFailed = false">Nope, try again.</Alert>

      <Form @submit="authenticate($event)" v-slot="{ meta: formMeta }">
        <Field name="login" rules="required" v-slot="{ field, meta }">
          <div class="mb-3">
            <label for="login" class="form-label" :class="{ 'text-danger': meta.dirty && !meta.valid }">Login</label>
            <input id="login" class="form-control" :class="{ 'is-invalid': meta.dirty && !meta.valid }" v-bind="field" />
            <ErrorMessage name="login" class="invalid-feedback" />
          </div>
        </Field>
        <Field name="password" rules="required" v-slot="{ field, meta }">
          <div class="mb-3">
            <label for="password" class="form-label" :class="{ 'text-danger': meta.dirty && !meta.valid }">Password</label>
            <input id="password" type="password" class="form-control" :class="{ 'is-invalid': meta.dirty && !meta.valid }" v-bind="field" />
            <ErrorMessage name="password" class="invalid-feedback" />
          </div>
        </Field>
        <button class="btn btn-primary" type="submit" :disabled="!formMeta.valid">Log me in!</button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { useUserService } from '@/composables/UserService';
import { useForms } from '@/composables/Forms';

useForms();
const userService = useUserService();
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