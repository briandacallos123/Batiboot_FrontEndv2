import { paramCase } from 'change-case';
import { useParams, useLocation, } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Container, Button } from '@mui/material';
// routes
import { PATH_BATIBOOT } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userList, _invoices } from '../../../_mock';
// components
import { DialogAnimate } from '../../../components/animate';
import Iconify from '../../../components/Iconify';

import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../../sections/@batiboot/inquirequotation/InquireQuotationModal';
import InvoiceCreate from '../../../sections/@batiboot/invoice/new-edit-form'
/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */

// ----------------------------------------------------------------------


export default function ShipmentCreateModal(props) {
  const { open, selectedValue, onClose, edit, identifier} = props
  
  const { themeStretch } = useSettings()
  const { pathname } = useLocation()

  const { name = '' } = useParams()

  const isEdit = edit

  const currentUser = _userList.find((user) => paramCase(user.name) === name)
  
  const currentInvoice = _invoices.find((invoice) => invoice.id === identifier);

  const handleCloseModal = () => onClose(selectedValue)

  return(
    <DialogAnimate open={open} sx={{ px: 1, py: 3}} maxWidth={'md'}>
      <Page title={!isEdit ? 'Batiboot: Create Tracking' : 'Batiboot: Edit Tracking'}>
        <Container maxWidth={themeStretch ? false: 'lg'}>
          <HeaderBreadcrumbs 
            heading={!isEdit ? 'Create Tracking' : 'Edit Tracking'}
            links={[
              { name: 'Batiboot', href: PATH_BATIBOOT.root },
              { name: 'Shipment', href: PATH_BATIBOOT.order.root },
              { name: !isEdit ? 'Create Tracking' : 'Edit Tracking'}
            ]}
            action={
              <Button
                variant='contained'
                onClick={handleCloseModal}
                startIcon={<Iconify icon={'eva:arrow-back-fill'} />}
              >
                Back
              </Button>
            }
          />
        {/*  <UserRolesCreateForm isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} isIdentifier={identifier} /> */}
          {/*  <InvoiceCreate isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} currentInvoice={currentInvoice} /> */}
        </Container>
      </Page>
    </DialogAnimate>
  )
}

ShipmentCreateModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  identifier: PropTypes.string,
};





