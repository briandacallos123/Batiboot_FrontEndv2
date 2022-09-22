// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
  _bookings,
  _bookingNew,
  _bookingsOverview,
  _bookingReview,
} from '../../_mock';
import _order from '../../_mock/batiboot/order.json';
// components
import Page from '../../components/Page';
// sections
import {
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../sections/@batiboot/general/e-commerce';
import { AppWelcome } from '../../sections/@batiboot/general/app';
import { AnalyticsWidgetSummary } from '../../sections/@batiboot/general/analytics';

import { BookingCustomerReviews } from '../../sections/@batiboot/general/booking';

// assets
import { MotivationIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function GeneralDashboard() {
  const { user } = useAuth();

  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="Batiboot: Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Orders"
              percent={2.6}
              total={149}
              chartColor={theme.palette.primary.main}
              chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Deliveries"
              percent={0.6}
              total={76}
              chartColor={theme.palette.chart.red[0]}
              chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Confirmed Orders"
              percent={-0.1}
              total={73}
              chartColor={theme.palette.chart.green[0]}
              chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68]}
            />
          </Grid> */}

          <Grid item xs={6} sm={4} md={2}>
            <AnalyticsWidgetSummary
              title="Product Sourcing"
              total={714000}
              color="info"
              icon={'ant-design:dropbox-outlined'}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <AnalyticsWidgetSummary
              title="Importing"
              total={1352831}
              color="warning"
              icon={'ant-design:down-square-filled'}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <AnalyticsWidgetSummary
              title="Product Rebranding"
              total={1723315}
              color="error"
              icon={'ant-design:skin-filled'}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <AnalyticsWidgetSummary title="Private Label" total={72400} color="success" icon={'ant-design:tags-filled'} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <AnalyticsWidgetSummary title="Warehousing" total={234} color="info" icon={'ant-design:home-filled'} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <AnalyticsWidgetSummary title="Fulfillment" total={18003} color="warning" icon={'ant-design:gift-filled'} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceSaleByGender
              title="Sale By Gender"
              total={2324}
              chartData={[
                { label: 'Mens', value: 44 },
                { label: 'Womens', value: 75 },
              ]}
              chartColors={[
                [theme.palette.primary.light, theme.palette.primary.main],
                [theme.palette.warning.light, theme.palette.warning.main],
              ]}
            />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={8}>
                <EcommerceYearlySales
                    title="Yearly Sales"
                    subheader="(+43%) than last year"
                    chartLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
                    chartData={[
                        {
                        year: '2019',
                        data: [
                            { name: 'Total Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                            { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                        ],
                        },
                        {
                        year: '2020',
                        data: [
                            { name: 'Total Income', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                            { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                        ],
                        },
                    ]}
                />
            </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceLatestProducts title="Latest Inquiries" list={_order} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews
              title="Current Orders"
              subheader={`${_bookingReview.length} Reviews`}
              list={_bookingReview}
            />
          </Grid>

          {/*    <Grid item xs={12} md={12} lg={12}>
            <EcommerceSalesOverview title="Sales Overview" data={_ecommerceSalesOverview} />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceCurrentBalance title="Current Balance" currentBalance={187650} sentAmount={25500} />
          </Grid> */}

          <Grid item xs={12} md={12} lg={12}>
            <EcommerceBestSalesman
              title="Best Agent"
              tableData={_ecommerceBestSalesman}
              tableLabels={[
                {
                  id: 'seller',
                  label: 'Seller',
                },
                {
                  id: 'product',
                  label: 'Product',
                },
                {
                  id: 'country',
                  label: 'Country',
                  align: 'center',
                },
                {
                  id: 'total',
                  label: 'Total',
                },
                {
                  id: 'rank',
                  label: 'Rank',
                  align: 'right',
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
