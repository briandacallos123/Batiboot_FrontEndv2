import { m } from 'framer-motion';
// @mui
import { Container, Grid, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#f7f7f7',
}));

const Article = styled('div')(({ theme }) => ({
  color: '#fff',
  padding: theme.spacing(10),
}));

export default function ServicesFourth(props) {
  const { loading = false } = props;

  return (
    <RootStyle>
      {/* <Container component={MotionViewport}> */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid md={4} align="center" sx={{ backgroundColor: 'primary.main', opacity: '50%' }}>
          <Article>
            <Grid item xs={5} md={3}>
              {loading ? (
                <Skeleton variant="rectangular" animation="wave" width={70} height={70} sx={{ borderRadius: 2 }} />
              ) : (
                <ShieldOutlinedIcon sx={{ fontSize: 70 }} />
              )}
            </Grid>
            <Grid item>
              <m.div variants={varFade().inRight}>
                <Typography variant="h4" sx={{ mt: 2 }}>
                  {loading ? <Skeleton animation="wave" width="70%" /> : 'SAFE & SECURE'}
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
                  {loading ? (
                    <Skeleton animation="wave" height={120} />
                  ) : (
                    `You benefit from our experience in delivering effective solutions to the complex global supply
                  chains of some of the world’s biggest corporations.`
                  )}
                </Typography>
              </m.div>
            </Grid>
          </Article>
        </Grid>

        <Grid md={4} align="center" sx={{ backgroundColor: 'primary.main', opacity: '75%' }}>
          <Article>
            <Grid item xs={5} md={3}>
              {loading ? (
                <Skeleton variant="rectangular" animation="wave" width={70} height={70} sx={{ borderRadius: 2 }} />
              ) : (
                <TimerOutlinedIcon sx={{ fontSize: 70 }} />
              )}
            </Grid>
            <Grid item>
              <m.div variants={varFade().inRight}>
                <Typography variant="h4" sx={{ mt: 2 }}>
                  {loading ? <Skeleton animation="wave" width="70%" /> : 'FAST DELIVERY'}
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
                  {loading ? (
                    <Skeleton animation="wave" height={120} />
                  ) : (
                    `You benefit from every innovation, whether it involves a simple extension to our Air and Ocean
                      Freight products, whether it means a development in warehousing.`
                  )}
                </Typography>
              </m.div>
            </Grid>
          </Article>
        </Grid>

        <Grid md={4} align="center" sx={{ backgroundColor: 'primary.main' }}>
          <Article>
            <Grid item xs={5} md={3}>
              {loading ? (
                <Skeleton variant="rectangular" animation="wave" width={70} height={70} sx={{ borderRadius: 2 }} />
              ) : (
                <PermPhoneMsgOutlinedIcon sx={{ fontSize: 70 }} />
              )}
            </Grid>
            <Grid item>
              <m.div variants={varFade().inRight}>
                <Typography variant="h4" sx={{ mt: 2 }}>
                  {loading ? <Skeleton animation="wave" width="70%" /> : '24/7 SUPPORT'}
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
                  {loading ? (
                    <Skeleton animation="wave" height={120} />
                  ) : (
                    `All of which explains why you’ll find the team of outstanding support at TransCargo ready to apply
                    their passion for solutions in support of your business.`
                  )}
                </Typography>
              </m.div>
            </Grid>
          </Article>
        </Grid>
      </Grid>
      {/* </Container> */}
    </RootStyle>
  );
}
