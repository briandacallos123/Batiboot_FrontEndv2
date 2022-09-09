import { m } from 'framer-motion';
import * as React from 'react';
// @mui
import {
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Modal,
  Fade,
  Backdrop,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
// components
import Image from '../../../components/Image';
import { varFade } from '../../../components/animate';

import IMG1 from '../../../assets/services/ProductSourcing-Instruct1.png';
import IMG2 from '../../../assets/services/ProductSourcing-Instruct2.png';
import IMG3 from '../../../assets/services/ProductSourcing-Instruct3.png';
import IMG4 from '../../../assets/services/ProductSourcing-Instruct4.png';
import IMG5 from '../../../assets/services/ProductSourcing-Instruct5.png';
import IMG6 from '../../../assets/services/ProductSourcing-Instruct6.png';
import './service.css';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Article = styled('div')(({ theme }) => ({
  color: '#fff',
  padding: theme.spacing(4, 6),
}));

export default function ServiceSourcing() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt
              nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum
              ducimus voluptates voluptas?
            </Typography>
            <Grid container direction="row" alignItems="center" sx={{ mt: 2 }}>
              <Button size="large" variant="contained" href="./Quotation">
                Order Now
              </Button>
              <Button size="large" onClick={handleOpen} sx={{ ml: 1 }}>
                Learn More
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box borderRadius={4} width={{ xs: '90%', md: '70%' }} sx={modalStyle}>
                    <Typography id="transition-modal-title" variant="h4" sx={{ color: 'primary.main' }}>
                      Product Sourcing Services
                    </Typography>

                    {/* <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing="1%"
                      marginTop={{ xs: 2, md: 1 }}
                    >
                      <Grid item width={{ xs: '100%', md: 1 / 3 }}>
                        <Grid align="center" backgroundColor="primary.main" borderRadius="5%">
                          <Image
                            src="\assets\services\ProductSourcing-Instruct1.png"
                            variants={varFade().inRight}
                            sx={{ borderRadius: '5% 5% 0 0' }}
                          />
                          <Typography id="transition-modal-title" sx={{ py: 1, color: '#fff' }}>
                            Step 1
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item width={{ xs: '100%', md: 1 / 3 }}>
                        <Image
                          src="\assets\services\ProductSourcing-Instruct2.png"
                          variants={varFade().inRight}
                          height={{ xs: 200, md: 240 }}
                        />
                      </Grid>
                      <Grid item width={{ xs: '100%', md: 1 / 3 }}>
                        <Image
                          src="\assets\services\ProductSourcing-Instruct3.png"
                          variants={varFade().inRight}
                          height={{ xs: 200, md: 240 }}
                        />
                      </Grid>
                      <Grid item width={{ xs: '100%', md: 1 / 3 }}>
                        <Image
                          src="\assets\services\ProductSourcing-Instruct4.png"
                          variants={varFade().inRight}
                          height={{ xs: 200, md: 240 }}
                        />
                      </Grid>
                      <Grid item width={{ xs: '100%', md: 1 / 3 }}>
                        <Image
                          src="\assets\services\ProductSourcing-Instruct5.png"
                          variants={varFade().inRight}
                          height={{ xs: 200, md: 240 }}
                        />
                      </Grid>
                      <Grid item width={{ xs: '100%', md: 1 / 3 }}>
                        <Image
                          src="\assets\services\ProductSourcing-Instruct6.png"
                          variants={varFade().inRight}
                          height={{ xs: 200, md: 240 }}
                        />
                      </Grid>
                    </Grid> */}

                    <Grid item marginTop={{ xs: 2, md: 1 }}>
                      <ImageList
                        sx={{
                          gridAutoFlow: 'column',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr)) !important',
                          gridAutoColumns: 'minmax(280px, 1fr)',
                        }}
                      >
                        {images.map((image) => (
                          <Grid align="center" backgroundColor="primary.main" borderRadius="5%">
                            <Image src={image.img} variants={varFade().inRight} sx={{ borderRadius: '5% 5% 0 0' }} />
                            <Typography id="transition-modal-title" sx={{ py: 1, color: '#fff' }}>
                              {image.caption}
                            </Typography>
                          </Grid>
                        ))}
                      </ImageList>
                    </Grid>

                    <Grid item align="center" marginTop={2}>
                      <Button size="large" variant="contained" href="./Quotation">
                        Order Now
                      </Button>
                    </Grid>
                  </Box>
                </Fade>
              </Modal>
            </Grid>
          </m.div>
        </Grid>
      </Article>
    </Grid>
  );
}

const images = [
  {
    img: IMG1,
    caption: 'Step 1',
  },
  {
    img: IMG2,
    caption: 'Step 2',
  },
  {
    img: IMG3,
    caption: 'Step 3',
  },
  {
    img: IMG4,
    caption: 'Step 4',
  },
  {
    img: IMG5,
    caption: 'Step 5',
  },
  {
    img: IMG6,
    caption: 'Step 6',
  },
];
