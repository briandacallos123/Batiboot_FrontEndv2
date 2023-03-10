import sumBy from 'lodash/sumBy';
import { paramCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation, useParams } from 'react-router-dom';
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
import { useDispatch, useSelector } from '../../redux/store';
import { getAllOrders } from '../../redux/slices/adminOrder';
import { getAllInvoice, deleteInvoice, getAllInvoiceStatus } from '../../redux/slices/adminInvoice';

import useAuth from '../../hooks/useAuth';
// routes
import { PATH_BATIBOOT, PATH_DASHBOARD } from '../../routes/paths';
// hooks

import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
import { _userList, _invoices } from '../../_mock';
import _order from '../../_mock/batiboot/order.json';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../components/table';
// sections
import QuotationSkeleton from './OrderSkeleton';
// import InvoiceAnalytic from '../../sections/@batiboot/invoice/InvoiceAnalytic';

import { OrderTableRow, OrderTableToolbar } from '../../sections/@batiboot/order/list';
// import { OrderTableRow, OrderTableToolbar } from '../../sections/@batiboot/orders/order/list';
import OrderListAnalytics from '../../sections/@batiboot/orders/order/OrderListAnalytics';
import InvoiceCreateModal from './GeneralInvoiceCreate';
import InvoiceViewDetailsModal from './GeneralInvoiceView';
import UserModal from '../../sections/@batiboot/modal/UserModal';
import InvoiceAnalytic from '../../sections/@batiboot/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@batiboot/invoice/list';
import TrackingAddModal from './TrackingAddModal';
// ----------------------------------------------------------------------

const SERVICE_OPTIONS = ['All', 'Paid', 'Unpaid', 'Overdue'];

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'Client', align: 'left' },
  { id: 'blankSpace' },
  { id: 'customerName', label: 'Customer Name', align: 'left' },
  { id: 'createDate', label: 'Create', align: 'left' },
  { id: 'dueDate', label: 'Due', align: 'left' },
  { id: 'rateCBM', label: 'Rate/CBM', align: 'center', width: 140 },
  { id: 'actualCBM', label: 'Actual/CBM', align: 'center', width: 140 },
  { id: 'orderStatus', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function OrderList() {
  const theme = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { name = '' } = useParams();
  const currentUser = _userList.find((user) => paramCase(user.name) === name);
  const { invoice, totalData, totalInvoiceStatusArr, ccc, invoiceArr, isLoading } = useSelector(
    (state) => state.adminInvoice
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [reload, setReload] = useState(false);

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

  const [tableData, setTableData] = useState(invoiceArr);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('All');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [identifier, setIdentifier] = useState('');

  const utils = () => {
    const payload = {};
    payload.page = page;
    payload.rowcount = rowsPerPage;
    // // payload.status = Status;
    payload.services = filterService;
    payload.search = filterName;
    payload.startDate = filterStartDate;
    payload.endDate = filterEndDate;
    // console.log('payload', payload);
    // console.log('payload', payload);
    dispatch(getAllInvoice(payload));
    dispatch(getAllInvoiceStatus());
  };

  useEffect(() => {
    utils();
  }, [dispatch, page, rowsPerPage, filterService, filterName, filterStartDate, filterEndDate]);
  // if (invoiceArr) {
  //   localStorage.setItem('data', JSON.stringify(invoiceArr));
  // }

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

    // local storage delete

    // const localData = JSON.parse(localStorage.getItem('data'));
    // const newData = localData.filter((item) => item.id !== id);
    // localStorage.removeItem('data');
    // localStorage.setItem('data', JSON.stringify(newData));

    // setReload(!reload);
    // back end delete
    const payload = {};
    payload.invoice_id = id;
    dispatch(deleteInvoice(payload));
    // delte front end
    utils();
  };
  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    setIsEdit(!isEdit);
    setIdentifier(id);
    handleOpenModal();
  };

  const handleAddTracking = (id) => {
    setIsAdd(!isAdd);
    setIdentifier(id);
    handleOpenTrackingModal();
  };

  const [modalViewData, setModalViewData] = useState([]);
  const handleViewRow = (data) => {
    // navigate(PATH_BATIBOOT.invoice.view(id));
    setIsView(!isView);
    setIdentifier(data);
    handleOpenViewModal();
    setModalViewData(data);
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
    { value: 'all', label: 'All', color: 'info', count: totalData },
    { value: 'Draft', label: 'Draft', color: 'success', count: totalInvoiceStatusArr.totalDraft },
    { value: 'paid', label: 'Paid', color: 'success', count: totalInvoiceStatusArr.totalPaid },
    { value: 'unpaid', label: 'Unpaid', color: 'warning', count: totalInvoiceStatusArr.totalUnpaid },
    { value: 'overdue', label: 'Overdue', color: 'warning', count: totalInvoiceStatusArr.totalOverdue },
  ];

  const [openModal, setOpenModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  // const [openTrackingModal, setOpenTrackingModal] = React.useState(false);
  const [openTrackingModal, setOpenTrackingModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(!openModal);
  const handleOpenViewModal = () => setOpenViewModal(!openViewModal);
  const handleOpenTrackingModal = () => setOpenTrackingModal(true);

  const handleCloseModal = () => {
    setIsEdit(false);
    setIsAdd(false);
    setIsView(false);
    setOpenModal(false);
    setOpenViewModal(false);
    setOpenTrackingModal(false);
    setIdentifier('');
  };

  const [Status, setStatus] = React.useState(-1);

  const handleTabClick = (type) => {
    resetPage();
    let status = 0;
    switch (type) {
      case 'all':
        status = -1;
        break;
      case 'unpaid':
        status = 0;
        break;
      case 'paid':
        status = 1;
        break;
      case 'overdue':
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
    dispatch(getAllInvoice(payload));
  };

  // Skeleton
  const [ordersData, setOrdersData] = useState({});
  const [showSkel, setshowSkel] = useState(false);
  useEffect(() => {
    setshowSkel(false);
    if (Object.keys(ordersData).length) {
      if (Object.keys(ordersData.allIds).length) {
        setshowSkel(true);
      }
    }
  }, [ordersData]);

  useEffect(() => {
    setOrdersData(invoice);
  }, [invoice]);

  const [showSkelDatatable, setshowSkelDatatable] = useState(false);
  useEffect(() => {
    setshowSkelDatatable(!isLoading);
  }, [isLoading]);

  console.log(totalData);

  return (
    <Page title="Batiboot: Invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice List"
          links={[
            { name: 'Dashboard', href: PATH_BATIBOOT.root },
            { name: 'Invoice', href: PATH_BATIBOOT.invoice.root },
            { name: 'List' },
          ]}
          // action={
          //   <Button
          //     variant="contained"
          //     startIcon={<Iconify icon={'eva:plus-fill'} />}
          //     /*  component={RouterLink}
          //   to={PATH_BATIBOOT.invoice.create} */
          //     onClick={handleOpenModal}
          //   >
          //     New Invoice
          //   </Button>
          // }
        />

        <Box>
          {/* UserRolesCreate Modal */}
          <UserModal
            open={openModal}
            onClose={handleCloseModal}
            edit={isEdit}
            identifier={identifier}
            pathname={pathname}
            nameLink={'Invoice'}
          />

          <InvoiceViewDetailsModal
            open={openViewModal}
            onClose={handleCloseModal}
            data={invoiceArr}
            identifier={identifier}
          />

          <TrackingAddModal open={openTrackingModal} onClose={handleCloseModal} identifier={identifier} />
        </Box>

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="Total"
                total={totalData}
                percent={totalData}
                price={totalData}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title="Draft"
                total={totalInvoiceStatusArr.totalDraft}
                percent={totalInvoiceStatusArr.totalDraft}
                price={totalInvoiceStatusArr.totalDraft}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
              <InvoiceAnalytic
                title="Paid"
                total={totalInvoiceStatusArr.totalPaid}
                percent={totalInvoiceStatusArr.totalPaid}
                price={totalInvoiceStatusArr.totalPaid}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title="Unpaid"
                total={totalInvoiceStatusArr.totalUnpaid}
                percent={totalInvoiceStatusArr.totalUnpaid}
                price={totalInvoiceStatusArr.totalUnpaid}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <InvoiceAnalytic
                title="Overdue"
                total={totalInvoiceStatusArr.totalOverdue}
                percent={totalInvoiceStatusArr.totalOverdue}
                price={totalInvoiceStatusArr.totalOverdue}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
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

          <InvoiceTableToolbar
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
                  headLabel={TABLE_HEAD}
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
                    ? invoiceArr.map((items) => (
                        <InvoiceTableRow
                          // isDesktop={isDesktop}
                          showSkeleton={showSkel}
                          key={items.id}
                          row={invoice.byId[items.id]}
                          selected={selected.includes(items.id)}
                          onSelectRow={() => onSelectRow(items.id)}
                          onDeleteRow={() => handleDeleteRow(items.id)}
                          onEditRow={() => handleEditRow(items)}
                          // bring back if edit dn't work
                          // onEditRow={() => handleEditRow(invoice.byId[items.id])}
                          onViewRow={() => handleViewRow(items.id)}
                          onAddTracking={() => handleAddTracking(items)}
                          // onEditRow={() => handleEditRow(items.id)}
                          // handleClickOpen={handleClickOpen}
                        />
                      ))
                    : [...Array(rowsPerPage)].map((i, k) => {
                        if (!invoiceArr.length) {
                          return true;
                        }
                        return <QuotationSkeleton key={k} />;
                      })}

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
