// @mui
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { MotionViewport } from '../../components/animate';

import {
  ServiceSourcing,
  ServiceImporting,
  ServiceRebranding,
  ServiceLabel,
  ServiceWarehousing,
  ServiceFulfillment,
} from './service';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#f7f7f7',
  marginTop: 55,
}));

export default function ServicesGrid() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <ServiceSourcing />
          <ServiceImporting />
          <ServiceRebranding />
          <ServiceLabel />
          <ServiceWarehousing />
          <ServiceFulfillment />
        </Grid>
      </Container>
    </RootStyle>
  );
}
