import sumBy from 'lodash/sumBy';
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
} from '@mui/material';
// routes
import { PATH_BATIBOOT, PATH_DASHBOARD } from '../../../routes/paths';

// redux
// eslint-disable-next-line
import { useDispatch, useSelector } from '../../../redux/store';
import { getAlltracking, getAllShipmentStatus } from '../../../redux/slices/adminTracking';

import useAuth from '../../../hooks/useAuth';
// routes

// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// _mock_
import { _invoices } from '../../../_mock';
import _tracking from '../../../_mock/batiboot/shipment.json';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../../components/table';
import QuotationSkeleton from '../OrderSkeleton';
// sections
// import InvoiceAnalytic from '../../sections/@batiboot/invoice/InvoiceAnalytic';
import { TrackingTableRow, TrackingTableToolbar } from '../../../sections/@batiboot/orders/shipment/list';
import TrackingListAnalytics from '../../../sections/@batiboot/orders/shipment/ShipmentListAnalytics';
import ShipmentCreateModal from './ShipmentTrackingCreate';
import ShipmentListViewModal from './ShipmentTrackingView';
import UserModal from '../../../sections/@batiboot/modal/UserModal';
// import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@batiboot/invoice/list';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'Product Sourcing',
  'Importing',
  'Product Rebranding',
  'Private Label',
  'Warehousing',
  'Fulfillment',
];

const TABLE_HEAD = [
  { id: 'trackingNo', label: 'Tracking No', align: 'left' },
  { id: 'pName', label: 'Product Name', align: 'left' },
  { id: 'origin', label: 'Origin', align: 'left' },
  { id: 'destination', label: 'Destination', align: 'left' },
  { id: 'orderReceived ', label: 'Order Received', align: 'center', width: 140 },
  { id: 'trackingStatus', label: 'Status', align: 'center', width: 140 },
  { id: 'actions', label: 'Actions', align: 'center' },
];

// ----------------------------------------------------------------------

export default function ShipmentTracking() {
  const theme = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { name = '' } = useParams();
  // const currentUser = _userList.find((user) => paramCase(user.name) === name);
  const { tracking, totalShipmentStatusArr, totalData, ccc, trackingArr, isLoading } = useSelector(
    (state) => state.adminTracking
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
  } = useTable({ defaultOrderBy: 'orderReceived' });

  const [tableData, setTableData] = useState(trackingArr);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [identifier, setIdentifier] = useState('');

  const utils = () => {
    const payload = {};
    payload.page = page;
    payload.rowcount = rowsPerPage;
    // // payload.status = Status;
    payload.services = filterService;
    // console.log(filterService);
    payload.search = filterName;
    payload.startDate = filterStartDate;
    payload.endDate = filterEndDate;
    console.log('payload', payload);
    console.log('payload', payload);
    dispatch(getAlltracking(payload));
    dispatch(getAllShipmentStatus());
  };

  useEffect(() => {
    utils();
  }, [dispatch, page, rowsPerPage, filterService, filterName, filterStartDate, filterEndDate]);

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
    setIdentifier(id);
    handleOpenModal();
  };

  const handleViewRow = (id) => {
    // navigate(PATH_BATIBOOT.invoice.view(id));

    setIsView(!isView);
    setIdentifier(id);
    // handleOpenModal();
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

  const getLengthByStatus = (trackingStatus) =>
    tableData.filter((item) => item.trackingStatus === trackingStatus).length;

  const getTotalPriceByStatus = (trackingStatus) =>
    sumBy(
      tableData.filter((item) => item.trackingStatus === trackingStatus),
      'amount'
    );

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
  const [showSkel, setshowSkel] = useState(false);
  useEffect(() => {
    setshowSkel(false);
    if (Object.keys(tracking).length) {
      if (Object.keys(tracking.allIds).length) {
        setshowSkel(true);
      }
    }
  }, [tracking]);

  const [showSkelDatatable, setshowSkelDatatable] = useState(false);
  useEffect(() => {
    setshowSkelDatatable(!isLoading);
  }, [isLoading]);

  const getPercentByStatus = (trackingStatus) => (getLengthByStatus(trackingStatus) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: totalData },
    { value: 'Preparing', label: 'Preparing', color: 'success', count: totalShipmentStatusArr.totalPreparing },
    {
      value: 'Delivery In Progress',
      label: 'Delivery In Progress',
      color: 'success',
      count: totalShipmentStatusArr.totalDeliveryInProgress,
    },
    { value: 'Delivered', label: 'Delivered', color: 'warning', count: totalShipmentStatusArr.totalProductDelivered },
    { value: 'Received', label: 'Received', color: 'error', count: totalShipmentStatusArr.totalReceived },
    { value: 'Not Delivered', label: 'Not Delivered', color: 'error', count: totalShipmentStatusArr.totalNotDelivered },
  ];

  return (
    <Page title="Batiboot: Shipment Tracking">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Shipment Tracking"
          links={[
            { name: 'Dashboard', href: PATH_BATIBOOT.root },
            { name: 'Order', href: PATH_BATIBOOT.order.root },
            { name: 'Shipment Tracking' },
          ]}
          // action={
          //   <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={handleOpenModal}>
          //     Shipment
          //   </Button>
          // }
        />
        <Box>
          <UserModal
            open={openModal}
            onClose={handleCloseModal}
            edit={isEdit}
            view={isView}
            identifier={identifier}
            pathname={pathname}
            nameLink={'Tracking'}
          />
          <ShipmentListViewModal open={openViewModal} onClose={handleCloseModal} identifier={identifier} />
        </Box>

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <TrackingListAnalytics
                title="Total"
                total={totalData}
                percent={totalData}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <TrackingListAnalytics
                title="Preparing"
                total={totalShipmentStatusArr.totalPreparing}
                percent={totalShipmentStatusArr.totalPreparing}
                price={totalShipmentStatusArr.totalPreparing}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />

              <TrackingListAnalytics
                title="Progress"
                total={totalShipmentStatusArr.totalDeliveryInProgress}
                percent={totalShipmentStatusArr.totalDeliveryInProgress}
                price={totalShipmentStatusArr.totalDeliveryInProgress}
                icon="icon-park-solid:delivery"
                color={theme.palette.success.main}
              />
              <TrackingListAnalytics
                title="Delivered"
                total={totalShipmentStatusArr.totalProductDelivered}
                percent={totalShipmentStatusArr.totalProductDelivered}
                icon="carbon:delivery"
                color={theme.palette.success.main}
              />

              <TrackingListAnalytics
                title="Received"
                total={totalShipmentStatusArr.totalReceived}
                percent={totalShipmentStatusArr.totalReceived}
                price={totalShipmentStatusArr.totalReceived}
                icon="mdi:package-variant-closed-check"
                color={theme.palette.success.main}
              />

              <TrackingListAnalytics
                title="Not Delivered"
                total={totalShipmentStatusArr.totalNotDelivered}
                percent={totalShipmentStatusArr.totalNotDelivered}
                price={totalShipmentStatusArr.totalNotDelivered}
                icon="mdi:package-variant-closed-remove"
                color={theme.palette.error.main}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
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
              />
            ))}
          </Tabs>

          <Divider />

          <TrackingTableToolbar
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
                    ? trackingArr.map((items) => (
                        <TrackingTableRow
                          showSkeleton={showSkel}
                          key={items.id}
                          row={tracking.byId[items.id]}
                          selected={selected.includes(items.id)}
                          onSelectRow={() => onSelectRow(items.id)}
                          onDeleteRow={() => handleDeleteRow(items.id)}
                          onEditRow={() => handleEditRow(tracking.byId[items.id])}
                          onViewRow={() => handleViewRow(tracking.byId[items.id])}
                        />
                      ))
                    : [...Array(rowsPerPage)].map((i, k) => {
                        if (!trackingArr.length) {
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

  if (filterName) {
    tableData = tableData.filter(
      (item) =>
        item.trackingNo.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.pName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.trackingStatus === filterStatus);
  }

  if (filterService !== 'all') {
    tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService));
  }

  if (filterStartDate && filterEndDate) {
    /* tableData = tableData.filter(
      (item) =>
        item.orderCreated.getTime() >= filterStartDate.getTime() && item.dueDate.getTime() <= filterEndDate.getTime()
    ); */
  }

  return tableData;
}
