import { Directive } from 'vue';
import { FieldMeta } from 'vee-validate';

/**
 * Add a class (given in argument) to the element if the field is dirty and invalid.
 */
export const vMetaClass: Directive<HTMLElement, FieldMeta<unknown>> = (el, bindings) => {
  const classValue = bindings.arg!;
  const meta = bindings.value;
  if (meta.dirty && !meta.valid) {
    el.classList.add(classValue);
  } else {
    el.classList.remove(classValue);
  }
};
