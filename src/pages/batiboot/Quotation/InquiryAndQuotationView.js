import { paramCase } from 'change-case';
import { useParams, useLocation, Navigate } from 'react-router-dom';
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
import InvoiceCreate from '../../../sections/@batiboot/invoice/new-edit-form';
import InvoiceDetails from '../../../sections/@batiboot/invoice/details';
import InquireQuotationGallery from '../../../sections/@batiboot/inquirequotation/list/InquireQuotationGallery';
import Scrollbar from '../../../components/Scrollbar';
import './modalStyle.scss';

/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */

// ----------------------------------------------------------------------

export default function InquiryAndQuotationViewModal(props, row) {
  const { open, selectedValue, onClose, edit, identifier, data } = props;
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { acceptOrder, cancelQuotation, user } = useAuth();
  const currentInvoice = _invoices.find((invoice) => invoice.id === identifier);
  const theme = useTheme();
  const handleCloseModal = () => onClose(selectedValue);
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

  return (
    // <DialogAnimate open={open} fullScreen maxWidth={'md'}>
    //   <div className="mpp-header">
    //     <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, pb: 2 }}>
    //       {/*  <Image disabledEffect alt='samplejhonghilario' src='/assets/hip-logosm.png' sx={{ position: 'fixed', top: -11, left: 1, width: 90, height: 90 }} /> */}
    //       <Stack direction="row" alignItems="center">
    //         <Stack direction="row" alignItems="center" sx={{ width: 1 }}>
    //           <Box component="img" src="/assets/logos/batiboot-circle.png" sx={{ width: 30, height: 30 }} />
    //           <Typography sx={{ ml: 2, color: 'white', fontWeight: 'bold' }}>{'View Invoice'}</Typography>
    //         </Stack>
    //         <Stack alignItems="flex-end" sx={{ width: 1 }}>
    //           <Button
    //             sx={{
    //               color: 'black',
    //               '&:hover': { backgroundColor: 'white', color: theme.palette.primary.main },
    //             }}
    //             variant="contained"
    //             onClick={handleCloseModal}
    //             startIcon={<Iconify icon={'eva:arrow-back-fill'} />}
    //           >
    //             Back
    //           </Button>
    //         </Stack>
    //       </Stack>
    //     </DialogTitle>
    //   </div>
    //   <div className="mpp-body">
    //     <Page title="Batiboot: View Inquire and Quotation">
    //       <Container maxWidth={themeStretch ? false : 'lg'}>
    //         {/*  <UserRolesCreateForm isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} isIdentifier={identifier} /> */}
    //         {/* <InvoiceCreate isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} currentInvoice={currentInvoice} /> */}
    //         {/*             <InvoiceDetails invoice={currentInvoice}/> */}
    //         <Grid container rowGap={4} sx={{ overflow: 'auto', height: '60vh' }}>
    //           <Grid item xs={12} sm={6} paddingRight={4}>
    //             <Grid item xs={12} md={12}>
    //               <Typography variant="overline" marginBottom={1} color="primary.main">
    //                 Product name
    //               </Typography>
    //               <Typography variant="h6" marginBottom={1}>
    //                 {data?.product_name}
    //               </Typography>

    //               <Typography variant="overline" marginBottom={1} color="primary.main">
    //                 Quantity
    //               </Typography>
    //               <Typography variant="h6" marginBottom={1}>
    //                 {data?.quantity}
    //               </Typography>

    //               <Typography variant="overline" marginBottom={1} color="primary.main">
    //                 Service Type
    //               </Typography>
    //               <Typography variant="h6" marginBottom={1}>
    //                 {data?.services}
    //               </Typography>

    //               <Typography variant="overline" marginBottom={1} color="primary.main">
    //                 Price per Piece
    //               </Typography>
    //               <Typography variant="h6" marginBottom={1}>
    //                 {data?.price}
    //               </Typography>

    //               <Typography variant="overline" marginBottom={1} color="primary.main">
    //                 Description
    //               </Typography>

    //               <Box sx={{ ml: -1.8 }}>
    //                 <ReactQuill value={data?.description} readOnly={'true'} theme="bubble" />
    //               </Box>
    //             </Grid>
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <InquireQuotationGallery data={data?.attachments} />
    //           </Grid>
    //         </Grid>
    //         <Grid item xs={12} md={12} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
    //           {user.user_role === 'user' ? (
    //             <Box>
    //               {/* <Button  disabled={ data.isCancel === 1 } size="large" sx={{ my: 2, backgroundColor: 'primary.main',mx:2 }} variant="contained">
    //           Edit
    //           </Button> */}
    //               <Button
    //                 onClick={handleCancelQuotation}
    //                 disabled={data.isCancel === 1}
    //                 size="large"
    //                 sx={{ my: 2, backgroundColor: '#D22B2B' }}
    //                 variant="contained"
    //               >
    //                 Cancel
    //               </Button>
    //             </Box>
    //           ) : (
    //             <Button
    //               disabled={data?.isCancel === 1}
    //               size="large"
    //               sx={{ my: 2, backgroundColor: 'primary.main' }}
    //               variant="contained"
    //             >
    //               Accept
    //             </Button>
    //           )}
    //         </Grid>
    //       </Container>
    //     </Page>
    //     <div className="mpp-footer" sx={{ backgroundColor: theme.palette.primary.main }}>
    //       <DialogActions sx={{ '& .MuiDialogActions-root': { padding: '50px !important' } }}>
    //         <Button
    //           onClick={handleCloseModal}
    //           variant="outlined"
    //           size="small"
    //           sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: 'white' } }}
    //         >
    //           Cancel
    //         </Button>
    //         <LoadingButton type="button" onClick={''} size="small" variant="contained" color="inherit">
    //           Delete
    //         </LoadingButton>
    //         <LoadingButton type="button" onClick={''} size="small" variant="contained">
    //           {/* {!isEdit ? `Create ${nameLink}` : 'Save Changes'}   */} Approve
    //         </LoadingButton>
    //       </DialogActions>
    //     </div>
    //   </div>
    // </DialogAnimate>
    <DialogAnimate open={open} sx={{ px: 1, py: 3 }} fullScreen maxWidth={'md'}>
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
                <Grid container rowGap={4} sx={{ overflow: 'auto' }}>
                  <Grid item xs={12} sm={6} paddingRight={4}>
                    <Grid md={12} sx={{ my: 3 }}>
                      <Grid item className="card-space">
                        <Card
                          sx={{
                            mb: 3,
                            height: 170,
                            position: 'relative',
                          }}
                        >
                          <ProfileCover myProfile={data} />
                        </Card>
                      </Grid>
                      <Grid item>
                        <ProfileDetails data={data} />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Typography variant="overline" marginBottom={1} color="primary.main">
                        Product name
                      </Typography>
                      <Typography variant="h6" marginBottom={1}>
                        {data?.product_name}
                      </Typography>

                      <Typography variant="overline" marginBottom={1} color="primary.main">
                        Quantity
                      </Typography>
                      <Typography variant="h6" marginBottom={1}>
                        {data?.quantity}
                      </Typography>

                      <Typography variant="overline" marginBottom={1} color="primary.main">
                        Service Type
                      </Typography>
                      <Typography variant="h6" marginBottom={1}>
                        {data?.services}
                      </Typography>

                      <Typography variant="overline" marginBottom={1} color="primary.main">
                        Price per Piece
                      </Typography>
                      <Typography variant="h6" marginBottom={1}>
                        {data?.price}
                      </Typography>

                      <Typography variant="overline" marginBottom={1} color="primary.main">
                        Description
                      </Typography>

                      <Box sx={{ ml: -1.8 }}>
                        <ReactQuill value={data?.description} readOnly={'true'} theme="bubble" />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InquireQuotationGallery data={data?.attachments} />
                  </Grid>
                </Grid>
              </Container>
            </Page>
          </div>

          <div className="mpp-footer" sx={{ backgroundColor: theme.palette.primary.main }}>
            <DialogActions sx={{ '& .MuiDialogActions-root': { padding: '50px !important' } }}>
              <Button
                onClick={handleCloseModal}
                variant="outlined"
                size="small"
                sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: 'white' } }}
              >
                Cancel
              </Button>
              <LoadingButton type="button" onClick={''} size="small" variant="contained" color="inherit">
                Delete
              </LoadingButton>
              {user.user_role === 'user' ? (
                <Box>
                  {/* <Button  disabled={ data.isCancel === 1 } size="large" sx={{ my: 2, backgroundColor: 'primary.main',mx:2 }} variant="contained">
              Edit
              </Button> */}
                  <Button
                    onClick={handleCancelQuotation}
                    disabled={data.isCancel === 1}
                    size="small"
                    sx={{ backgroundColor: '#D22B2B' }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button
                  disabled={data?.isCancel === 1}
                  size="small"
                  sx={{ backgroundColor: 'primary.main' }}
                  variant="contained"
                >
                  Approve
                </Button>
              )}
            </DialogActions>
          </div>
        </div>
      </Scrollbar>
    </DialogAnimate>
  );
}

InquiryAndQuotationViewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  identifier: PropTypes.string,
};
