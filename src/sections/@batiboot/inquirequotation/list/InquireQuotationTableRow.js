import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// import { approveQuotation } from 'src/redux/slices/adminQuotation';

// MUI
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Skeleton,
  Box,
  MenuItem,
  AvatarGroup,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { approveQuotation } from '../../../../redux/slices/adminQuotation';

// Components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';

import useAuth from '../../../../hooks/useAuth';
import { TableMoreMenu } from '../../../../components/table';

// SCSS
import './quotation.scss';

// ----------------------------------------------------------------------

InquireQuotationTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onViewRow: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  isDesktop: PropTypes.bool,
};

const delay = 5;

// ----------------------------------------------------------------------

// eslint-disable-next-line
export default function InquireQuotationTableRow({
  row,
  selected,
  onViewRow,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  handleClickOpen,
  showSkeleton,
  isDesktop,
  utils,
  getUserQuotation,
}) {
  const { acceptOrder, user } = useAuth();
  const theme = useTheme();
  /* const { name, avatarUrl, address, role, isVerified, status, state, city, zipCode } = row; */
  const dispatch = useDispatch();
  const [openMenu, setOpenMenuActions] = useState(null);

  // console.log('RENDER!!!: ', onRender);
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleAcceptOrder = async () => {
    // const form = new FormData();
    // form.append('quotation_id', row.id);
    // console.log('FORM: ', form.getAll);

    const payload = {};
    payload.id = row.id;
    await dispatch(approveQuotation(payload));
    utils();
    // try {
    //   await acceptOrder(quoteId);
    //   alert('Order accepted');
    // } catch (error) {
    //   console.error(error);
    //   alert(error.message);
    // }
  };

  return (
    <>
      {isDesktop === false ? (
        <TableRow hover selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} size={isDesktop ? 'medium' : 'small'} />
          </TableCell>

          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            {showSkeleton ? (
              <Avatar alt={`${row.product_name}`} src={row.patientdp} sx={{ mr: 2, width: '25px', height: '25px' }} />
            ) : (
              <Skeleton variant="circular" animation="wave" sx={{ width: '25px', height: '25px', mr: 2 }} />
            )}
            {showSkeleton ? (
              <Typography noWrap sx={{ fontSize: 13 }}>
                {row.product_name}
              </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '110px', height: '25px' }} />
            )}
          </TableCell>
          <TableCell>{''}</TableCell>
          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            {showSkeleton ? (
              <Typography variant="subtitle2" noWrap sx={{ ml: 1 }}>
                {row.product_name}
              </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '110px', height: '25px' }} />
            )}
            {showSkeleton ? (
              <AvatarGroup max={2} spacing="small">
                {row.attachments.map((attachment, k) => (
                  <Avatar key={k} alt="pic" src={`${process.env.REACT_APP_HOST_API_KEY}/${attachment.path}`} />
                ))}
              </AvatarGroup>
            ) : (
              <Skeleton variant="circular" animation="wave" sx={{ width: '40px', height: '40px', mr: 2 }} />
            )}
          </TableCell>

          <TableCell align="left">
            {showSkeleton ? (
              <Typography sx={{ fontSize: 12 }}>
                {row.date_text} • {row.time_text} <span className="a-weekname">({row.day_text})</span>
              </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '240px', height: '25px' }} />
            )}
          </TableCell>

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
        // --------------------------------------------------------------
        <TableRow hover selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>

          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            {showSkeleton ? (
              <Avatar alt="pic">{row.product_name.charAt(0)}</Avatar>
            ) : (
              <Skeleton variant="circular" animation="wave" sx={{ width: '40px', height: '40px', mr: 2 }} />
            )}
            {showSkeleton ? (
              <Typography variant="subtitle2" noWrap sx={{ ml: 1 }}>
                {row.product_name}
              </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '110px', height: '25px' }} />
            )}
          </TableCell>
          <TableCell>{''}</TableCell>
          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            {showSkeleton ? (
              <AvatarGroup max={2} spacing="small">
              {row.attachments.map((attachment, k) => (
                <Avatar key={k} alt="pic" src={`${process.env.REACT_APP_HOST_API_KEY}/${attachment.path}`} />
              ))}
            </AvatarGroup>
              
            ) : (
              <Skeleton animation="wave" sx={{ width: '110px', height: '25px' }} />
            )}
            {showSkeleton ? (
              <Typography variant="subtitle2" noWrap sx={{ ml: 1 }}>
              {row.product_name}
            </Typography>
            ) : (
              <Skeleton variant="circular" animation="wave" sx={{ width: '40px', height: '40px', mr: 2 }} />
            )}
          </TableCell>
          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {showSkeleton ? (
              <Typography>{row.services}</Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '390px', height: '25px' }} />
            )}
          </TableCell>

          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {showSkeleton ? (
              <Typography>{row.price}</Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '390px', height: '25px' }} />
            )}
          </TableCell>

          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {showSkeleton ? (
              <Typography>{row.quantity}</Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '390px', height: '25px' }} />
            )}
          </TableCell>

          <TableCell align="left">
            {showSkeleton ? (
              <Typography>
                {row.created_at}
                {/* • {row.time_text} <span className="a-weekname">({row.day_text})</span> */}
              </Typography>
            ) : (
              <Skeleton animation="wave" sx={{ width: '240px', height: '25px' }} />
            )}
          </TableCell>

          <TableCell align="center">
            {showSkeleton ? (
              <Label
                variant={theme.palette.mode === 'ghost' ? 'ghost' : 'filled'}
                // color={(row.status === 1 && 'success') || 'fce'}
                sx={{ textTransform: 'capitalize' }}
                color={
                  (row.isOrder === 0 && row.status === 0 && 'warning') ||
                  (row.status === 1 && row.isOrder === 1 && 'success') ||
                  (row.isCancel === 1 && 'error') ||
                  'default'
                }
              >
                {row.isCancel === 1 ? 'Saved Draft' : ''}
                {row.isOrder === 0 && row.status === 0 ? 'Pending' : ''}
                {row.status === 1 && row.isOrder === 1 ? 'Approved' : ''}
                {/* {row.status === 0 && row.isOrder === 0 ? 'Pending' : ''} */}
              </Label>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
                <Skeleton animation="wave" sx={{ width: '110px', height: '33px' }} />
              </Box>
            )}
          </TableCell>

          <TableCell align="center">
            {/* {showSkeleton ? (
              <IconButton sx={{ backgroundColor: 'rgba(68, 170, 134, 1)' }} onClick={handleAcceptOrder}>
                <Iconify icon="eva:clipboard-outline" sx={{ width: 25, height: 25, color: '#fff' }} />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', justifyItems: 'flex-end' }}>
                <Skeleton variant="circular" animation="wave" sx={{ width: '40px', height: '40px' }} />
              </Box>
            )} */}
            <TableMoreMenu
              open={openMenu}
              onOpen={handleOpenMenu}
              onClose={handleCloseMenu}
              actions={
                <>
                  {/* {showSkeleton ? (
                    <IconButton disabled={row.isCancel === 1} sx={{ backgroundColor: 'primary.main',display:user.user_role === 'user' ? "none":"" }} onClick={handleAcceptOrder}>
                      <Iconify icon="eva:clipboard-outline" sx={{ width: 25, height: 25, color: '#fff' }} />
                    </IconButton>
                  ) :  (
                    <Box sx={{ display: "flex" , justifyContent: 'flex-end', justifyItems: 'flex-end' }}>
                      <Skeleton variant="circular" animation="wave" sx={{ width: '40px', height: '40px' }} />
                    </Box>
                  ) }

                  {showSkeleton ? (
                    <IconButton
                      sx={{ ml: 2, backgroundColor: 'primary.main' }}
                      onClick={() => {
                        onViewRow();
                        handleCloseMenu();
                      }}
                    >
                      <Iconify icon="eva:eye-outline" sx={{ width: 25, height: 25, color: '#fff' }} />
                    </IconButton>
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', justifyItems: 'flex-end' }}>
                      <Skeleton variant="circular" animation="wave" sx={{ width: '40px', height: '40px' }} />
                    </Box>
                  )} */}
                  <MenuItem
                    onClick={() => {
                      handleAcceptOrder();
                      handleCloseMenu();
                    }}
                    sx={{ color: 'green' }}
                  >
                    <Iconify icon={'eva:checkmark-fill'} />
                    Approve
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
