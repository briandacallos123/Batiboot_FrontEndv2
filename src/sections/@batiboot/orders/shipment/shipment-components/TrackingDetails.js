import React, { useState } from 'react';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem, TextField, Grid } from '@mui/material';

// utils
import { fNumber } from '../../../../../utils/formatNumber';
// components
import Iconify from '../../../../../components/Iconify';
import { RHFSelect, RHFTextField, RHFDatePicker } from '../../../../../components/hook-form';

// ----------------------------------------------------------------------
const STATUS_OPTION = ['Pending', 'Preparing', 'Delivery in progress', 'Received', 'Not Delivered'];

export default function TrackingDetails() {
  const [trackingNum, setTrackingNum] = React.useState('2022001');
  const [value, setValue] = React.useState(' ');
  const [status, setStatus] = useState('Preparing');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack spacing={3}>
        <Stack alignItems="flex-end" spacing={1.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: 1, pl: 2 }}>
            <RHFTextField
              disabled
              name="trackingNum"
              label="Tracking Number"
              required
              /*  value={trackingNum} */
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="flex-start"
            sx={{ width: 1, p: 2 }}
          >
            {/* <RHFDatePicker size="small" label="Order Recieve Date" InputLabelProps={{ shrink: true }} /> */}
            <RHFDatePicker label="Order Recieve Date" inputFormat="MM/dd/yyyy" name="order_recieve_date" />

            {/* <TextField size="small" label="Status" InputLabelProps={{ shrink: true }} /> */}
            <Grid sx={{ marginY: 2 }}>
              <RHFSelect label="Tracking Status" name="status">
                {STATUS_OPTION.map((option, key) => (
                  <option value={key}>{option}</option>
                ))}
              </RHFSelect>
            </Grid>
            {/* <RHFSelect
                name={`items[${index}].service`}
                label="Service type"
                size="small"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                <MenuItem
                  value=""
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>
                <Divider />
                {SERVICE_OPTIONS.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect> */}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
