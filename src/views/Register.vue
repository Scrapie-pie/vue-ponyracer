<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>{{ t('register.title') }}</h1>

      <Alert v-if="registrationFailed" variant="danger" dismissible @dismissed="registrationFailed = false">
        {{ t('register.failed') }}
      </Alert>

      <Form @submit="register($event)" :initialValues="initialValues" v-slot="{ meta: formMeta }">
        <Field name="login" rules="required|min:3" v-slot="{ field, meta }">
          <div class="mb-3">
            <label for="login" class="form-label" v-meta-class:text-danger="meta">{{ t('register.login') }}</label>
            <input id="login" class="form-control" v-meta-class:is-invalid="meta" v-bind="field" />
            <ErrorMessage name="login" class="invalid-feedback" />
          </div>
        </Field>
        <Field name="password" rules="required" v-slot="{ field, meta }">
          <div class="mb-3">
            <label for="password" class="form-label" v-meta-class:text-danger="meta">{{ t('register.password') }}</label>
            <input id="password" type="password" class="form-control" v-meta-class:is-invalid="meta" v-bind="field" />
            <ErrorMessage name="password" class="invalid-feedback" />
          </div>
        </Field>
        <Field name="confirmPassword" rules="required|confirmed:@password" v-slot="{ field, meta }">
          <div class="mb-3">
            <label for="confirm-password" class="form-label" v-meta-class:text-danger="meta">{{ t('register.confirm') }}</label>
            <input id="confirm-password" type="password" class="form-control" v-meta-class:is-invalid="meta" v-bind="field" />
            <ErrorMessage name="confirmPassword" class="invalid-feedback" />
          </div>
        </Field>
        <Field name="birthYear" rules="required|min_value:1900|isOldEnough" v-slot="{ field, meta }">
          <div class="mb-3">
            <label for="birth-year" class="form-label" v-meta-class:text-danger="meta">{{ t('register.birth-year') }}</label>
            <input id="birth-year" type="number" class="form-control" v-meta-class:is-invalid="meta" v-bind="field" />
            <ErrorMessage name="birthYear" class="invalid-feedback" />
          </div>
        </Field>
        <button class="btn btn-primary" type="submit" :disabled="!formMeta.valid">{{ t('register.go') }}</button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { UserModel } from '@/models/UserModel';
import { useUserStore } from '@/composables/UserStore';
import { useForms } from '@/composables/Forms';
import { useTypedI18n } from '@/composables/TypedI18n';
import { vMetaClass } from '@/directives/MetaClass';

const { t } = useTypedI18n();
useForms();
const initialValues = { birthYear: new Date().getFullYear() - 18 };
const userService = useUserStore();
const router = useRouter();
const registrationFailed = ref(false);
async function register(userModel: Record<string, unknown>) {
  try {
    await userService.register(userModel as unknown as UserModel);
    router.push({ name: 'home' });
  } catch (e) {
    registrationFailed.value = true;
  }
}
</script>
