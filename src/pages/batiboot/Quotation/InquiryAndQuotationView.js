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
import { PATH_BATIBOOT } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userList, _invoices } from '../../../_mock';
// components
import { DialogAnimate } from '../../../components/animate';
import Iconify from '../../../components/Iconify';
import useAuth from '../../../hooks/useAuth';

import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../../sections/@batiboot/inquirequotation/InquireQuotationModal';
import InvoiceCreate from '../../../sections/@batiboot/invoice/new-edit-form';
import InvoiceDetails from '../../../sections/@batiboot/invoice/details';
import InquireQuotationGallery from '../../../sections/@batiboot/inquirequotation/list/InquireQuotationGallery';
/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */

// ----------------------------------------------------------------------

export default function InquiryAndQuotationViewModal(props, row) {
  const { open, selectedValue, onClose, edit, identifier, data } = props;
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { acceptOrder } = useAuth();
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
  const handleAcceptOrder = async () => {
    const form = new FormData();
    form.append('quotation_id', row.id);
    try {
      await acceptOrder(form);
      alert('Order accepted');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  return (
    <DialogAnimate open={open} sx={{ px: 1, py: 3 }} maxWidth={'md'}>
      <Page title="Batiboot: View Inquire and Quotation">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={'View Inquire & Quotation'}
            links={[
              { name: 'Batiboot', href: PATH_BATIBOOT.root },
              { name: 'View Inquire & Quotation', href: PATH_BATIBOOT.inquire.root },
              /* { name: `ORD-${currentInvoice?.invoiceNumber}` || '' }, */
              { name: `View Information` || '' },
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
            sx={{ height: '7vh' }}
          />
          {/*  <UserRolesCreateForm isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} isIdentifier={identifier} /> */}
          {/* <InvoiceCreate isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} currentInvoice={currentInvoice} /> */}
          {/*             <InvoiceDetails invoice={currentInvoice}/> */}
          <Grid container rowGap={4} sx={{ overflow: 'auto', height: '60vh' }}>
            <Grid item xs={12} sm={6} paddingRight={4}>
              <Grid item xs={12} md={12}>
                <Typography variant="overline" marginBottom={1} color="primary.main">
                  Product name
                </Typography>
                <Typography variant="h6" marginBottom={1}>
                  {data?.product_name}
                </Typography>

                <Typography variant="overline" marginBottom={1} color="primary.main">
                  Quantity
                </Typography>
                <Typography variant="h6" marginBottom={1}>
                  {data?.quantity}
                </Typography>

                <Typography variant="overline" marginBottom={1} color="primary.main">
                  Service Type
                </Typography>
                <Typography variant="h6" marginBottom={1}>
                  {data?.services}
                </Typography>

                <Typography variant="overline" marginBottom={1} color="primary.main">
                  Price per Piece
                </Typography>
                <Typography variant="h6" marginBottom={1}>
                  {data?.price}
                </Typography>

                <Typography variant="overline" marginBottom={1} color="primary.main">
                  Description
                </Typography>
                <Typography variant="p" marginBottom={1}>
                  <br />
                  {data?.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InquireQuotationGallery data={data?.attachments} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
            <Button size="large" sx={{ my: 2, backgroundColor: 'primary.main' }} variant="contained">
              Accept
            </Button>
          </Grid>
        </Container>
      </Page>
    </DialogAnimate>
  );
}

InquiryAndQuotationViewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  identifier: PropTypes.string,
};
