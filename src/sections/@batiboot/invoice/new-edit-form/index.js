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
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
//
import useAuth from '../../../../hooks/useAuth';
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import InvoiceData from '../../orders/shipment/shipment-components/invoice-details/InvoiceDetails';
import QuotationData from '../../orders/shipment/shipment-components/quotation-data/Quotation';
import SideBar from '../details/SideBar';
import Scrollbar from '../../../../components/Scrollbar';
// import { RHFSelect } from '../../../../components/hook-form';
// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
  handleCloseModal: PropTypes.func,
  formRef: PropTypes.any,
};

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function InvoiceNewEditForm({ isEdit, currentInvoice, handleCloseModal, formRef, data }) {
  const navigate = useNavigate();
  const { user, createInvoice } = useAuth();
  const isDesktop = useResponsive('up', 'md');

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
    invoiceTo: Yup.mixed().nullable().required('Invoice to is required'),
    status: Yup.string().nullable().required('Status is required'),
  });
  const id = !isEdit ? 'INV-'.concat(Math.floor(Math.random() * 9999999)) : currentInvoice.invoice_number;

  const [invoicePId, setInvoicePId] = useState(id);

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber || id,
      createDate: currentInvoice?.createDate || null,
      dueDate: currentInvoice?.dueDate || null,
      address: currentInvoice?.address || null,
      orderStatus: currentInvoice?.orderStatus || '',
      invoiceFrom: currentInvoice?.invoiceFrom || _invoiceAddressFrom[0],
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.items || [{ totalAmount: 0 }],
      // items: currentInvoice?.items || [{ itemDescription: '', actualCBM: 0, rateCBM: 0, totalAmount: 0 }],
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
      total: item.price * item.quantity,
    })),
  };

  console.log('My INVOICE: ', newInvoice);

  const handleSaveAsDraft = async () => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // setLoadingSave(true);
      // handleCloseModal();
      // navigate(PATH_BATIBOOT.invoice.list);
      // console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAndSend = async () => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // console.log(JSON.stringify(newInvoice, null, 2));
      const dateDue = `${newInvoice.dueDate.getFullYear()}-${newInvoice.dueDate.getMonth()}-${newInvoice.dueDate.getDate()}`;
      const dateCreate = `${newInvoice.createDate.getFullYear()}-${newInvoice.createDate.getMonth()}-${newInvoice.createDate.getDate()}`;

      const valData = {
        from: newInvoice.invoiceFrom.address,
        to: newInvoice.invoiceTo.address,
        invoice_number: newInvoice.invoiceNumber,
        status: newInvoice.status,
        details: JSON.stringify(newInvoice.items),
        due_date: dateDue,
        created_date: dateCreate,
        id: data.id,
        product_name: data.product_name,
        // id: 18,
        // id: newInvoice.id,
      };
      // console.log('DATA KO: ', valData);
      await createInvoice(valData);
      reset();
      handleCloseModal();
      setLoadingSend(false);
      navigate(PATH_BATIBOOT.invoice.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        {isEdit ? (
          <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
            <Stack height={{ xs: '100%', md: '75vh' }} sx={{ flexGrow: 1 }}>
              <Scrollbar>
                <InvoiceNewEditAddress currentInvoice={currentInvoice} />
                <InvoiceNewEditStatusDate invoiceId={invoicePId} />
                <InvoiceNewEditDetails />
              </Scrollbar>
            </Stack>

            <SideBar invoice={currentInvoice} edit={isEdit} />
          </Box>
        ) : (
          <Grid container>
            <Grid item xs={12} md={2} bgcolor="background.neutral" />
            <Grid item xs={12} md={8}>
              <Stack height={{ xs: '100%', md: '75vh' }}>
                <Scrollbar>
                  <InvoiceNewEditAddress />
                  <InvoiceNewEditStatusDate invoiceId={invoicePId} />
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
