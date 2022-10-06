import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// @mui
import {
  Box,
  Stack,
  Button,
  Dialog,
  Tooltip,
  IconButton,
  DialogActions,
  CircularProgress,
  useTheme,
  Grid,
} from '@mui/material';
// hooks
import useToggle from '../../../../hooks/useToggle';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
//
import InvoicePDF from './InvoicePDF';

// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceToolbar({ invoice }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { toggle: open, onOpen, onClose } = useToggle();

  const handleEdit = () => {
    navigate(PATH_DASHBOARD.invoice.edit(invoice.id));
  };

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mb: 5 }}
      >
        <Grid container width={1} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', pt: 1, gap: 1 }}>
          <Tooltip title="Edit">
            {/* <IconButton onClick={handleEdit}>
                <Iconify icon={'eva:edit-fill'} />
              </IconButton> */}
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleEdit}
              startIcon={<Iconify icon={'eva:edit-fill'} />}
              sx={{ alignSelf: 'center' }}
            >
              Edit
            </Button>
          </Tooltip>

          <Tooltip title="View">
            {/* <IconButton onClick={onOpen}>
                <Iconify icon={'eva:eye-fill'} />
              </IconButton> */}
            <Button
              color="inherit"
              variant="outlined"
              onClick={onOpen}
              startIcon={<Iconify icon={'eva:eye-fill'} />}
              sx={{ alignSelf: 'center' }}
            >
              View
            </Button>
          </Tooltip>

          <PDFDownloadLink
            document={<InvoicePDF invoice={invoice} />}
            fileName={invoice.invoiceNumber}
            style={{ textDecoration: 'none', color: theme.palette.mode === 'light' ? '#000' : '#fff' }}
          >
            {({ loading }) => (
              <Tooltip title="Download">
                {/* <IconButton>
                    {loading ? <CircularProgress size={24} color="inherit" /> : <Iconify icon={'eva:download-fill'} />}
                  </IconButton> */}
                <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<Iconify icon={'eva:download-fill'} />}
                  sx={{ alignSelf: 'center' }}
                >
                  Download
                </Button>
              </Tooltip>
            )}
          </PDFDownloadLink>

          {/* <Tooltip title="Print">
            <IconButton>
                <Iconify icon={'eva:printer-fill'} />
              </IconButton>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon={'eva:printer-fill'} />}
              sx={{ alignSelf: 'center', width: 122 }}
            >
              Print
            </Button>
          </Tooltip> */}

          {/* <Tooltip title="Send">
            <IconButton>
                <Iconify icon={'ic:round-send'} />
              </IconButton>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon={'ic:round-send'} />}
              sx={{ alignSelf: 'center', width: 122 }}
            >
              Send
            </Button>
          </Tooltip> */}

          {/* <Tooltip title="Share">
            <IconButton>
                <Iconify icon={'eva:share-fill'} />
              </IconButton>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon={'eva:share-fill'} />}
              sx={{ alignSelf: 'center', width: 122 }}
            >
              Share
            </Button>
          </Tooltip> */}
        </Grid>
        {/* <Button
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon={'eva:checkmark-fill'} />}
            sx={{ alignSelf: 'flex-start' }}
          >
            Mark as Paid
          </Button> */}
      </Stack>

      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={onClose}>
                <Iconify icon={'eva:close-fill'} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF invoice={invoice} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
