import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../../../utils/formatTime';
import createAvatar from '../../../../../utils/createAvatar';
import { fCurrency } from '../../../../../utils/formatNumber';
// components
import Label from '../../../../../components/Label';
import Avatar from '../../../../../components/Avatar';
import Iconify from '../../../../../components/Iconify';
import { TableMoreMenu } from '../../../../../components/table';

// ----------------------------------------------------------------------

TrackingTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function TrackingTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  // const { trackingNo, orderNumber, pName, origin, destination, orderReceived, trackingStatus } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="center">TR-NO-{row?.tracking_no}</TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar alt={invoiceTo.name} color={createAvatar(invoiceTo.name).color} sx={{ mr: 2 }}>
          {createAvatar(invoiceTo.name).name}
        </Avatar> */}
        {/*   <Typography variant="subtitle2" noWrap>
            {invoiceTo.name}
        </Typography> */}
        {/* <Stack>
          <Typography variant="subtitle2" noWrap>
            {row?.customer_name}
          </Typography>
        </Stack> */}
        <TableCell align="center">{row?.customer_name}</TableCell>
      </TableCell>
      
      <TableCell>{''}</TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar alt={invoiceTo.name} color={createAvatar(invoiceTo.name).color} sx={{ mr: 2 }}>
          {createAvatar(invoiceTo.name).name}
        </Avatar> */}
        {/*   <Typography variant="subtitle2" noWrap>
            {invoiceTo.name}
        </Typography> */}
        <Stack>
          <Typography variant="subtitle2" noWrap>
            {row?.product_name}
          </Typography>

          <Link noWrap variant="body2" onClick={onEditRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            {/* {orderNumber} */}
            INV-{row?.invoice_number}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{row?.origin}</TableCell>

      <TableCell align="left">{row?.destination}</TableCell>

      <TableCell align="left">{row?.order_received_date}</TableCell>

      {/*   <TableCell align="center">{trackingStatus}</TableCell> */}

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            // (trackingStatus === 'Delivered' && 'success') ||
            // (trackingStatus === 'Delivery In Progress' && 'warning') ||
            // (trackingStatus === 'Not Delivered' && 'error') ||
            // (trackingStatus === 'Received' && 'success') ||
            // (trackingStatus === 'Preparing' && 'default') ||
            // 'default'

            (row?.status === 'Delivered' && 'success') ||
            (row?.status === 'Delivery In Progress' && 'warning') ||
            (row?.status === 'Not Delivered' && 'error') ||
            (row?.status === 'Received' && 'success') ||
            (row?.status === 'Preparing' && 'primary') ||
            'primary'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {row?.status}
        </Label>
      </TableCell>

      <TableCell align="center">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                View
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onViewRow(row.id);
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'fluent:status-20-filled'} />
                Edit Status
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
