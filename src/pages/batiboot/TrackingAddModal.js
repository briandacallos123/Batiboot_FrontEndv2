import React, { useMemo } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
// @mui
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Button, DialogTitle, Stack, Box, Typography, useTheme, DialogActions, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_BATIBOOT } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList, _invoices } from '../../_mock';
// components
import { DialogAnimate } from '../../components/animate';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import './modalStyle2.scss';
import useAuth from '../../hooks/useAuth';

import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../sections/@batiboot/inquirequotation/InquireQuotationModal';
import InvoiceCreate from '../../sections/@batiboot/invoice/new-edit-form';
import InvoiceDetails from '../../sections/@batiboot/invoice/details';
import SideBar from '../../sections/@batiboot/invoice/details/SideBar';
import TrackingLocation from '../../sections/@batiboot/orders/shipment/shipment-components/TrackingLocation';
import TrackingDetails from '../../sections/@batiboot/orders/shipment/shipment-components/TrackingDetails';

import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../components/hook-form';

/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */

// ----------------------------------------------------------------------

export default function TrackingAddModal(props) {
  const { open, selectedValue, onClose, edit, identifier, data } = props;
  const { addTracking } = useAuth();
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const theme = useTheme();
  const currentInvoice = _invoices.find((invoice) => invoice.id === 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1');
  // const currentInvoice = data.filter((item) => item.id === identifier);
  const handleCloseModal = () => onClose(selectedValue);

  const schema = Yup.object().shape({
    // origin: Yup.string().required('origin is required'),
    // destination: Yup.string().required('destination is required'),
    // trackingNumber: Yup.string().required('trackingNumber is required'),
    // status: Yup.string().required('status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      order_id: '',
      origin: '',
      order_received_date: new Date(),
      destination: '',
      trackingNumber: '',
      status_id: '',
      invoiceId: identifier?.id || null,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [identifier]
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    watch,

    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    // const { invoice_number: invoiceNumber, id: invoiceId, product_name: productName, order_id: orderId } = identifier;
    values.order_id = identifier?.order_id;
    values.invoiceId = identifier?.id;

    let newStatus = '';
    switch (values.status) {
      case 0:
        newStatus = 'Pending';
        break;
      case 1:
        newStatus = 'Preparing';
        break;
      case 2:
        newStatus = 'Delivery in progress';
        break;
      case 3:
        newStatus = 'Received';
        break;
      case 4:
        newStatus = 'Not Delivered';
        break;
      default:
        break;
    }
    values.status = newStatus;
    values.status = 0;

    try {
      await addTracking(values);
    } catch (e) {
      console.log(e);
    }
    reset();
  };

  // console.log(values);

  return (
    <DialogAnimate open={open} sx={{ px: 1, py: 3 }} fullScreen maxWidth={'md'}>
      <div className="mpp-main">
        <div className="mpp-header">
          <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, pb: 2 }}>
            {/*  <Image disabledEffect alt='samplejhonghilario' src='/assets/hip-logosm.png' sx={{ position: 'fixed', top: -11, left: 1, width: 90, height: 90 }} /> */}
            <Stack direction="row" alignItems="center">
              <Stack direction="row" alignItems="center" sx={{ width: 1 }}>
                <Box component="img" src="/assets/logos/batiboot-circle.png" sx={{ width: 30, height: 30 }} />
                <Typography sx={{ ml: 2, color: 'white', fontWeight: 'bold' }}>{'Tracking'}</Typography>
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
        <FormProvider methods={methods}>
          <div className="mpp-body">
            <Page title="Batiboot: Create Tracking">
              <Grid container>
                <Grid item xs={12} md={2} bgcolor="background.neutral" />
                <Grid item xs={12} md={8}>
                  <Stack height={{ xs: '100%', md: '75vh' }} sx={{ flexGrow: 1 }}>
                    <Scrollbar>
                      <TrackingLocation />
                      <TrackingDetails />
                    </Scrollbar>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={2} bgcolor="background.neutral" />
              </Grid>
            </Page>
          </div>

          <div className="mpp-footer" sx={{ backgroundColor: theme.palette.primary.main }}>
            <DialogActions sx={{ '& .MuiDialogActions-root': { padding: '50px !important' } }}>
              <Button
                onClick={handleCloseModal}
                variant="outlined"
                size="small"
                sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: 'white' } }}
              >
                Cancel
              </Button>
              <LoadingButton type="submit" size="small" variant="contained" onClick={handleSubmit(onSubmit)}>
                {/* {!isEdit ? `Create ${nameLink}` : 'Save Changes'}   */} Create Tracking
              </LoadingButton>
            </DialogActions>
          </div>
        </FormProvider>
      </div>
    </DialogAnimate>
  );
}

TrackingAddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  identifier: PropTypes.string,
};
