import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, } from 'react';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, OutlinedInput, FormHelperText, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD, PATH_AUTH, PATH_BATIBOOT, PATH_BATIBOOT_USER } from '../../../routes/paths';

import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function VerifyCodeForm() {
  const { newUserEmailVerification, user } = useAuth();
  const currentRole = user?.user_role;
  const { token, email } = useParams();
  const [temp, setTemp] = useState([]);
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    const target = document.querySelector('input.field-code');

    target?.addEventListener('paste', handlePaste);

    return () => {
      target?.removeEventListener('paste', handlePaste);
    };
   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // not fix when code is not empty set error email set to empty
  // useEffect(() => {
  //   if(errors.code6?.message !== 'Code is required') {
  //   setError("");
  //   console.log(!errors.code6);
  //   console.log(errors);
  //   }
  // }, [temp]);
  

  const handlePaste = (event) => {
    let data = event.clipboardData.getData('text');

    data = data.split('');

    [].forEach.call(document.querySelectorAll('.field-code'), (node, index) => {
      node.value = data[index];

      const fieldIndex = `code${index + 1}`;

      setValue(fieldIndex, data[index]);
    });

    event.preventDefault();
  };

  const handleChangeWithNextField = async (event, handleChange) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 6) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
    setTemp([...temp, value]);
    /* if(fieldIntIndex >= 6){
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
      //  const validate = await checkEmailCode(temp.join(""));
     //    sessionStorage.setItem('email-recovery', user.uemail);
        
        
      } catch (error) {   
        reset();
  
        if (isMountedRef.current) {
          setError('afterSubmit', { ...error, message: error.message });
        }
      }
    } */

    handleChange(event);
  };

  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const code = Object.values(data).join('');
      await newUserEmailVerification(token, email, code);

     
      reset();
      setTemp('');
      enqueueSnackbar('Verify success!');
      
      // if(currentRole){
      //   navigate(PATH_BATIBOOT_USER.general.dashboard);
      // } else {
      //   navigate(PATH_BATIBOOT.general.dashboard);
      // }
      
      navigate(PATH_BATIBOOT.general.dashboard);
      window.location.reload();

    } catch (error) {
      console.error(error);

      // reset();
      // setTemp("");

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {(!!errors.code1 || !!errors.code2 || !!errors.code3 || !!errors.code4 || !!errors.code5 || !!errors.code6) || !!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {(!!errors.code1 || !!errors.code2 || !!errors.code3 || !!errors.code4 || !!errors.code5 || !!errors.code6) && (
          <Alert severity="error"> Code is required</Alert>
        )}

        <Stack direction="row" spacing={2} justifyContent="center">
          {Object.keys(values).map((name, index) => (
            <Controller
              key={name}
              name={`code${index + 1}`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <OutlinedInput
                  {...field}
                  error={!!error}
                  autoFocus={index === 0}
                  placeholder="-"
                  onChange={(event) => handleChangeWithNextField(event, field.onChange)}
                  inputProps={{
                    className: 'field-code',
                    maxLength: 1,
                    sx: {
                      p: 0,
                      textAlign: 'center',
                      width: { xs: 36, sm: 56 },
                      height: { xs: 36, sm: 56 },
                    },
                  }}
                />
              )}
            />
          ))}
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
          Verify
        </LoadingButton>
        {/*
        <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.resetPassword} sx={{ mt: 1 }}>
          Back
        </Button>
        */}
      </Stack>
    </FormProvider>
  );
}
