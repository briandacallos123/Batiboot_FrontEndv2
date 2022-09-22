import sumBy from 'lodash/sumBy';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Skeleton,
} from '@mui/material';

// redux
// eslint-disable-next-line
import { useDispatch, useSelector } from '../../../redux/store';
import { getAllQuotations } from '../../../redux/slices/adminQuotation';

import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_BATIBOOT, PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// _mock_
import { _invoices } from '../../../_mock';
import _order from '../../../_mock/batiboot/order.json';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../../components/table';
// sections
import QuotationSkeleton from './QuotationSkeleton';
// import InvoiceAnalytic from '../../sections/@batiboot/invoice/InvoiceAnalytic';
import { InquireQuoTableRow, InquireQuoTableToolbar } from '../../../sections/@batiboot/inquirequotation/list';
// import { OrderTableRow, OrderTableToolbar } from '../../sections/@batiboot/orders/order/list';
import InquireQuoListAnalytics from '../../../sections/@batiboot/inquirequotation/InquireQuoListAnalytics';
import InquireAndQuotationCreateModal from '../InquiryAndQuotationCreate';

import { InvoiceTableRow, InvoiceTableToolbar } from '../../../sections/@batiboot/invoice/list';
import InquiryAndQuotationViewModal from '../InquiryAndQuotationView';
import UserModal from '../../../sections/@batiboot/modal/UserModal';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'All',
  'Product Sourcing',
  'Importing',
  'Product Rebranding',
  'Private Label',
  'Warehousing',
  'Fulfillment',
];

const TABLE_HEAD = [
<<<<<<< HEAD:src/pages/batiboot/Quotation/InquiryAndQuotation.js
  { id: 'product_name', label: 'Product Name', align: 'left' },
  { id: 'services', label: 'Type', align: 'left' },
  { id: 'price', label: 'Price', align: 'left' },
=======
  { id: 'pName', label: 'Product Name', align: 'left' },
  { id: 'orderCreated', label: 'Created At', align: 'left' },
>>>>>>> 1dfa1e08ed1be453ed40e76b40497f276f353aa6:src/pages/batiboot/InquiryAndQuotation.js
  { id: 'quantity ', label: 'Quantity', align: 'center', width: 140 },
  { id: 'created_at', label: 'Created', align: 'center', width: 140 },
  { id: 'inquireQuoStatus', label: 'Status', align: 'center', width: 140 },
  { id: 'actions', label: 'Actions', align: 'center' },
];

// ----------------------------------------------------------------------

export default function InquireQuotation() {
  const theme = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { quotations, totalData, ccc, quotationsArr, isLoading } = useSelector((state) => state.adminQuotation);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
    resetPage,
  } = useTable({ defaultOrderBy: 'orderCreated' });

  const [tableData, setTableData] = useState(_order);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('All');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [identifier, setIdentifier] = useState('');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    setIsEdit(!isEdit);
    // setIdentifier(id)
    handleOpenModal();
  };

  const handleViewRow = (id) => {
    // navigate(PATH_BATIBOOT.invoice.view(id));

    setIsView(!isView);
    //  setIdentifier(id)
    handleOpenViewModal();
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const denseHeight = dense ? 56 : 76;

  const getLengthByStatus = (inquireQuoStatus) =>
    tableData.filter((item) => item.inquireQuoStatus === inquireQuoStatus).length;

  const getTotalPriceByStatus = (inquireQuoStatus) =>
    sumBy(
      tableData.filter((item) => item.inquireQuoStatus === inquireQuoStatus),
      'amount'
    );

  const getPercentByStatus = (inquireQuoStatus) => (getLengthByStatus(inquireQuoStatus) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: tableData.length },
    { value: 'approved', label: 'Approved', color: 'success', count: getLengthByStatus('approved') },
    { value: 'received', label: 'Received', color: 'warning', count: getLengthByStatus('received') },
    { value: 'draft', label: 'Draft', color: 'default', count: getLengthByStatus('draft') },
  ];

  const [openModal, setOpenModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(!openModal);
  const handleOpenViewModal = () => setOpenViewModal(!openViewModal);

  const handleCloseModal = () => {
    setIsEdit(false);
    setIsView(false);
    setOpenModal(false);
    setOpenViewModal(false);
    setIdentifier('');
  };

  const [Status, setStatus] = React.useState(-1);

  useEffect(() => {
    const payload = {};
    payload.page = page;
    payload.rowcount = rowsPerPage;
    // // payload.status = Status;
    payload.services =filterService;
    // console.log(filterService);
    payload.search = filterName;
    payload.startDate = filterStartDate;
    payload.endDate = filterEndDate;
    console.log('payload', payload);
    console.log('payload', payload);
    dispatch(getAllQuotations(payload));

  }, [dispatch, page, rowsPerPage,filterService, filterName, filterStartDate, filterEndDate]);

  /* console.log(appointmentsArr) */

  const handleTabClick = (type) => {
    resetPage();
    let status = 0;
    switch (type) {
      case 'all':
        status = -1;
        break;
      case 'pending':
        status = 0;
        break;
      case 'approved':
        status = 1;
        break;
      case 'cancelled':
        status = 2;
        break;
      case 'done':
        status = 3;
        break;
      default:
        status = -1;
        break;
    }
    setStatus(status);
    const payload = {};
    payload.page = page;
    payload.rowcount = rowsPerPage;
    // payload.status = status;
    payload.services = filterService;
    payload.search = filterName;
    payload.startDate = filterStartDate;
    payload.endDate = filterEndDate;
    dispatch(getAllQuotations(payload));
  };

 

  // Skeleton
  const [quotationsData, setQuotationsData] = useState({});
  const [showSkel, setshowSkel] = useState(false);
  useEffect(() => {
    setshowSkel(false);
    if (Object.keys(quotationsData).length) {
      if (Object.keys(quotationsData.allIds).length) {
        setshowSkel(true);
      }
    }
  }, [quotationsData]);

  useEffect(() => {
    setQuotationsData(quotations);
  }, [quotations]);


  const [showSkelDatatable, setshowSkelDatatable] = useState(false);
  useEffect(() => {
    setshowSkelDatatable(!isLoading);
  }, [isLoading]);

  console.log(totalData);

  return (
    <Page title="Batiboot: Inquire/Quotation">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Inquire and Quotation"
          links={[
            { name: 'Dashboard', href: PATH_BATIBOOT.root },
            { name: 'Inquire & Quotation', href: PATH_BATIBOOT.inquire.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              /*   component={RouterLink}
              to={PATH_BATIBOOT.inquire.create} */
              onClick={handleOpenModal}
            >
              Inquire
            </Button>
          }
        />

        <Box>
          {/* UserRolesCreate Modal */}
          <UserModal
            open={openModal}
            onClose={handleCloseModal}
            edit={isEdit}
            identifier={identifier}
            pathname={pathname}
            nameLink={'Inquiry Quotation'}
          />
          {
            /* <InquireAndQuotationCreateModal
            open={openModal}
            onClose={handleCloseModal}
            edit={isEdit}
             identifier={identifier}
          />
          */
            <InquiryAndQuotationViewModal open={openViewModal} onClose={handleCloseModal} identifier={identifier} />
          }
        </Box>

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InquireQuoListAnalytics
                title="Total"
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'amount')}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <InquireQuoListAnalytics
                title="Approved"
                total={getLengthByStatus('approved')}
                percent={getPercentByStatus('approved')}
                price={getTotalPriceByStatus('approved')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InquireQuoListAnalytics
                title="Received"
                total={getLengthByStatus('received')}
                percent={getPercentByStatus('received')}
                price={getTotalPriceByStatus('received')}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <InquireQuoListAnalytics
                title="Draft"
                total={getLengthByStatus('draft')}
                percent={getPercentByStatus('draft')}
                price={getTotalPriceByStatus('draft')}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          
          {showSkel ? (
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={filterStatus}
              onChange={onFilterStatus}
              sx={{ px: 2, bgcolor: 'background.neutral' }}
            >
              {TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={<Label color={tab.color}> {tab.count} </Label>}
                  label={tab.label}
                  onClick={() => handleTabClick(tab.value)}
                />
              ))}
            </Tabs>

          ) : (
            <Stack direction="row" spacing={3} sx={{ pl: 2, pt: 1, pb: 1 }}>
              <Box sx={{ display: 'flex' }}>
                <Skeleton animation="wave" sx={{ width: '40px', height: '40px', mr: 0.5 }} />
                <Skeleton animation="wave" sx={{ width: '60px', height: '25px', mt: 1 }} />
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Skeleton animation="wave" sx={{ width: '40px', height: '40px', mr: 0.5 }} />
                <Skeleton animation="wave" sx={{ width: '60px', height: '25px', mt: 1 }} />
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Skeleton animation="wave" sx={{ width: '40px', height: '40px', mr: 0.5 }} />
                <Skeleton animation="wave" sx={{ width: '60px', height: '25px', mt: 1 }} />
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Skeleton animation="wave" sx={{ width: '40px', height: '40px', mr: 0.5 }} />
                <Skeleton animation="wave" sx={{ width: '60px', height: '25px', mt: 1 }} />
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Skeleton animation="wave" sx={{ width: '40px', height: '40px', mr: 0.5 }} />
                <Skeleton animation="wave" sx={{ width: '60px', height: '25px', mt: 1 }} />
              </Box>
            </Stack>
          )}

          <Divider />

          <InquireQuoTableToolbar
            filterName={filterName}
            filterService={filterService}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
            optionsService={SERVICE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Sent">
                        <IconButton color="primary">
                          <Iconify icon={'ic:round-send'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download">
                        <IconButton color="primary">
                          <Iconify icon={'eva:download-outline'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Print">
                        <IconButton color="primary">
                          <Iconify icon={'eva:printer-fill'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
              
              

                {/* <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <InquireQuoTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody> */}

   
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={ TABLE_HEAD }
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {showSkel && showSkelDatatable
                    ? quotationsArr.map((items) => (
                        <InquireQuoTableRow
                          // isDesktop={isDesktop}
                          showSkeleton={showSkel}
                          key={items.id}
                          row={quotations.byId[items.id]}
                          selected={selected.includes(items.id)}
                          onSelectRow={() => onSelectRow(items.id)}
                          onDeleteRow={() => handleDeleteRow(items.id)}
                          onEditRow={() => handleEditRow(quotations.byId[items.id].fname)}
                          // handleClickOpen={handleClickOpen}
                        />
                      ))
                    : [...Array(rowsPerPage)].map((i,k) => <QuotationSkeleton key={k}/>)}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, totalData)} />

                  <TableNoData isNotFound={totalData === 0 ?? !true} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalData}
              // count={quotationsArr?.length+1}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  // if (filterName) {
  //   tableData = tableData.filter(
  //     (item) =>
  //       item.orderNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
  //       item.pName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  //   );
  // }

  // if (filterStatus !== 'all') {
  //   tableData = tableData.filter((item) => item.inquireQuoStatus === filterStatus);
  // }

  // if (filterService !== 'all') {
  //   tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService));
  // }

  // if (filterStartDate && filterEndDate) {
  //   /* tableData = tableData.filter(
  //     (item) =>
  //       item.orderCreated.getTime() >= filterStartDate.getTime() && item.dueDate.getTime() <= filterEndDate.getTime()
  //   ); */
  // }

  return tableData;
}
