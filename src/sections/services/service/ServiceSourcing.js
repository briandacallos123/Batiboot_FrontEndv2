import { m } from 'framer-motion';
import * as React from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import {
  Button,
  Paper,
  Typography,
  Grid,
  Box,
  Modal,
  Fade,
  Backdrop,
  ImageList,
  ImageListItem,
  Stack,
} from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
// components
import Image from '../../../components/Image';
import { varFade } from '../../../components/animate';
import { CarouselArrows } from '../../../components/carousel';

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
  const carouselRef = useRef(null);
  const theme = useTheme();

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

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

                    <Grid container direction="row" marginTop={{ xs: 1, md: 0 }} spacing={2}>
                      <Grid item md={6} sx={{ height: { xs: 250, md: 450 } }}>
                        <ImageList sx={{ width: '100%', height: '100%' }} variant="quilted" cols={4} rowHeight={121}>
                          {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                              <Image
                                borderRadius={2}
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                              />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </Grid>

                      <Grid item md={6} sx={{ height: { xs: 250, md: 450 } }}>
                        <Box sx={{ position: 'relative' }}>
                          <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
                            <Slider ref={carouselRef} {...settings}>
                              {intruct.map((slide) => (
                                <Grid key={slide.img} align="center" paddingX={1}>
                                  <Image
                                    src={slide.img}
                                    variants={varFade().inRight}
                                    sx={{ borderRadius: '2vw 2vw 0 0' }}
                                  />
                                  <Grid backgroundColor="primary.main" sx={{ borderRadius: '0 0 2vw 2vw' }}>
                                    <Typography id="transition-modal-title" sx={{ py: 1, color: '#fff' }}>
                                      {slide.caption}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              ))}
                            </Slider>
                          </CarouselArrows>
                        </Box>
                        <Grid align="right" marginTop={3}>
                          <Button size="large" variant="contained" href="./Quotation">
                            Order Now
                          </Button>
                        </Grid>
                      </Grid>
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

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const intruct = [
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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];
