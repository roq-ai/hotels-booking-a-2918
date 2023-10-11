import * as yup from 'yup';

export const businessOwnerValidationSchema = yup.object().shape({
  business_name: yup.string().required(),
  business_address: yup.string().required(),
  business_city: yup.string().required(),
  business_state: yup.string().required(),
  business_zip_code: yup.string().required(),
  business_country: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
