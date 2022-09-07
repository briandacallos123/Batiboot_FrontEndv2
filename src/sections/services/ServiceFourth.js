import { m } from 'framer-motion';
// @mui
import { Button, Container, Typography, Grid } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

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

const Article = styled('div')(({ theme }) => ({
  color: '#fff',
  padding: theme.spacing(10),
}));

export default function ServicesFourth() {
  return (
    <>
      <RootStyle component={MotionViewport}>
        {/* <Container component={MotionViewport}> */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid md={4} align="center" sx={{ backgroundColor: '#FFDB99' }}>
            <Article>
              <Grid item xs={5} md={3}>
                <ShieldOutlinedIcon sx={{ fontSize: 70 }} />
              </Grid>
              <Grid item>
                <m.div variants={varFade().inRight}>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    SAFE & SECURE
                  </Typography>
                </m.div>
              </Grid>
              <Grid item md={10}>
                <m.div variants={varFade().inRight}>
                  <Typography
                    sx={{
                      color: '#fff',
                      mt: 2,
                    }}
                  >
                    You benefit from our experience in delivering effective solutions to the complex global supply
                    chains of some of the world’s biggest corporations.
                  </Typography>
                </m.div>
              </Grid>
            </Article>
          </Grid>

          <Grid md={4} align="center" sx={{ backgroundColor: '#FFC14D' }}>
            <Article>
              <Grid item xs={5} md={3}>
                <TimerOutlinedIcon sx={{ fontSize: 70 }} />
              </Grid>
              <Grid item>
                <m.div variants={varFade().inRight}>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    FAST DELIVERY
                  </Typography>
                </m.div>
              </Grid>
              <Grid item md={10}>
                <m.div variants={varFade().inRight}>
                  <Typography
                    sx={{
                      color: '#fff',
                      mt: 2,
                    }}
                  >
                    You benefit from every innovation, whether it involves a simple extension to our Air and Ocean
                    Freight products, whether it means a development in warehousing
                  </Typography>
                </m.div>
              </Grid>
            </Article>
          </Grid>

          <Grid md={4} align="center" sx={{ backgroundColor: '#FFA500' }}>
            <Article>
              <Grid item xs={5} md={3}>
                <PermPhoneMsgOutlinedIcon sx={{ fontSize: 70 }} />
              </Grid>
              <Grid item>
                <m.div variants={varFade().inRight}>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    24/7 SUPPORT
                  </Typography>
                </m.div>
              </Grid>
              <Grid item md={10}>
                <m.div variants={varFade().inRight}>
                  <Typography
                    sx={{
                      color: '#fff',
                      mt: 2,
                    }}
                  >
                    All of which explains why you’ll find the team of outstanding support at TransCargo ready to apply
                    their passion for solutions in support of your business.
                  </Typography>
                </m.div>
              </Grid>
            </Article>
          </Grid>
        </Grid>
        {/* </Container> */}
      </RootStyle>
    </>
  );
}
