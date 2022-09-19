import { m } from 'framer-motion';
// @mui
import { Button, Container, Grid, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// components
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0),
  backgroundColor: theme.palette.mode === 'light' ? '#f7f7f7' : 'primary.main',
}));

export default function ServicesSecond(props) {
  const { loading = false } = props;

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container direction="row" alignItems="center" paddingX={{ xs: 2, md: 10 }} sx={{ pt: 6 }}>
          <Grid item align="left" md={8}>
            <m.div variants={varFade().inLeft}>
              <Typography variant="h4">
                {loading ? (
                  <Skeleton animation="wave" sx={{ bgcolor: 'grey.300' }} />
                ) : (
                  'Not sure which solution fits your business needs?'
                )}
              </Typography>
            </m.div>
          </Grid>
          <Grid item align="right" md={4} marginTop={{ xs: 2, md: 0 }} sx={{ pr: 4 }}>
            <Button
              size="large"
              variant="contained"
              sx={{
                borderRadius: 3,
                backgroundColor: 'primary',
                boxShadow: 'none',
              }}
              endIcon={<ArrowForwardIcon />}
              href="./contact-us"
            >
              Contact Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
