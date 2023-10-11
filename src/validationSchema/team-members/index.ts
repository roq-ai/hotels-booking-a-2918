import * as yup from 'yup';

export const teamMemberValidationSchema = yup.object().shape({
  phone_number: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip_code: yup.string().required(),
  country: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
