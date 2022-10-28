import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// MUI
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, IconButton, Skeleton, Box, AvatarGroup, MenuItem } from '@mui/material';

// Components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
// SCSS
import './quotation.scss';

// ----------------------------------------------------------------------

OrderTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  isDesktop: PropTypes.bool,
  onViewRow: PropTypes.func,
};

const delay = 5;

// ----------------------------------------------------------------------

// eslint-disable-next-line
export default function OrderTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  handleClickOpen,
  showSkeleton,
  isDesktop,
  onViewRow,
}) {
  const theme = useTheme();
  // eslint-disable-next-line
  /* const { name, avatarUrl, address, role, isVerified, status, state, city, zipCode } = row; */

  // eslint-disable-next-line
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <>
      {isDesktop === false ? (
        <TableRow hover selected={selected}>
          <TableCell padding="checkbox" >
            <Checkbox checked={selected} onClick={onSelectRow}  size={isDesktop ? 'medium' : 'small'}/>
          </TableCell>

          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            {showSkeleton ? (
              <Avatar alt={`${row.product_name}`} src={row.patientdp} sx={{ mr: 2,width: '25px', height: '25px' }} />
            ) : (
              <Skeleton variant="circular" animation="wave" sx={{ width: '25px', height: '25px', mr: 2 }} />
            )}
            {showSkeleton ? (
              <Typography noWrap sx={{fontSize: 13}}> 
                {row.product_name}
              </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '110px', height: '25px' }} />
            )}
          </TableCell>
{/* 
          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {showSkeleton ? (
              <Typography>{row.clinic_name}</Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '390px', height: '25px' }} />
            )}
          </TableCell> */}

          <TableCell align="left">
            {showSkeleton ? (
              <Typography sx={{fontSize: 12}}>
                {row.date_text} • {row.time_text} <span className="a-weekname">({row.day_text})</span>
              </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '240px', height: '25px' }} />
            )}
          </TableCell>
{/* 
          <TableCell align="center">
            {showSkeleton ? (
              <Box>
                {row.payment_status ? (
                  <Iconify
                    icon={'eva:checkmark-circle-fill'}
                    sx={{
                      width: 20,
                      height: 20,
                      color: 'success.main',
                    }}
                  />
                ) : (
                  <div className="a-verified">
                    <Iconify
                      icon={'eva:close-circle-outline'}
                      sx={{
                        width: 20,
                        height: 20,
                        color: 'error.main',
                      }}
                    />
                    Payment First!
                  </div>
                )}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
                <Skeleton variant="circular" animation="wave" sx={{ width: '30px', height: '30px' }} />
              </Box>
            )}
          </TableCell> */}

          {/* <TableCell align="center">
            {showSkeleton ? (
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={(row.type_text === 'TELEMEDICINE' && 'success') || 'fce'}
                sx={{ textTransform: 'capitalize' }}
              >
                {row.type_text}
              </Label>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
                <Skeleton animation="wave" sx={{ width: '110px', height: '33px' }} />
              </Box>
            )}
          </TableCell> */}

          <TableCell align="right">
            {showSkeleton ? (
              <IconButton sx={{ backgroundColor: 'rgba(68, 170, 134, 1)' }} onClick={handleClickOpen}>
                <Iconify icon="eva:clipboard-outline" sx={{ width: 15, height: 15, color: '#fff' }} />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', justifyItems: 'flex-end' }}>
                <Skeleton variant="circular" animation="wave" sx={{ width: '25px', height: '25px' }} />
              </Box>
            )}
          </TableCell>
        </TableRow>
      ) : (
        <TableRow hover selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>

          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            {showSkeleton ? (
              <AvatarGroup max={2} spacing="small">
              {row.attachments.map((attachment,k) => (
              <Avatar key={k} alt='pic' src={`${process.env.REACT_APP_HOST_API_KEY}/${attachment.path}`} />
              ))}
              </AvatarGroup>
           ) : (
              <Skeleton variant="circular" animation="wave" sx={{ width: '40px', height: '40px', mr: 2 }} />
            )}
            {showSkeleton ? (
              <Typography variant="subtitle2" noWrap sx={{ml:1}}>
                {row.product_name}
              </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '110px', height: '25px' }} />
            )}
          </TableCell>

          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {showSkeleton ? (
              <Typography> {row.created_at} </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '390px', height: '25px' }} />
            )}
          </TableCell>

          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {showSkeleton ? (
              <Typography>{row.services}</Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '390px', height: '25px' }} />
            )}
          </TableCell>

          <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
            {showSkeleton ? (
              <Typography>{row.quantity}</Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '390px', height: '25px' }} />
            )}
          </TableCell>

          <TableCell align="center">
            {showSkeleton ? (
              <Typography>
                {row.price} 
              </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '240px', height: '25px' }} />
            )}
          </TableCell>

       
          <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          // color={
          //   (orderStatus === 'approved' && 'success') ||
          //   (orderStatus === 'pending' && 'warning') ||
          //   (orderStatus === 'rejected' && 'error') ||
          //   'default'
          // }
          sx={{ textTransform: 'capitalize' }}
        >
          {/* {orderStatus} */}
         {row.isOrder === 1 ? 'Accepted' : 'Pending'}
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
      )}
    </>
  );
}
