import { m } from 'framer-motion';
import * as React from 'react';
// @mui
import { Button, Container, Typography, Grid, Box, Modal, Fade, Backdrop } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

import {
  ServiceSourcing,
  ServiceImporting,
  ServiceRebranding,
  ServiceLabel,
  ServiceWarehousing,
  ServiceFullfilment,
} from './grid-service';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#f7f7f7',
  marginTop: 55,
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Article = styled('div')(({ theme }) => ({
  color: '#fff',
  padding: theme.spacing(4, 6),
}));

export default function ServicesGrid() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <RootStyle>
        <Container component={MotionViewport}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <ServiceSourcing />
            <ServiceImporting />
            <ServiceRebranding />
            <ServiceLabel />
            <ServiceWarehousing />
            <ServiceFullfilment />
          </Grid>
        </Container>
      </RootStyle>
    </>
  );
}
