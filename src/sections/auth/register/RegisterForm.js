import * as Yup from 'yup';
import {useState} from 'react';
import {useSnackbar} from 'notistack';
import { useNavigate } from 'react-router';

// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
// @mui
import {Stack, IconButton, InputAdornment, Alert} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// 
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import {FormProvider, RHFTextField} from '../../../components/hook-form';




// ----------------------------------------------------------------------

export default function RegisterForm() {

    const { register } = useAuth();

    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const isMountedRef = useIsMountedRef();

    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({firstName: Yup.string().required('First name required'), lastName: Yup.string().required('Last name required'), email: Yup.string().email('Email must be a valid email address').required('Email is required'), password: Yup.string().required('Password is required')});

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    const methods = useForm({resolver: yupResolver(RegisterSchema), defaultValues});

    const {
        reset,
        setError,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,

        }
    } = methods;

    const onSubmit = async (data) => {
        try {
          
           await register(data.email, data.password, data.firstName, data.lastName)

            reset();

            enqueueSnackbar('Register success!');
            // navigate(PATH_AUTH.login)

        } catch (error) {
            console.error(error);
            // reset();
            if (isMountedRef.current) {
                setError('afterSubmit', {
                    ...error,
                    message: error.message
                });
            }
        }
    };

    return (
        <FormProvider methods={methods}
            onSubmit={
                handleSubmit(onSubmit)
        }>
            <Stack spacing={3}>
                {
                !!errors.afterSubmit && <Alert severity="error">
                    {
                    errors.afterSubmit.message
                }</Alert>
            }

                <Stack direction={
                        {
                            xs: 'column',
                            sm: 'row'
                        }
                    }
                    spacing={2}>
                    <RHFTextField name="firstName" label="First name"/>
                    <RHFTextField name="lastName" label="Last name"/>
                </Stack>

                <RHFTextField name="email" label="Email address"/>

                <RHFTextField name="password" label="Password"
                    type={
                        showPassword ? 'text' : 'password'
                    }
                    InputProps={
                        {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end"
                                        onClick={
                                            () => setShowPassword(!showPassword)
                                    }>
                                        <Iconify icon={
                                            showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                                        }/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }/>

                <LoadingButton fullWidth size="large" type="submit" variant="contained"
                    loading={isSubmitting}>
                    Register
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
