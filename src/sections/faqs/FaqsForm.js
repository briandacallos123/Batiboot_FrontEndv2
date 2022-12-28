import { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
//
import { useDispatch } from 'react-redux';
import { varFade, MotionViewport } from '../../components/animate';
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  const { user, sendFaq } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Create date is required'),
    email: Yup.string().email().required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: user?.id || '',
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

  const onSubmit = async (data) => {
    try {
      const response = await sendFaq(data);
      enqueueSnackbar('Successfully Sent');
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack component={MotionViewport} spacing={3}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Haven't found the right help?
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField fullWidth label="Name" name="name" sx={{ mb: 2 }} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField fullWidth label="Email" name="email" sx={{ mb: 2 }} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField fullWidth label="Subject" name="subject" sx={{ mb: 2 }} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField fullWidth sx={{ mb: 2 }} name="message" label="Enter your message here." multiline rows={4} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <Button type="submit" size="large" variant="contained">
            Submit Now
          </Button>
        </m.div>
      </FormProvider>
    </Stack>
  );
}
