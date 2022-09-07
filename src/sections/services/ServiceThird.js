import { m } from 'framer-motion';
// @mui
import { Button, Container, Typography, Grid } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(12, 0),
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

export default function ServicesThird() {
  return (
    <RootStyle sx={{ backgroundColor: '#f7f7f7' }}>
      <Container component={MotionViewport}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ px: 20 }} spacing={12}>
          <Grid item md={8}>
            <m.div align="left" variants={varFade().inLeft}>
              <Typography variant="h5" sx={{ mt: 4 }}>
                Not sure which solution fits your business needs?
              </Typography>
              <Typography variant="p">
                You benefit from our experience in delivering effective solutions to the complex global supply chains of
                some of the world’s biggest corporations. You benefit from every innovation, whether it involves a
                simple extension to our Air and Ocean Freight products, whether it means a development in warehousing,
                or whether it requires a completely new integrated supply chain model.
              </Typography>
            </m.div>
          </Grid>
          <Grid item align="right" md={4}>
            <Button
              size="large"
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: 3,
                backgroundColor: 'Orange',
                boxShadow: 'none',
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Contact Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
