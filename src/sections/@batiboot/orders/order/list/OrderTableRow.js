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

OrderTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function OrderTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const { orderNumber, pName, orderCreated, serviceType, quantity, budget, orderStatus } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const theme = useTheme();
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={pName} color={createAvatar(pName).color} sx={{ mr: 2 }}>
          {createAvatar(pName).name}
        </Avatar>
        <Stack>
          <Typography variant="subtitle2" noWrap>
            {pName}
          </Typography>

          <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            {orderNumber}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{fDate(orderCreated)}</TableCell>

      <TableCell align="left">{serviceType}</TableCell>

      <TableCell align="center">{quantity}</TableCell>

      <TableCell align="center">{fCurrency(budget * quantity)}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (orderStatus === 'approved' && 'success') ||
            (orderStatus === 'pending' && 'warning') ||
            (orderStatus === 'rejected' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {orderStatus}
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
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                View
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
