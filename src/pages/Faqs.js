// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import * as React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// components

import Page from '../components/Page';
import { FaqsHero, FaqsCategory, FaqsList, FaqsForm } from '../sections/faqs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Faqs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Faqs">
      <RootStyle>
        <FaqsHero />

        <Container sx={{ mt: 15, mb: 10, position: 'relative' }}>
          <FaqsCategory />

          <Typography variant="h3" sx={{ mb: 5 }}>
            Frequently asked questions
          </Typography>

          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <FaqsForm />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
