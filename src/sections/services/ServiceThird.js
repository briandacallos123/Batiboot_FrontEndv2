import { m } from 'framer-motion';
// @mui
import { Button, Container, Typography, Grid } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#fff',
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
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container direction="row" alignItems="center" paddingX={{ xs: 2, md: 0 }}>
          <Grid item container align="left" md={7} sx={{ paddingRight: 4 }}>
            <Grid item>
              <m.div variants={varFade().inLeft}>
                <Typography variant="h5">EFFECTIVE SOLUTIONS</Typography>
              </m.div>
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <m.div variants={varFade().inLeft}>
                <Typography variant="p">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus
                  eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos
                  cupiditate dolore doloribus! Ad dolore dignissimos asperiores dicta facere optio quod commodi nam
                  tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere
                  sequi unde optio aliquam!
                </Typography>
              </m.div>
            </Grid>
          </Grid>
          <Grid item align="right" md={5} marginTop={{ xs: 4, md: 0 }} paddingRight={{ xs: 0, md: 4 }}>
            <Image src="\assets\mockups\importing.jpg" sx={{ width: '100%', height: 200 }} variants={varFade().inRight} />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
