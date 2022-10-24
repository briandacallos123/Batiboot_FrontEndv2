import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, Drawer, Grid, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// routes
import { PATH_BATIBOOT } from '../../../../routes/paths';
// mock
import { _invoiceAddressFrom } from '../../../../_mock/batiboot/invoice_mock/_invoice';
// hook
import useResponsive from '../../../../hooks/useResponsive';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider } from '../../../../components/hook-form';
//

import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import InvoiceData from '../../orders/shipment/shipment-components/invoice-details/InvoiceDetails';
import QuotationData from '../../orders/shipment/shipment-components/quotation-data/Quotation';
import SideBar from '../details/SideBar';
import Scrollbar from '../../../../components/Scrollbar';
// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
  handleCloseModal: PropTypes.func,
  formRef: PropTypes.any,
};

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function InvoiceNewEditForm({ isEdit, currentInvoice, handleCloseModal, formRef }) {
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'md');

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
    invoiceTo: Yup.mixed().nullable().required('Invoice to is required'),
  });

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber || '',
      createDate: currentInvoice?.createDate || null,
      dueDate: currentInvoice?.dueDate || null,
      address: currentInvoice?.address || null,
      orderStatus: currentInvoice?.orderStatus || '',
      invoiceFrom: currentInvoice?.invoiceFrom || _invoiceAddressFrom[0],
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.items || [{ itemDescription: '', actualCBM: 0, rateCBM: 0, totalAmount: 0 }],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentInvoice]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  const newInvoice = {
    ...values,
    items: values.items.map((item) => ({
      ...item,
      total: item.actualCBM * item.rateCBM,
    })),
  };

  const handleSaveAsDraft = async () => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(true);
      handleCloseModal();
      navigate(PATH_BATIBOOT.invoice.list);
      console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAndSend = async () => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleCloseModal();
      setLoadingSend(false);
      navigate(PATH_BATIBOOT.invoice.list);
      console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        {isEdit ? (
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Stack height={{ xs: '80vh', md: '100%' }} sx={{ flexGrow: 1 }}>
              <Scrollbar>
                <InvoiceNewEditAddress />
                <InvoiceNewEditStatusDate />
                <InvoiceNewEditDetails />
              </Scrollbar>
            </Stack>

            <SideBar invoice={currentInvoice} edit={isEdit} />
          </Box>
        ) : (
          <Grid container>
            <Grid item xs={12} md={2} bgcolor="background.neutral" />
            <Grid item xs={12} md={8}>
              <Stack height={{ xs: '80vh', md: '80vh' }}>
                <Scrollbar>
                  <InvoiceNewEditAddress />
                  <InvoiceNewEditStatusDate />
                  <InvoiceNewEditDetails />
                </Scrollbar>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2} bgcolor="background.neutral" />
          </Grid>
        )}
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ my: 3 }}>
        <LoadingButton
          color="error"
          size="small"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleCloseModal}
          type="submit"
          sx={{ display: 'none' }}
          ref={formRef}
        />

        <LoadingButton
          color="inherit"
          size="small"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
          type="submit"
          sx={{ display: 'none' }}
          ref={formRef}
        />

        <LoadingButton
          size="small"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
          type="submit"
          sx={{ display: 'none' }}
          ref={formRef}
        />
      </Stack>
    </FormProvider>
  );
}
