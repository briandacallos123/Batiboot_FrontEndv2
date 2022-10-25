import * as React from 'react';
// @mui
import { Box, Fade, ImageList, ImageListItem, Modal, Skeleton, Typography } from '@mui/material';
// components
import Image from '../../../../components/Image';
import LightboxModal from '../../../../components/LightboxModal';
import './gallery.scss';

export default function OrderGallery(props) {
  const { loading = false, data } = props;

  // const [open, setOpen] = React.useState(false);
  // const [image, setImage] = React.useState('false');

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleImage = (value) => {
  //   setImage(value);
  //   setOpen(true);
  //   console.log(image);
  // };

  const [openLightbox, setOpenLightbox] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const slider2 = React.useRef(null);
  const imagesLightbox = data.map((data) => `${process.env.REACT_APP_HOST_API_KEY}/${data.path}`);

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

  // const singleImage = ()

  console.log(data);
  return (
    <ImageList variant="masonry" cols={data.length === 1 ? 1 : 2} sx={{ height: '100%', width: '100%' }}>
      {data.map((item, index) => {
        if (index <= 2) {
          return (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
              onClick={() => handleOpenLightbox(`${process.env.REACT_APP_HOST_API_KEY}/${item.path}`)}
            >
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  src={`${process.env.REACT_APP_HOST_API_KEY}/${item.path}?w=248&fit=crop&auto=format`}
                  srcSet={`${process.env.REACT_APP_HOST_API_KEY}/${item.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  height="100%"
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Image
                  borderRadius="1vw"
                  src={`${process.env.REACT_APP_HOST_API_KEY}/${item.path}?w=248&fit=crop&auto=format`}
                  srcSet={`${process.env.REACT_APP_HOST_API_KEY}/${item.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              )}
            </ImageListItem>
          );
        }
        if (index === 3) {
          return (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
              onClick={() => handleOpenLightbox(`${process.env.REACT_APP_HOST_API_KEY}/${item.path}`)}
            >
              <div className="image_more">
                <img
                  src={`${process.env.REACT_APP_HOST_API_KEY}/${item.path}?w=248&fit=crop&auto=format`}
                  srcSet={`${process.env.REACT_APP_HOST_API_KEY}/${item.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                />
                <Box bgcolor={'primary.main'} sx={{ opacity: 0.2 }} className="image_more-b" />
                <Typography sx={{ opacity: 1, color: 'primary.dark' }} className="image_more-p">
                  +{data.length - 3}
                </Typography>
              </div>
            </ImageListItem>
          );
        }
        return null;
      })}
      {/* <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundcolor: 'red',
          },
        }}
      >
        <Fade
          in={open}
          timeout={500}
          sx={{
            outline: 'none',
          }}
        >
          <img src={image} alt="asd" style={{ maxHeight: '90%', maxWidth: '90%' }} />
        </Fade>
      </Modal> */}
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
  );
}

// const data = [
//   {
//     img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
//     title: 'Bed',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
//     title: 'Books',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
//     title: 'Sink',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
//     title: 'Kitchen',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
//     title: 'Blinds',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
//     title: 'Chairs',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
//     title: 'Laptop',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
//     title: 'Doors',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
//     title: 'Coffee',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
//     title: 'Storage',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
//     title: 'Candle',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
//     title: 'Coffee table',
//   },
// ];
