import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Container, Button, Typography, MenuItem, TextField, Stack, Grid } from '@mui/material';
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
import InvoiceCreate from '../../../sections/@batiboot/invoice/new-edit-form';
import InvoiceDetails from '../../../sections/@batiboot/invoice/details';
/* import UserRolesCreateForm from '../../sections/@apgit/user/user/UserRoleModal/UserCreateRoleModal'; */

// ----------------------------------------------------------------------
const STATUS_OPTION = ['Preparing', 'Delivery in Progress', 'Delivered', 'Received', 'Not Delivered'];

export default function ShipmentListViewModal(props) {
  const { open, selectedValue, onClose, edit, identifier } = props;
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const [status, setStatus] = useState('Preparing');
  const id = identifier;

  const handleCloseModal = () => onClose(selectedValue);
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
  return (
    <DialogAnimate open={open} sx={{ px: 1, py: 3 }}>
      <Page title="Batiboot: View Shipment">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={'Edit Status'}
            links={[
              { name: 'Batiboot', href: PATH_BATIBOOT.root },
              { name: 'Shipment', href: PATH_BATIBOOT.order.shipment },
              /* { name: `ORD-${currentInvoice?.invoiceNumber}` || '' }, */
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
          />
          <Stack Container direction="column" justifyContent="center" alignItems="center">
            <Stack Container direction="row" justifyContent="center" alignItems="center">
              <TextField
                select
                value={status}
                onChange={handleStatus}
                sx={{
                  textTransform: 'capitalize',
                  width: '400px',
                  height: '100px',
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
            </Stack>
            <Grid Container direction="row" justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                onClick={handleCloseModal}
                startIcon={<Iconify icon={'mdi:content-save-cog'} />}
              >
                Save changes
              </Button>
            </Grid>
          </Stack>
          {/* <Typography> {id?.id} {id?.tracking_no}</Typography> */}

          {/*  <UserRolesCreateForm isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} isIdentifier={identifier} /> */}
          {/* <InvoiceCreate isEdit={isEdit} currentUser={currentUser} handleCloseModal={handleCloseModal} currentInvoice={currentInvoice} /> */}
          {/*             <InvoiceDetails invoice={currentInvoice}/> */}
        </Container>
      </Page>
    </DialogAnimate>
  );
}

ShipmentListViewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  identifier: PropTypes.string,
};
