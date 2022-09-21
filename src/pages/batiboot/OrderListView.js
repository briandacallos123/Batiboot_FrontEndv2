import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
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
} from '@mui/material';
// routes
import { PATH_BATIBOOT } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList, _invoices } from '../../_mock';
// components
import { DialogAnimate } from '../../components/animate';
import Iconify from '../../components/Iconify';

import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../sections/@batiboot/inquirequotation/InquireQuotationModal';
import InvoiceCreate from '../../sections/@batiboot/invoice/new-edit-form';
import OrderGallery from '../../sections/@batiboot/orders/order/OrderGallery';
import InvoiceDetails from '../../sections/@batiboot/invoice/details';
/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */

// ----------------------------------------------------------------------

export default function OrderListViewModal(props) {
  const { open, selectedValue, onClose, edit, identifier } = props;
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { loading = false } = props;
  const currentInvoice = _invoices.find((invoice) => invoice.id === identifier);

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

  return (
    <DialogAnimate open={open} sx={{ width: '100%', height: '100%' }} maxWidth={'md'}>
      <Page title="Batiboot: View Order">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={'View Order'}
            links={[
              { name: 'Batiboot', href: PATH_BATIBOOT.root },
              { name: 'Order', href: PATH_BATIBOOT.order.root },
              /* { name: `ORD-${currentInvoice?.invoiceNumber}` || '' }, */
              { name: `Order View` },
            ]}
            action={
              <Button
                variant="contained"
                onClick={handleCloseModal}
                startIcon={<Iconify icon={'eva:arrow-back-fill'} />}
              >
                Back
              </Button>
            }
          />
          {/*  <UserRolesCreateForm isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} isIdentifier={identifier} /> */}
          {/* <InvoiceCreate isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} currentInvoice={currentInvoice} /> */}
          {/*             <InvoiceDetails invoice={currentInvoice}/> */}

          <Fade in={open}>
            <Box borderRadius={1} width={{ xs: '90%', md: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Grid align="left" marginTop={7}>
                    <Typography variant="h5">Product Name: Nike Zoom</Typography>
                    <Typography variant="h6">Quantity: 40</Typography>
                    <Typography variant="h6">Service Type: Product Rebranding </Typography>
                    <Typography variant="h6">Price per Piece: 45,200</Typography>
                    <Typography variant="p">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                      also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                      the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} height={{ xs: '30vh', md: '65vh' }}>
                  <Typography variant="h6" align="center" sx={{ color: 'primary.main' }}>
                    Images
                  </Typography>
                  <OrderGallery />
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Page>
    </DialogAnimate>
  );
}

OrderListViewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  identifier: PropTypes.string,
};
