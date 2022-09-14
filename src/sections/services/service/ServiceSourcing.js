import { m } from 'framer-motion';
import * as React from 'react';
// @mui
import { Backdrop, Box, Button, Fade, Grid, Modal, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Image from '../../../components/Image';
import { varFade } from '../../../components/animate';
import { ServiceSourcingGallery, ServiceSourcingSlider } from '.';

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

export default function ServiceSourcing(props) {
  const { loading = false } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid xs={12} md={6} sx={{ backgroundColor: '#5bc5cd' }}>
      <Article>
        <Grid item xs={5} md={3}>
          {loading ? (
            <Skeleton animation="wave" width={125} height={125} />
          ) : (
            <Image src="\assets\Logo2\cargo.png" variants={varFade().inRight} />
          )}
        </Grid>
        <Grid item xs={12} md={10}>
          <m.div variants={varFade().inRight}>
            <Typography variant="h4" sx={{ mt: 2 }}>
              {loading ? <Skeleton animation="wave" /> : 'PRODUCT SOURCING'}
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
                <Skeleton animation="wave" width="100%" height={120} />
              ) : (
                `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt
            nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum
            ducimus voluptates voluptas?`
              )}
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
                  <Box borderRadius={1} width={{ xs: '90%', md: '70%' }} sx={modalStyle}>
                    <Typography id="transition-modal-title" variant="h4" sx={{ color: 'primary.main', width: '100%' }}>
                      {loading ? <Skeleton animation="wave" width="50%" /> : 'Product Sourcing Services'}
                    </Typography>
                    <Grid container spacing={2} marginTop={1}>
                      <Grid item xs={12} sm={6} height={{ xs: '30vh', md: '65vh' }}>
                        <ServiceSourcingGallery />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <ServiceSourcingSlider />
                        <Grid align="right" marginTop={2}>
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
