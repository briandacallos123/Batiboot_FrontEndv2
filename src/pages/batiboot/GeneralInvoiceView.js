import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Container, Button, DialogTitle, Stack, Box, Typography, useTheme, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_BATIBOOT } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList, _invoices } from '../../_mock';
// components
import { DialogAnimate } from '../../components/animate';
import Iconify from '../../components/Iconify';
import './modalStyle.scss';

import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../sections/@batiboot/inquirequotation/InquireQuotationModal';
import InvoiceCreate from '../../sections/@batiboot/invoice/new-edit-form';
import InvoiceDetails from '../../sections/@batiboot/invoice/details';
/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */

// ----------------------------------------------------------------------

export default function InvoiceViewDetailsModal(props) {
  const { open, selectedValue, onClose, edit, identifier } = props;
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const theme = useTheme();

  const currentInvoice = _invoices.find((invoice) => invoice.id === identifier);

  const handleCloseModal = () => onClose(selectedValue);

  return (
    <DialogAnimate open={open} sx={{ px: 1, py: 3 }} fullScreen maxWidth={'md'}>
      <div className="mpp-main">
        <div className="mpp-header">
          <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, pb: 2 }}>
            {/*  <Image disabledEffect alt='samplejhonghilario' src='/assets/hip-logosm.png' sx={{ position: 'fixed', top: -11, left: 1, width: 90, height: 90 }} /> */}
            <Stack direction="row" alignItems="center">
              <Stack direction="row" alignItems="center" sx={{ width: 1 }}>
                <Box component="img" src="/assets/logos/batiboot-circle.png" sx={{ width: 30, height: 30 }} />
                <Typography sx={{ ml: 2, color: 'white', fontWeight: 'bold' }}>{'View Invoice'}</Typography>
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
              {/* <HeaderBreadcrumbs
            heading={'View Invoice'}
            links={[
              { name: 'Batiboot', href: PATH_BATIBOOT.root },
              { name: 'Invoice', href: PATH_BATIBOOT.invoice.root },
              { name: `INV-${currentInvoice?.invoiceNumber}` || '' },
            ]}
            action={
              <Button
                variant="contained"
                onClick={handleCloseModal}
                startIcon={<Iconify icon={'eva:arrow-back-fill'} />}
              >
                Back
              </Button>
            }
          /> */}
              {/*  <UserRolesCreateForm isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} isIdentifier={identifier} /> */}
              {/* <InvoiceCreate isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} currentInvoice={currentInvoice} /> */}
              <InvoiceDetails invoice={currentInvoice} />
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
            <LoadingButton type="button" onClick={''} size="small" variant="contained">
              {/* {!isEdit ? `Create ${nameLink}` : 'Save Changes'}   */} Approve
            </LoadingButton>
          </DialogActions>
        </div>
      </div>
    </DialogAnimate>
  );
}

InvoiceViewDetailsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  identifier: PropTypes.string,
};
