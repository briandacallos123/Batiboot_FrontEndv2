import PropTypes from 'prop-types';
// form
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button, TextField } from '@mui/material';
// hooks
import useResponsive from '../../../../../hooks/useResponsive';
import useToggle from '../../../../../hooks/useToggle';
// _mock
import { _invoiceAddressFrom, _invoiceAddressTo } from '../../../../../_mock/batiboot/invoice_mock/_invoice';
// components
import Iconify from '../../../../../components/Iconify';
import TrackingNewAddress from './TrackingNewAddress';
import { FormProvider, RHFTextField, RHFSelect } from '../../../../../components/hook-form';
//

// ----------------------------------------------------------------------

export default function TrackingLocation() {
  const upMd = useResponsive('up', 'md');

  const { toggle: openFrom, onOpen: onOpenFrom, onClose: onCloseFrom } = useToggle();

  const { toggle: openTo, onOpen: onOpenTo, onClose: onCloseTo } = useToggle();

  const [addressFrom, setAddressFrom] = React.useState();
  const [addressTo, SetAddressTo] = React.useState();

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation={upMd ? 'vertical' : 'horizontal'} sx={{ borderStyle: 'dashed' }} />}
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-evenly" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled', mr: 2 }}>
            Origin:
          </Typography>
          <RHFTextField size="small" name="origin" />

          {/* <TrackingNewAddress open={openFrom} onClose={onCloseFrom} addressOptions={_invoiceAddressFrom} /> */}
        </Stack>
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-evenly" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled', mr: 2 }}>
            Destination:
          </Typography>
          <RHFTextField size="small" name="destination" />

          {/* <TrackingNewAddress open={openFrom} onClose={onCloseFrom} addressOptions={_invoiceAddressFrom} /> */}
        </Stack>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------
