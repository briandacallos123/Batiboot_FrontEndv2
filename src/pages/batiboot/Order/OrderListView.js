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

import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../../sections/@batiboot/inquirequotation/InquireQuotationModal';
import InvoiceCreate from '../../../sections/@batiboot/invoice/new-edit-form';
import OrderGallery from '../../../sections/@batiboot/orders/order/OrderGallery';
import InvoiceDetails from '../../../sections/@batiboot/invoice/details';
/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */

// ----------------------------------------------------------------------

export default function OrderListViewModal(props) {
  const { open, selectedValue, onClose, edit, identifier, data } = props;
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
  console.log(data);
  return (
    <DialogAnimate open={open} sx={{ width: '100%', height: '100%', py: 4 }} maxWidth={'md'}>
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
            sx={{ height: '7vh' }}
          />
          {/*  <UserRolesCreateForm isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} isIdentifier={identifier} /> */}
          {/* <InvoiceCreate isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} currentInvoice={currentInvoice} /> */}
          {/*             <InvoiceDetails invoice={currentInvoice}/> */}

          <Grid container rowGap={4} sx={{ overflow: 'auto', height: '70vh' }}>
            <Grid item xs={12} sm={6} paddingRight={4}>
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
              <Box sx={{ml:-1.8}}>
                  <ReactQuill
                  value= {data?.description}
                  readOnly={"true"}
                  theme="bubble"
                  />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <OrderGallery data={data?.attachments} />
            </Grid>
          </Grid>
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
