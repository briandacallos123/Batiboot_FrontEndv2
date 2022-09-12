import * as React from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { Typography, Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Image from '../../../../components/Image';
import { varFade } from '../../../../components/animate';
import { CarouselArrows } from '../../../../components/carousel';

import IMG1 from '../../../../assets/services/ProductSourcing-Instruct1.png';
import IMG2 from '../../../../assets/services/ProductSourcing-Instruct2.png';
import IMG3 from '../../../../assets/services/ProductSourcing-Instruct3.png';
import IMG4 from '../../../../assets/services/ProductSourcing-Instruct4.png';
import IMG5 from '../../../../assets/services/ProductSourcing-Instruct5.png';
import IMG6 from '../../../../assets/services/ProductSourcing-Instruct6.png';
import './sliderCSS.css';

export default function ServiceFulfillmentSlider() {
  const carouselRef = useRef(null);
  const theme = useTheme();

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
        <Slider ref={carouselRef} {...settings}>
          {data.map((slide) => (
            <Grid key={slide.img} align="center" paddingX={1}>
              <Image src={slide.img} variants={varFade().inRight} sx={{ borderRadius: '2vw 2vw 0 0' }} />
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
  );
}

const data = [
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
