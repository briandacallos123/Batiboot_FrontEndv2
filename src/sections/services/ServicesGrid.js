import { m } from 'framer-motion';
// @mui
import { Button, Container, Typography, Grid } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
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
  padding: theme.spacing(4),
}));

export default function ServicesGrid() {
  return (
    <>
      <RootStyle>
        <Container component={MotionViewport}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={12} md={6} sx={{ backgroundColor: '#5bc5cd' }}>
              <Article>
                <Grid item xs={5} md={3}>
                  <Image src="\assets\Logo2\cargo.png" variants={varFade().inRight} />
                </Grid>
                <Grid item xs={12}>
                  <m.div variants={varFade().inRight}>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      PRODUCT SOURCING
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa
                      nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi
                      cupiditate. Voluptatum ducimus voluptates voluptas?
                    </Typography>
                    <Button size="large" variant="contained" sx={{ mt: 2 }}>
                      Order Now
                    </Button>
                  </m.div>
                </Grid>
              </Article>
            </Grid>

            <Grid xs={12} md={6} sx={{ backgroundColor: '#ec718c' }}>
              <Article>
                <Grid item xs={5} md={3}>
                  <Image src="\assets\Logo2\ship.png" variants={varFade().inRight} />
                </Grid>
                <Grid item xs={12}>
                  <m.div variants={varFade().inRight}>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      IMPORTING
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa
                      nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi
                      cupiditate. Voluptatum ducimus voluptates voluptas?
                    </Typography>
                    <Button size="large" variant="contained" sx={{ mt: 2 }}>
                      Order Now
                    </Button>
                  </m.div>
                </Grid>
              </Article>
            </Grid>

            <Grid xs={12} md={6} sx={{ backgroundColor: '#a855fe' }}>
              <Article>
                <Grid item xs={5} md={3}>
                  <Image src="\assets\Logo2\branding.png" variants={varFade().inRight} />
                </Grid>
                <Grid item xs={12}>
                  <m.div variants={varFade().inRight}>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      PRODUCT REBRANDING
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa
                      nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi
                      cupiditate. Voluptatum ducimus voluptates voluptas?
                    </Typography>
                    <Button size="large" variant="contained" sx={{ mt: 2 }}>
                      Order Now
                    </Button>
                  </m.div>
                </Grid>
              </Article>
            </Grid>

            <Grid xs={12} md={6} sx={{ backgroundColor: '#5371fb' }}>
              <Article>
                <Grid item xs={5} md={3}>
                  <Image src="\assets\Logo2\label.png" variants={varFade().inRight} />
                </Grid>
                <Grid item xs={12}>
                  <m.div variants={varFade().inRight}>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      PRIVATE LABEL
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa
                      nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi
                      cupiditate. Voluptatum ducimus voluptates voluptas?
                    </Typography>
                    <Button size="large" variant="contained" sx={{ mt: 2 }}>
                      Order Now
                    </Button>
                  </m.div>
                </Grid>
              </Article>
            </Grid>

            <Grid xs={12} md={6} sx={{ backgroundColor: '#6739b8' }}>
              <Article>
                <Grid item xs={5} md={3}>
                  <Image src="\assets\Logo2\container.png" variants={varFade().inRight} />
                </Grid>
                <Grid item xs={12}>
                  <m.div variants={varFade().inRight}>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      WAREHOUSING
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa
                      nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi
                      cupiditate. Voluptatum ducimus voluptates voluptas?
                    </Typography>
                    <Button size="large" variant="contained" sx={{ mt: 2 }}>
                      Order Now
                    </Button>
                  </m.div>
                </Grid>
              </Article>
            </Grid>

            <Grid xs={12} md={6} sx={{ backgroundColor: '#000' }}>
              <Article>
                <Grid item xs={5} md={3}>
                  <Image src="\assets\Logo2\product-design.png" variants={varFade().inRight} />
                </Grid>
                <Grid item xs={12}>
                  <m.div variants={varFade().inRight}>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                      FULLFILMENT
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa
                      nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi
                      cupiditate. Voluptatum ducimus voluptates voluptas?
                    </Typography>
                    <Button size="large" variant="contained" sx={{ mt: 2 }}>
                      Order Now
                    </Button>
                  </m.div>
                </Grid>
              </Article>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </>
  );
}
