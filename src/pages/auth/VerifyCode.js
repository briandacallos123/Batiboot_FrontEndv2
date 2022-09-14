// @mui
import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Box, Link, Container, Typography, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import Page from '../../components/Page';
// sections
import { VerifyCodeForm } from '../../sections/auth/verify-code';
import useAuth from '../../hooks/useAuth';

import useIsMountedRef from '../../hooks/useIsMountedRef';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { resendEmailVerification } = useAuth();
  const { token, email } = useParams();

  const resendEmail = async () => {
    try {
      await resendEmailVerification(email);
      enqueueSnackbar('Email verification sent', { variant: 'success' });
      clearTimer(getDeadTime());
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };



  const [disabledButton, setDisabledButton] = useState(false);

  // Time
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState('00:00:00');

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    const { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        `${hours > 9 ? hours : `0${hours}`}` +
          ':' +
          `${minutes > 9 ? minutes : `0${minutes}`}` +
          ':' +
          `${seconds > 9 ? seconds : `0${seconds}`}`
      );
    }
  };

  const clearTimer = (e) => {
    setTimer('00:02:00');

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    const deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };

  // useEffect(() => {
  //   clearTimer(getDeadTime());
  // }, []);

  useEffect(() => {
    if (timer === '00:02:00') {
      setDisabledButton(true);
    } else if (timer === '00:00:00') {
      setDisabledButton(false);
    }
  }, [timer]);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <Page title="Verify Code">
      <LogoOnlyLayout />

      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Please check your email!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            We have emailed a 6-digit confirmation code to your email, please enter the code in below box to verify your
            email.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyCodeForm />
          </Box>

          <Typography variant="body2">
            Don’t have a code? &nbsp;
            {disabledButton === true ? timer : ''}
            <Button disabled={disabledButton} onClick={() => resendEmail()}>
              Resend code
            </Button>
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
