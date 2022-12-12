import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default function RHFDatePicker({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DesktopDatePicker
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    />
  );
}
