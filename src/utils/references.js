import { isEmpty, some } from 'lodash';

const anyConditionalPresent = references => some(references, ref => ref.conditional && !isEmpty(ref.value));

export default function referencesLocalErrors(references) {
  const errors = {};
  references.forEach((ref, i) => {
    if (ref.conditional && !anyConditionalPresent(references)) {
      errors[`bookerReferences.${i}.value`] = ['fill at least one of these fields'];
    }
    if (ref.mandatory && isEmpty(ref.value)) {
      errors[`bookerReferences.${i}.value`] = ['is not present'];
    }
  });
  return errors;
}
