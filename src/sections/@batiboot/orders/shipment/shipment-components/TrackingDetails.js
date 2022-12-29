import React, { useState, useMemo } from 'react';
import * as Yup from 'yup';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
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
  // const [value, setValue] = React.useState(' ');
  const [status, setStatus] = useState('Preparing');

  const TrackingSchema = Yup.object().shape({
    receiveDate: Yup.string().nullable().required('Date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      date: new Date(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(TrackingSchema),
    defaultValues,
  });

  const { control, setValue } = methods;

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack spacing={3}>
        <Stack alignItems="flex-end" spacing={1.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: 1, pl: 2 }}>
            <RHFTextField
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
            {/* <TextField size="small" label="Order Recieve Date" InputLabelProps={{ shrink: true }} /> */}
            {/* <DesktopDatePicker
              label="Order Recieve Date"
              inputFormat="MM/dd/yyyy"
              value={value}
              name="date"
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            /> */}

            <Controller
              name="receiveDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Receive Date"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                  )}
                />
              )}
            />

            {/* <TextField size="small" label="Status" InputLabelProps={{ shrink: true }} /> */}
            <Grid sx={{ marginY: 2 }}>
              <RHFSelect label="Tracking Status" name="status_id">
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
