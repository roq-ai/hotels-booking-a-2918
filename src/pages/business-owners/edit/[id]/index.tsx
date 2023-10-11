import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getBusinessOwnerById, updateBusinessOwnerById } from 'apiSdk/business-owners';
import { businessOwnerValidationSchema } from 'validationSchema/business-owners';
import { BusinessOwnerInterface } from 'interfaces/business-owner';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function BusinessOwnerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<BusinessOwnerInterface>(
    () => (id ? `/business-owners/${id}` : null),
    () => getBusinessOwnerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BusinessOwnerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBusinessOwnerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/business-owners');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<BusinessOwnerInterface>({
    initialValues: data,
    validationSchema: businessOwnerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Business Owners',
              link: '/business-owners',
            },
            {
              label: 'Update Business Owner',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Business Owner
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.business_name}
            label={'Business Name'}
            props={{
              name: 'business_name',
              placeholder: 'Business Name',
              value: formik.values?.business_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.business_address}
            label={'Business Address'}
            props={{
              name: 'business_address',
              placeholder: 'Business Address',
              value: formik.values?.business_address,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.business_city}
            label={'Business City'}
            props={{
              name: 'business_city',
              placeholder: 'Business City',
              value: formik.values?.business_city,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.business_state}
            label={'Business State'}
            props={{
              name: 'business_state',
              placeholder: 'Business State',
              value: formik.values?.business_state,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.business_zip_code}
            label={'Business Zip Code'}
            props={{
              name: 'business_zip_code',
              placeholder: 'Business Zip Code',
              value: formik.values?.business_zip_code,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.business_country}
            label={'Business Country'}
            props={{
              name: 'business_country',
              placeholder: 'Business Country',
              value: formik.values?.business_country,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/business-owners')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'business_owner',
    operation: AccessOperationEnum.UPDATE,
  }),
)(BusinessOwnerEditPage);
