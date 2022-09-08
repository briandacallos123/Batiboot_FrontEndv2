import { m } from 'framer-motion';
import * as React from 'react';
// @mui
import { Button, Container, Typography, Grid, Box, Modal, Fade, Backdrop } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
// components
import Image from '../../../components/Image';
import { varFade } from '../../../components/animate';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
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
                  <Box borderRadius={4} sx={modalStyle}>
                    <Typography id="transition-modal-title" variant="h4" sx={{ color: 'primary.main' }}>
                      Product Sourcing Services
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing="1%"
                      marginTop={{ xs: 2, md: 1 }}
                    >
                      <Grid item width={{ xs: '100%', md: 1 / 3 }}>
                        <Image
                          src="\assets\services\ProductSourcing-Instruct1.png"
                          variants={varFade().inRight}
                          height={{ xs: 200, md: 240 }}
                        />
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
