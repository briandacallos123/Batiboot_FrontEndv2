// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// _mock
import { _mapContact } from '../_mock';
// components
import Page from '../components/Page';
import {
  ServicesFirst,
  ServicesHero,
  ServicesGrid,
  ServicesSecond,
  ServicesThird,
  ServicesFourth,
} from '../sections/services';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Services() {
  return (
    <Page title="Our Services">
      <RootStyle>
        <ServicesHero />
        <ServicesFirst />
        <ServicesGrid />
        <ServicesSecond />
        <ServicesThird />
        <ServicesFourth />
      </RootStyle>
    </Page>
  );
}
