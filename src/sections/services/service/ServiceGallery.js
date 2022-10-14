import * as React from 'react';
// @mui
import { ImageList, ImageListItem, Skeleton } from '@mui/material';
// components
import Image from '../../../components/Image';
import LightboxModal from '../../../components/LightboxModal';
import Scrollbar from '../../../components/Scrollbar';

export default function ServiceGallery(props) {
  const [openLightbox, setOpenLightbox] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const slider2 = React.useRef(null);
  const imagesLightbox = data.map((data) => data.img);

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const handlePrevious = () => {
    slider2.current?.slickPrev();
  };

  const handleNext = () => {
    slider2.current?.slickNext();
  };

  const { loading = false } = props;

  return (
    <Scrollbar>
      <ImageList cols={3} sx={{ pr: 2, height: '100%', width: '100%' }}>
        {data.map((item) => (
          <ImageListItem key={item.img} onClick={() => handleOpenLightbox(item.img)}>
            {loading ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                height="100%"
                sx={{ borderRadius: 2 }}
              />
            ) : (
              <Image
                borderRadius="1vw"
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            )}
          </ImageListItem>
        ))}
        <LightboxModal
          animationDuration={320}
          images={imagesLightbox}
          mainSrc={imagesLightbox[selectedImage]}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onCloseRequest={() => setOpenLightbox(false)}
          onMovePrevRequest={() => {
            handlePrevious();
            setSelectedImage((selectedImage + imagesLightbox.length - 1) % imagesLightbox.length);
          }}
          onMoveNextRequest={() => {
            handleNext();
            setSelectedImage((selectedImage + 1) % imagesLightbox.length);
          }}
        />
      </ImageList>
    </Scrollbar>
  );
}

// function srcset(image, size, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

const data = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
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
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
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
  },
];
