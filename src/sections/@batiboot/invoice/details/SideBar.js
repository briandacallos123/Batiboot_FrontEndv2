import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Drawer, Divider, IconButton, Stack, Grid } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
//
import InvoiceToolbar from './InvoiceToolbar';
import InvoiceData from '../../orders/shipment/shipment-components/invoice-details/InvoiceDetails';
import QuotationData from '../../orders/shipment/shipment-components/quotation-data/Quotation';

// ----------------------------------------------------------------------

const ToggleButtonStyle = styled((props) => <IconButton disableRipple {...props} />)(({ theme }) => ({
  right: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(1),
  boxShadow: theme.customShadows.z8,
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.divider}`,
  borderRight: 0,
  borderRadius: `12px 0 0 12px`,
  transition: theme.transitions.create('all'),
  '&:hover': {
    backgroundColor: theme.palette.background.neutral,
  },
}));

// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = 300;
const SIDEBAR_WIDTH_MD = 500;

export default function SideBar({ invoice, edit }) {
  const theme = useTheme();

  const [openSidebar, setOpenSidebar] = useState(true);

  const [showInfo, setShowInfo] = useState(true);

  const [selectUser, setSelectUser] = useState(null);

  const [showAttachment, setShowAttachment] = useState(true);

  const [showParticipants, setShowParticipants] = useState(true);

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (!isDesktop) {
      return handleCloseSidebar();
    }
    return handleOpenSidebar();
  }, [isDesktop]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const renderContent = !edit ? (
    <Stack
      direction="column"
      gap={2}
      paddingTop={{ xs: 5, md: 0 }}
      paddingBottom={{ xs: 5, md: 0 }}
      paddingLeft={{ xs: 2, md: 4 }}
      paddingRight={{ xs: 2, md: 0 }}
      height={{ xs: '100%', md: '75vh' }}
    >
      <Scrollbar>
        <Grid sx={{ pr: 2 }}>
          <InvoiceToolbar invoice={invoice} />
          <QuotationData isIdentifier={''} />
          <InvoiceData isIdentifier={''} />
        </Grid>
      </Scrollbar>
    </Stack>
  ) : (
    <Stack
      direction="column"
      gap={2}
      paddingTop={{ xs: 5, md: 0 }}
      paddingBottom={{ xs: 5, md: 0 }}
      paddingX={{ xs: 2, md: 4 }}
      paddingRight={{ xs: 2, md: 0 }}
      height={{ xs: '100%', md: '75vh' }}
    >
      <Scrollbar>
        <Grid sx={{ pr: 2 }}>
          <QuotationData isIdentifier={''} />
          <InvoiceData isIdentifier={''} />
        </Grid>
      </Scrollbar>
    </Stack>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <ToggleButtonStyle
        onClick={handleToggleSidebar}
        sx={{
          ...(openSidebar && isDesktop && { right: SIDEBAR_WIDTH_MD }),
        }}
      >
        <Iconify width={16} height={16} icon={openSidebar ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'} />
      </ToggleButtonStyle>

      {isDesktop ? (
        <Drawer
          open={openSidebar}
          anchor="right"
          variant="persistent"
          sx={{
            height: 1,
            width: SIDEBAR_WIDTH_MD,
            transition: theme.transitions.create('width'),
            ...(!openSidebar && { width: '0px' }),
            '& .MuiDrawer-paper': {
              position: 'static',
              width: SIDEBAR_WIDTH_MD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          anchor="right"
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
            },
            zIndex: 1500,
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
