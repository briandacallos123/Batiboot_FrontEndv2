import { m } from 'framer-motion';
// @mui
import { Button, Container, Typography, Grid } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0),
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

export default function ServicesSecond() {
  return (
    <RootStyle sx={{ backgroundColor: '#f7f7f7' }}>
      <Container component={MotionViewport}>
        {/* <Grid container direction="row" justifyContent="flex-end" alignItems="center">
          <Grid item xs={6} md={3}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Image src="\assets\Logo2\ship.png" variants={varFade().inRight} />
              </Grid>
              <Grid item xs={7}>
                <m.div variants={varFade().inRight}>
                  <Typography variant="h4" sx={{ mt: 4}}>
                    Importing
                  </Typography>
                </m.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}

        <Grid container alignItems="center" justifyContent="space-between" sx={{ px: 20 }} spacing={12}>
          <Grid item md={8}>
            <m.div align="left" variants={varFade().inLeft}>
              <Typography variant="h5" sx={{ mt: 4 }}>
                Not sure which solution fits your business needs?
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
