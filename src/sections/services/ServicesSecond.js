import { m } from 'framer-motion';
// @mui
import { Button, Container, Typography, Grid } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#f7f7f7',
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
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container direction="row" alignItems="center" paddingX={{ xs: 2, md: 10 }} sx={{ pt: 6 }}>
          <Grid item align="left" md={8}>
            <m.div variants={varFade().inLeft}>
              <Typography variant="h4">Not sure which solution fits your business needs?</Typography>
            </m.div>
          </Grid>
          <Grid item align="right" md={4} marginTop={{ xs: 2, md: 0 }} sx={{ pr: 4 }}>
            <Button
              size="large"
              variant="contained"
              sx={{
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
