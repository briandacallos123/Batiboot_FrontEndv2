import { m } from 'framer-motion';
// @mui
import { Button, Container, Typography, Grid } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
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

export default function ServicesGrid() {
  return (
    <>
      <RootStyle sx={{ backgroundColor: '#fff' }}>
        <Container component={MotionViewport}>
          {/* <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Image src="\assets\Logo2\cargo.png" variants={varFade().inRight} />
                </Grid>
                <Grid item xs={7}>
                  <m.div variants={varFade().inRight}>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      Product Sourcing
                    </Typography>
                  </m.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}

          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item md={3}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Image src="\assets\Logo2\cargo.png" variants={varFade().inRight} />
                </Grid>
                <Grid item xs={7}>
                  <m.div variants={varFade().inRight}>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      Product Sourcing
                    </Typography>
                  </m.div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={9}>
              <m.div variants={varFade().inRight}>
                <Typography
                  sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa
                  nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi
                  cupiditate. Voluptatum ducimus voluptates voluptas?
                </Typography>
                <Button size="large" variant="contained" sx={{ mt: 1 }}>
                  Order Now
                </Button>
              </m.div>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </>
  );
}
