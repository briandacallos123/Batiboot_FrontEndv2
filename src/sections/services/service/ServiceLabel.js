import { m } from 'framer-motion';
import * as React from 'react';
// @mui
import { Backdrop, Box, Button, Fade, Grid, Modal, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Image from '../../../components/Image';
import { varFade } from '../../../components/animate';

import { ServiceLabelGallery, ServiceLabelSlider } from '.';

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

export default function ServiceLabel(props) {
  const { loading = false } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid xs={12} md={6} sx={{ backgroundColor: '#5371fb' }}>
      <Article>
        <Grid item xs={5} md={3}>
          {loading ? (
            <Skeleton animation="wave" width={125} height={125} />
          ) : (
            <Image src="\assets\Logo2\label.png" variants={varFade().inRight} />
          )}
        </Grid>
        <Grid item xs={12}>
          <m.div variants={varFade().inRight}>
            <Typography variant="h4" sx={{ mt: 2 }}>
              {loading ? <Skeleton /> : 'PRIVATE LABEL'}
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
            <Grid container direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
              <Grid item>
                <Button size="large" variant="contained" href="/user/order/create/">
                  Order Now
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={handleOpen}
                  sx={{ border: 1, background: 'rgba(0, 0, 0, 0.05)' }}
                >
                  Learn More
                </Button>
              </Grid>
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
                    <Typography id="transition-modal-title" variant="h4" sx={{ color: 'primary.main' }}>
                      Private Label Services
                    </Typography>
                    <Grid container spacing={2} marginTop={1}>
                      <Grid item xs={12} sm={6} height={{ xs: '30vh', md: '65vh' }}>
                        <ServiceLabelGallery />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <ServiceLabelSlider />
                        <Grid align="right" marginTop={2}>
                          <Button size="large" variant="contained" href="/user/order/create/">
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
