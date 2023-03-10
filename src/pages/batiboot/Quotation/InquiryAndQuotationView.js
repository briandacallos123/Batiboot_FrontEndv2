import React, { useState, useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation, Navigate, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
// @mui
import {
  Container,
  Button,
  Card,
  Chip,
  Stack,
  TextField,
  Autocomplete,
  InputAdornment,
  Backdrop,
  Box,
  Fade,
  Grid,
  Modal,
  Skeleton,
  Typography,
  useTheme,
  DialogTitle,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_BATIBOOT } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userList, _invoices } from '../../../_mock';
// components
import { DialogAnimate } from '../../../components/animate';
import Iconify from '../../../components/Iconify';
import useAuth from '../../../hooks/useAuth';

import Page from '../../../components/Page';
import ProfileCover from '../../../sections/@batiboot/inquirequotation/ProfileCover';
import ProfileDetails from '../../../sections/@batiboot/inquirequotation/ProfileDetails';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../../sections/@batiboot/inquirequotation/InquireQuotationModal';

import InvoiceDetails from '../../../sections/@batiboot/invoice/details';
import InquireQuotationGallery from '../../../sections/@batiboot/inquirequotation/list/InquireQuotationGallery';
import Scrollbar from '../../../components/Scrollbar';
import UserModal from '../../../sections/@batiboot/modal/UserModal';
// import './modalStyle.scss';

/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */

// ----------------------------------------------------------------------
// const STATUS_OPTION = ['Pending', 'Approve', 'Received'];

export default function InquiryAndQuotationViewModal(props, row) {
  const { open, selectedValue, onClose, edit, identifier, data, handleOpenOrderModal } = props;
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { acceptOrder, cancelQuotation, user } = useAuth();
  const currentInvoice = _invoices.find((invoice) => invoice.id === identifier);
  const theme = useTheme();
  const handleCloseModal = () => onClose(selectedValue);
  const handleCloseModalv2 = () => {
    setOpenModal(false);
  };
  // const [nullFields, setNullFields] = useState(0);
  const [STATUS_OPTION, setStatusOption] = useState([]);

  const modalStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const handleAcceptOrder = async () => {
    const form = new FormData();
    form.append('quotation_id', row.id);
    try {
      await acceptOrder(form);
      alert('Order accepted');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleCancelQuotation = async () => {
    const form = new FormData();
    form.append('email', user.email);
    form.append('quotation_id', data?.id);
    form.append('id', user.id);
    const payload = {
      email: user.email,
      quotation_id: data?.id,
      id: user.id,
    };

    try {
      await cancelQuotation(payload);
      console.log(data?.id);
      // alert('Quotation canceled');
      window.location.reload();

      onClose();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  const [status, setStatus] = useState('Pending');
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const checkValue = () => {
    const propertyNames = Object.keys(data);
    const propertyValues = Object.values(data);

    const ewan = propertyValues.filter((item) => item === null);

    if (ewan.length > 1 || data.isCancel === 1) {
      setStatusOption(['Pending', 'Received']);
    } else {
      setStatusOption(['Pending', 'Approve', 'Received']);
    }
  };
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(!openModal);

  useEffect(() => {
    checkValue();
  }, [data]);
  console.log('edit', edit);
  return (
    <>
      <Box>
        {/* UserRolesCreate Modal */}
        <UserModal
          open={openModal}
          onClose={handleCloseModalv2}
          edit={edit}
          identifier={identifier}
          pathname={pathname}
          nameLink={'Order List'}
          data={data}
        />
      </Box>
      <DialogAnimate className="dialog-center" open={open} sx={{ px: 1, py: 3 }} fullScreen maxWidth={'md'}>
        <Scrollbar>
          <div className="mpp-main">
            <div className="mpp-header">
              <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, pb: 2 }}>
                {/*  <Image disabledEffect alt='samplejhonghilario' src='/assets/hip-logosm.png' sx={{ position: 'fixed', top: -11, left: 1, width: 90, height: 90 }} /> */}
                <Stack direction="row" alignItems="center">
                  <Stack direction="row" alignItems="center" sx={{ width: 1 }}>
                    <Box component="img" src="/assets/logos/batiboot-circle.png" sx={{ width: 30, height: 30 }} />
                    <Typography sx={{ ml: 2, color: 'white', fontWeight: 'bold' }}>{'View Inquiry'}</Typography>
                  </Stack>
                  <Stack alignItems="flex-end" sx={{ width: 1 }}>
                    <Button
                      sx={{
                        color: 'black',
                        '&:hover': { backgroundColor: 'white', color: theme.palette.primary.main },
                      }}
                      variant="contained"
                      onClick={handleCloseModal}
                      startIcon={<Iconify icon={'eva:arrow-back-fill'} />}
                    >
                      Back
                    </Button>
                  </Stack>
                </Stack>
              </DialogTitle>
            </div>

            <div className="mpp-body">
              <Page title="Batiboot: View Invoice">
                <Container maxWidth={themeStretch ? false : 'lg'}>
                  <Grid container rowGap={4}>
                    <Grid item xs={12} sm={4}>
                      <Stack width={1} direction="column" className="card-space">
                        <Card
                          sx={{
                            mb: 3,
                            height: { xs: 230, md: 170 },
                            position: 'relative',
                          }}
                        >
                          <ProfileCover myProfile={data} />
                        </Card>
                        <ProfileDetails data={data} />
                      </Stack>
                    </Grid>
                    <Grid item container xs={12} sm={8}>
                      <Grid item xs={12} md={6} paddingLeft={{ xs: 0, md: 4 }}>
                        <Stack width={1} direction="column">
                          <Typography variant="overline" color="primary.main">
                            Product name
                          </Typography>
                          <Typography variant="h6" marginBottom={2}>
                            {data?.product_name}
                          </Typography>

                          <Typography variant="overline" color="primary.main">
                            Quantity
                          </Typography>
                          <Typography variant="h6" marginBottom={2}>
                            {data?.quantity}
                          </Typography>

                          <Typography variant="overline" color="primary.main">
                            Service Type
                          </Typography>
                          <Typography variant="h6" marginBottom={2}>
                            {data?.services}
                          </Typography>

                          <Typography variant="overline" color="primary.main">
                            Price per Piece
                          </Typography>
                          <Typography variant="h6" marginBottom={2}>
                            {data?.price}
                          </Typography>
                          {data.status !== 1 && data.isOrder !== 1 && (
                            <>
                              <Typography variant="overline" color="primary.main">
                                Status
                              </Typography>
                              <Grid sx={{ marginY: 2 }}>
                                <TextField
                                  select
                                  value={status}
                                  onChange={handleStatus}
                                  sx={{
                                    textTransform: 'capitalize',
                                  }}
                                >
                                  {STATUS_OPTION.map((option) => (
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
                                </TextField>
                              </Grid>
                            </>
                          )}

                          <Typography variant="overline" color="primary.main">
                            Description
                          </Typography>
                          <Box sx={{ ml: -1.8 }}>
                            <ReactQuill value={data?.description} readOnly={'true'} theme="bubble" />
                          </Box>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <InquireQuotationGallery data={data?.attachments} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </Page>
            </div>

            <div className="mpp-footer" sx={{ backgroundColor: theme.palette.primary.main }}>
              {data.status !== 1 && data.isOrder !== 1 && (
                <DialogActions sx={{ '& .MuiDialogActions-root': { padding: '50px !important' } }}>
                  <Button
                    onClick={handleCloseModal}
                    variant="outlined"
                    size="small"
                    sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: 'white' } }}
                  >
                    Cancel
                  </Button>

                  {status === 'Pending' ? null : (
                    //   <Box>
                    //     {/* <Button  disabled={ data.isCancel === 1 } size="large" sx={{ my: 2, backgroundColor: 'primary.main',mx:2 }} variant="contained">
                    // Edit
                    // </Button> */}
                    //     <Button
                    //       onClick={handleCancelQuotation}
                    //       disabled={data.isCancel === 1}
                    //       size="small"
                    //       sx={{ backgroundColor: '#D22B2B' }}
                    //       variant="contained"
                    //     >
                    //       Cancel
                    //     </Button>
                    //   </Box>
                    <>
                      <Button
                        disabled={data?.isCancel === 1}
                        size="small"
                        sx={{ backgroundColor: 'primary.main' }}
                        variant="contained"
                      >
                        save
                      </Button>
                      <Button
                        disabled={data?.isCancel === 1}
                        size="small"
                        sx={{ backgroundColor: 'primary.main' }}
                        variant="contained"
                        to={PATH_BATIBOOT.order.createOrder}
                        onClick={handleOpenModal}
                        // component={RouterLink}
                      >
                        save & Create Order
                      </Button>
                      {/*  action={
                    <Button
                      variant="contained"
                      startIcon={<Iconify icon={'eva:plus-fill'} />}
                      
                      to={PATH_BATIBOOT.order.createOrder}
                      onClick={handleOpenModal}
                    >
                      Add Order
                    </Button>
          } */}
                    </>
                  )}
                </DialogActions>
              )}
            </div>
          </div>
        </Scrollbar>
      </DialogAnimate>
    </>
  );
}

InquiryAndQuotationViewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  identifier: PropTypes.string,
};
