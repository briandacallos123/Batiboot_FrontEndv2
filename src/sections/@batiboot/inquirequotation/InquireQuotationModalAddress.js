import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, Divider, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useToggle from '../../../hooks/useToggle';
// _mock
import { _invoiceAddressFrom, _invoiceAddressTo } from '../../../_mock/batiboot/invoice_mock/_invoice';
// components
import Iconify from '../../../components/Iconify';
//
import InquireQuotationModalAddressListDialog from './InquireQuotationModalAddressListDialog';

import { RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

// InvoiceNewEditAddress.propTypes = {
//   from: PropTypes.string,
//   name: PropTypes.string,
//   phone: PropTypes.string,
// };

export default function InquireQuotationModalAddress(prop) {
  const theme = useTheme();

  const { address_from: addressFrom, address_to: addressTo } = prop;
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { toggle: openFrom, onOpen: onOpenFrom, onClose: onCloseFrom } = useToggle();

  const { toggle: openTo, onOpen: onOpenTo, onClose: onCloseTo } = useToggle();

  const { invoiceFrom, invoiceTo } = values;

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation={upMd ? 'vertical' : 'horizontal'} sx={{ borderStyle: 'dashed' }} />}
      sx={{ py: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            From:
          </Typography>

          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={onOpenFrom}>
            Change
          </Button>

          <InquireQuotationModalAddressListDialog
            open={openFrom}
            onClose={onCloseFrom}
            // kailangan ko makuha yung nirereturn nito
            selected={(selectedId) => invoiceFrom?.id === selectedId}
            // ito din
            onSelect={(address) => setValue('invoiceFrom', address)}
            addressOptions={_invoiceAddressFrom}
          />
        </Stack>

        {invoiceFrom && (
          <AddressInfo
            type="invoice_from"
            name={invoiceFrom?.name}
            address={invoiceFrom?.address}
            phone={invoiceFrom?.contact}
          />
        )}
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            To:
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon={invoiceTo ? 'eva:edit-fill' : 'eva:plus-fill'} />}
            onClick={onOpenTo}
          >
            {invoiceTo ? 'Change' : 'Add'}
          </Button>

          <InquireQuotationModalAddressListDialog
            open={openTo}
            onClose={onCloseTo}
            selected={(selectedId) => invoiceTo?.id === selectedId}
            onSelect={(address) => setValue('invoiceTo', address)}
            addressOptions={_invoiceAddressTo}
          />
        </Stack>

        {invoiceTo ? (
          <AddressInfo
            name={invoiceTo?.name}
            address={invoiceTo?.address}
            phone={invoiceTo?.contact}
            type="invoice_to"
          />
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {errors.invoiceTo ? errors.invoiceTo.message : null}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

AddressInfo.propTypes = {
  address: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};

function AddressInfo({ name, address, phone, type }) {
  return (
    <>
      {/* <Typography variant="subtitle2">{name}</Typography>
      <Typography name={type === 'from' ? 'address_from' : 'address_to'} variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        {address}
      </Typography>
      <Typography variant="body2">Phone: {phone}</Typography> */}

      <RHFTextField
        name={type === 'from' ? 'address_from' : 'address_to'}
        label={name}
        disabled
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{ mb: '-1rem' }}
      />
      <RHFTextField
        name={type === 'from' ? 'address_from' : 'address_to'}
        label={address}
        disabled
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{ mb: '-1rem' }}
      />
      <RHFTextField
        name={type === 'from' ? 'address_from' : 'address_to'}
        label={phone}
        disabled
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{ mb: '-1rem' }}
      />
    </>
  );
}
