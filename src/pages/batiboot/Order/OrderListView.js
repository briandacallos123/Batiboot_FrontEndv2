import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
// @mui
import {
  Container,
  Button,
  Card,
  Chip,
  Stack,
  TextField,
  Autocomplete,
  InputAdornment,
  Backdrop,
  Box,
  Fade,
  Grid,
  Modal,
  Skeleton,
  Typography,
  useTheme,
  DialogTitle,
} from '@mui/material';
// routes
import { PATH_BATIBOOT } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userList, _invoices } from '../../../_mock';
// components
import { DialogAnimate } from '../../../components/animate';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import SideBar from './SideBar';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../../sections/@batiboot/inquirequotation/InquireQuotationModal';
import InvoiceCreate from '../../../sections/@batiboot/invoice/new-edit-form';
import OrderGallery from '../../../sections/@batiboot/orders/order/OrderGallery';
import InvoiceDetails from '../../../sections/@batiboot/invoice/details';
/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */
import './modalStyle.scss';

// ----------------------------------------------------------------------

export default function OrderListViewModal(props) {
  const { open, selectedValue, onClose, isView, identifier, data } = props;
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { loading = false } = props;
  const currentInvoice = _invoices.find((invoice) => invoice.id === identifier);
  const theme = useTheme();
  const handleCloseModal = () => onClose(selectedValue);
  const modalStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  console.log(data);
  return (
    <DialogAnimate className="dialog-center" open={open} fullScreen maxWidth={'md'}>
      <div className="mpp-main">
        <div className="mpp-header">
          <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, pb: 2 }}>
            {/*  <Image disabledEffect alt='samplejhonghilario' src='/assets/hip-logosm.png' sx={{ position: 'fixed', top: -11, left: 1, width: 90, height: 90 }} /> */}
            <Stack direction="row" alignItems="center">
              <Stack direction="row" alignItems="center" sx={{ width: 1 }}>
                <Box component="img" src="/assets/logos/batiboot-circle.png" sx={{ width: 30, height: 30 }} />
                <Typography sx={{ ml: 2, color: 'white', fontWeight: 'bold' }}>{'View Order'}</Typography>
              </Stack>
              <Stack alignItems="flex-end" sx={{ width: 1 }}>
                <Button
                  sx={{
                    color: 'black',
                    '&:hover': { backgroundColor: 'white', color: theme.palette.primary.main },
                  }}
                  variant="contained"
                  onClick={handleCloseModal}
                  startIcon={<Iconify icon={'eva:arrow-back-fill'} />}
                >
                  Back
                </Button>
              </Stack>
            </Stack>
          </DialogTitle>
        </div>
        <Scrollbar>
          <Page title="Batiboot: View Order" sx={{ mt: 10 }}>
            <Container maxWidth={themeStretch ? false : 'lg'}>
              {/*  <UserRolesCreateForm isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} isIdentifier={identifier} /> */}
              {/* <InvoiceCreate isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} currentInvoice={currentInvoice} /> */}
              {/*             <InvoiceDetails invoice={currentInvoice}/> */}

              <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
                <Stack sx={{ flexGrow: 1, height: { xs: '100%', md: '87vh' } }}>
                  <Scrollbar>
                    <Grid container paddingRight={{ xs: 0, md: 4 }}>
                      <Grid item xs={12} md={6}>
                        <Stack width={1} direction="column">
                          <Typography variant="overline" color="primary.main">
                            Product name
                          </Typography>
                          <Typography variant="h6" marginBottom={2}>
                            {data?.product_name}
                          </Typography>

                          <Typography variant="overline" color="primary.main">
                            Quantity
                          </Typography>
                          <Typography variant="h6" marginBottom={2}>
                            {data?.quantity}
                          </Typography>

                          <Typography variant="overline" color="primary.main">
                            Service Type
                          </Typography>
                          <Typography variant="h6" marginBottom={2}>
                            {data?.services}
                          </Typography>

                          <Typography variant="overline" color="primary.main">
                            Price per Piece
                          </Typography>
                          <Typography variant="h6" marginBottom={2}>
                            {data?.price}
                          </Typography>

                          <Typography variant="overline" color="primary.main">
                            Description
                          </Typography>

                          <Box sx={{ ml: -1.8 }}>
                            <ReactQuill value={data?.description} readOnly={'true'} theme="bubble" />
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <OrderGallery data={data?.attachments} />
                      </Grid>
                    </Grid>
                  </Scrollbar>
                </Stack>
                <SideBar />
              </Box>
            </Container>
          </Page>
        </Scrollbar>
      </div>
    </DialogAnimate>
  );
}

OrderListViewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  isView: PropTypes.bool,
  identifier: PropTypes.string,
};
