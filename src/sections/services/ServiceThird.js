import { m } from 'framer-motion';
// @mui
import { Container, Grid, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

export default function ServicesThird(props) {
  const { loading = false } = props;
  
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container direction="row" alignItems="center" paddingX={{ xs: 2, md: 0 }}>
          <Grid item container align="left" xs={12} md={7} rowSpacing={2} sx={{ paddingRight: 4 }}>
            <Grid item xs={12}>
              <m.div variants={varFade().inLeft}>
                <Typography variant="h5">{loading ? <Skeleton animation="wave" /> : 'EFFECTIVE SOLUTIONS'}</Typography>
              </m.div>
            </Grid>
            <Grid item xs={12}>
              <m.div variants={varFade().inLeft}>
                <Typography variant="p">
                  {loading ? (
                    <Skeleton animation="wave" height={120} />
                  ) : (
                    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus
                  eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos
                  cupiditate dolore doloribus! Ad dolore dignissimos asperiores dicta facere optio quod commodi nam
                  tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere
                  sequi unde optio aliquam!`
                  )}
                </Typography>
              </m.div>
            </Grid>
          </Grid>
          <Grid item align="right" xs={12} md={5} marginTop={{ xs: 4, md: 0 }} paddingRight={{ xs: 0, md: 4 }}>
            {loading ? (
              <Skeleton variant="rectangular" animation="wave" width="100%" height={200} />
            ) : (
              <Image
                src="\assets\mockups\importing.jpg"
                sx={{ width: '100%', height: 200 }}
                variants={varFade().inRight}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
