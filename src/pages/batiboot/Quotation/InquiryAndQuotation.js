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
import { getAllQuotations, getQuotationServices, getAllQuotationsData, getAllQuotationsPendings,getAllQuotationsApproved,getAllShipmentReceived} from '../../../redux/slices/adminQuotation';
// import { getAllQuotationsApproved } from '../../../redux/slices/adminQuotationApproved';
// import { getAllQuotationsPendings } from '../../../redux/slices/adminQuotationPendings';

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
import InquireAndQuotationCreateModal from './InquiryAndQuotationCreate';

import { InvoiceTableRow, InvoiceTableToolbar } from '../../../sections/@batiboot/invoice/list';
import InquiryAndQuotationViewModal from './InquiryAndQuotationView';
import UserModal from '../../../sections/@batiboot/modal/UserModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'customer_name', label: 'Customer Name', align: 'left' },
  { id: 'blankSpace' },
  { id: 'product_name', label: 'Product Name', align: 'left' },
  { id: 'services', label: 'Type', align: 'left' },
  { id: 'price', label: 'Price', align: 'left' },
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
  const { 
    quotations, 
    totalData, 
    totalDataPendings,
    totalDataApproved, 
    totalDataReceived,
    ccc, 
    quotationsArr, 
    isLoading, 
    quotationServices } = useSelector((state) => state.adminQuotation );

 
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [reRender, setRender] = useState(false);

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
  const [modalViewData, setModalViewData] = useState([]);
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
  const handleViewRow = (data) => {
    // navigate(PATH_BATIBOOT.invoice.view(id));

    // setIsView(!isView);
    // //  setIdentifier(id)
    // handleOpenViewModal();
    setIsView(!isView);
    //  setIdentifier(id)
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
    { value: 'approved', label: 'Approved', color: 'success', count: totalDataApproved },
    { value: 'received', label: 'Received', color: 'warning', count: totalDataReceived },
    { value: 'pending', label: 'Pending', color: '',backgroundColor:'green', count: totalDataPendings },
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
    dispatch(getAllQuotations(payload));
  };

  const getServices = () => {
    dispatch(getQuotationServices());
    dispatch(getAllQuotationsData());
    dispatch(getAllQuotationsPendings());
    dispatch(getAllQuotationsApproved()); 
    dispatch(getAllShipmentReceived()); 
   };
  
  useEffect(() => {
    utils();
    getServices();
  }, [dispatch, page, rowsPerPage, filterService, filterName, filterStartDate, filterEndDate]);

  console.log('Total Data', totalData );
  // console.log('Total Data Approved', totalDataApproved );
  console.log('Total Data Pendings', totalDataPendings );
  console.log('Total Data Received', totalDataReceived );
  // const SERVICE_OPTIONS = [
  //   'All',
  //   'Product Sourcing',
  //   'Importing',
  //   'Product Rebranding',
  //   'Private Label',
  //   'Warehousing',
  //   'Fulfillment',
  // ];
  // console.log('SERVICES: ', quotationServices);

  const SERVICE_OPTIONS = quotationServices.reduce(
    (item, currentItem) => {
      if (!item.includes(currentItem.services)) {
        item.push(currentItem.services);
      }
      return item;
    },
    ['All']
  );
  // console.log('DATA KOTO: ', data);

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
            <InquiryAndQuotationViewModal
              open={openViewModal}
              onClose={handleCloseModal}
              identifier={identifier}
              data={modalViewData}
            />
            // <UserModal
            //   open={openViewModal}
            //   onClose={handleCloseModal}
            //   view={isView}
            //   data={modalViewData}
            //   identifier={identifier}
            //   pathname={pathname}
            //   nameLink={'Inquiry Quotation view'}
            // />
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
                total={totalData}
                percent={totalData}
                price={totalData}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <InquireQuoListAnalytics
                title="Pending"
                total={totalDataPendings}
                percent={totalDataPendings}
                price={totalDataPendings}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
              />
              <InquireQuoListAnalytics
                title="Approved"
                total={totalDataApproved}
                percent={totalDataApproved}
                price={totalDataApproved}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InquireQuoListAnalytics
                title="Received"
                total={totalDataReceived}
                percent={totalDataReceived}
                price={totalDataReceived}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
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
                    ? quotationsArr.map((items) => (
                        <InquireQuoTableRow
                          // isDesktop={isDesktop}
                          showSkeleton={showSkel}
                          key={items.id}
                          row={quotations.byId[items.id]}
                          selected={selected.includes(items.id)}
                          onSelectRow={() => onSelectRow(items.id)}
                          onDeleteRow={() => handleDeleteRow(items.id)}
                          onViewRow={() => handleViewRow(items)}
                          onEditRow={() => handleEditRow(quotations.byId[items.id].fname)}
                          utils={utils}
                          // handleClickOpen={handleClickOpen}
                        />
                      ))
                    : [...Array(rowsPerPage)].map((i, k) => {
                        if (!quotationsArr.length) {
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
              rowsPerPageOptions={[3, 10, 25]}
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
