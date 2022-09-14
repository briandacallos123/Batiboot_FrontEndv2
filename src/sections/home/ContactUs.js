import { m } from 'framer-motion';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid, Stack, TextField } from '@mui/material';
import * as React from 'react';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { MotionViewport, varFade } from '../../components/animate';
import { ContactForm, ContactMap } from '../contact';
import { FaqsList } from '../faqs';
import TrackingOrder from './TrackingOrder';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  marginBottom: 20,
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

export default function HomeLookingFor() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container justifyContent="left">
          <Grid item xs={12} md={5} sx={{ mr: 10 }}>
            <TrackingOrder />
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 3 }}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h3" sx={{ mb: 5 }}>
                Frequently asked questions
              </Typography>
            </m.div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                    <Tab label="Product Sourcing" value="1" />
                    <Tab label="Importing" value="2" />
                    <Tab label="Product Rebranding" value="3" />
                    <Tab label="Private Label" value="4" />
                    <Tab label="Warehousing" value="5" />
                    <Tab label="Fulfillment" value="6" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <FaqsList />
                </TabPanel>
                <TabPanel value="2">
                  <FaqsList />
                </TabPanel>
                <TabPanel value="3">
                  <FaqsList />
                </TabPanel>
                <TabPanel value="4">
                  <FaqsList />
                </TabPanel>
                <TabPanel value="5">
                  <FaqsList />
                </TabPanel>
                <TabPanel value="6">
                  <FaqsList />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
