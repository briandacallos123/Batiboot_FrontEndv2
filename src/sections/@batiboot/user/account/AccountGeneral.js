import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
// _mock
import { countries } from '../../../../_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const [fileParts, setfileParts] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const { user, updateProfile } = useAuth();
  const [rawFile, setRawFile] = useState(null);
  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    displayName: user?.name || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    phoneNumber: user?.phone || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // alert(fileParts)
      // const photo = !fileParts ? user.photoURL : fileParts;
      const form = new FormData();
      form.append('name', data.displayName);
      form.append('email', data.email);
      form.append('phone', data.phoneNumber);
      form.append('address', data.address);
      form.append('id', user.id);
      // form.append('images[]', data.photoURL);
      if(rawFile) {
      rawFile.map((file) => form.append('images[]', data.photoURL));
      }
      await updateProfile(form);
      console.log(data.photoURL);
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setRawFile(acceptedFiles);
      const file = acceptedFiles[0];
      if (
        file.type.toString() === 'image/png' ||
        file.type.toString() === 'image/jpg' ||
        file.type.toString() === 'image/jpeg' ||
        file.type.toString() === 'image/gif'
      ) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onloadend = (e) => {
        //   setfileParts(reader.result);
        //   setValue(
        //     'photoURL',
        //     Object.assign(e, {
        //       preview: URL.createObjectURL(e.target.files),
        //     })
        //   );

          /* fileParts.push({
              data64: [reader.result],
            }) */
       // };
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <RHFSwitch name="isPublic" labelPlacement="start" label="Public Profile" sx={{ mt: 5 }} />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="displayName" label="Name" />
              <RHFTextField name="email" label="Email Address" />

              <RHFTextField type="number" name="phoneNumber" label="Phone Number" />
              <RHFTextField name="address" label="Address" />

              <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="state" label="State/Region" />

              <RHFTextField name="city" label="City" />
              <RHFTextField type="number" name="zipCode" label="Zip/Code" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="About" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
