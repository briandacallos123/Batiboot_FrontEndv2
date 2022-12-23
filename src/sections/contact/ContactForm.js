import React, { useMemo } from 'react';
import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { MotionViewport, varFade } from '../../components/animate';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { contactUsSend } = useAuth();
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Name is required'),
    email: Yup.string().nullable().required('email is required'),
    subject: Yup.string().nullable().required('subject is required'),
    message: Yup.string().nullable().required('message is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
      subject: '',
      message: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      const response = await contactUsSend(values);
      enqueueSnackbar('Successfully Sent');
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack component={MotionViewport} spacing={5}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h3">
            Feel free to contact us. <br />
            We'll be glad to hear from you! <br />
          </Typography>
        </m.div>

        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            {/* <TextField fullWidth label="Name" /> */}
            <RHFTextField name="name" label="Name" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField name="email" label="Email" />
            {/* <TextField fullWidth label="Email" /> */}
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField name="subject" label="Subject" />
            {/* <TextField fullWidth label="Subject" /> */}
          </m.div>

          <m.div variants={varFade().inUp}>
            {/* <TextField fullWidth label="Enter your message here." multiline rows={4} /> */}
            <RHFTextField multiline rows={4} name="message" label="Enter your message here." />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <Button size="large" variant="contained" sx={{ mt: 3 }} type="submit">
            Submit Now
          </Button>
        </m.div>
      </FormProvider>
    </Stack>
  );
}
