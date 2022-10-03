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
import { getAllRoles } from '../../../redux/slices/getRole';
import { getAllUsersDesignation } from '../../../redux/slices/adminUserDesignation';

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
import QuotationSkeleton from './OrderSkeleton';
// import InvoiceAnalytic from '../../sections/@batiboot/invoice/InvoiceAnalytic';
import UserListAnalytics from '../../../sections/@batiboot/user/user&role/Analytics/UserListAnalytics';
import { UserTableToolbar, UserDepartmentTableRow } from '../../../sections/@batiboot/user/user&role';
// import { OrderTableRow, OrderTableToolbar } from '../../sections/@batiboot/orders/order/list';
import OrderListAnalytics from '../../../sections/@batiboot/orders/order/OrderListAnalytics';
// import OrderCreateModal from './OrderListCreate';
// import OrderListViewModal from './OrderListView';
import UserModal from '../../../sections/@batiboot/modal/UserModal';

import { InvoiceTableRow, InvoiceTableToolbar } from '../../../sections/@batiboot/invoice/list';



// ----------------------------------------------------------------------


const TABLE_HEAD = [

  { id: 'designation', label: 'Designation', align: 'center' },
  { id: 'user', label: 'user', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserDesignation() {
  const theme = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { usersDesignation, totalData, ccc, usersDesignationArr, isLoading } = useSelector((state) => state.adminUserDesignation);
  const { roles, rolesArr,  } = useSelector((state) => state.getRole);
  console.log("rolesss", rolesArr);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const SERVICE_OPTIONS = [
    {id: "All", name:"All"}, ...rolesArr
  ];

  
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
const [modalViewData, setModalViewData] = useState([]);
  const handleViewRow = (data) => {
    // navigate(PATH_BATIBOOT.invoice.view(id));

    setIsView(!isView);
    //  setIdentifier(id)
    handleOpenViewModal();
    setModalViewData(data);
    
  };
console.log("filter servies", filterService);
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

  // const getLengthByStatus = (inquireQuoStatus) =>
  //   tableData.filter((item) => item.inquireQuoStatus === inquireQuoStatus).length;

  // const getTotalPriceByStatus = (inquireQuoStatus) =>
  //   sumBy(
  //     tableData.filter((item) => item.inquireQuoStatus === inquireQuoStatus),
  //     'amount'
  //   );

  // const getPercentByStatus = (inquireQuoStatus) => (getLengthByStatus(inquireQuoStatus) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: ccc.active+ccc.banned},
    { value: 'active', label: 'Active', color: 'success', count: ccc.active },
    { value: 'banned', label: 'Banned', color: 'error', count: ccc.banned },
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

  const [Status, setStatus] = React.useState("all");

  useEffect(async() => {

    const payload = {};
    payload.page = page;
    payload.rowcount = rowsPerPage;
    // // payload.status = Status;
    payload.services =filterService;
    // console.log(filterService);
    payload.search = filterName;
    payload.startDate = filterStartDate;
    payload.endDate = filterEndDate;
    payload.tab = Status;
    console.log('payload', payload);
    await dispatch(getAllUsersDesignation(payload));
    await dispatch(getAllRoles());
    
  }, [dispatch, page, rowsPerPage,filterService, filterName, filterStartDate, filterEndDate, Status]);

  /* console.log(appointmentsArr) */

  const handleTabClick = (type) => {
    // resetPage();
    // let status = 0;
    // switch (type) {
    //   case 'all':
    //     setStatus(type);
    //     break;
    //   case 'active':
    //     setStatus(type);
    //     break;
    //   case 'banned':
    //     setStatus(type);
    //     break;
    //   default:
    //     setStatus(type);
    //     break;
    // }
  setStatus(type);
    const payload = {};
    payload.page = page;
    payload.rowcount = rowsPerPage;
    // payload.status = status;
    payload.services = filterService;
    payload.search = filterName;
    payload.startDate = filterStartDate;
    payload.endDate = filterEndDate;
    dispatch(getAllUsersDesignation(payload));
    // dispatch(getAllRoles());
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
    setOrdersData(usersDesignation);
  }, [usersDesignation]);


  const [showSkelDatatable, setshowSkelDatatable] = useState(false);
  useEffect(() => {
    setshowSkelDatatable(!isLoading);
  }, [isLoading]);



  return (
    <Page title="Batiboot: Designations">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
            heading="Designations"
          links={[
            { name: 'Dashboard', href: PATH_BATIBOOT.root },
            { name: 'User', href: PATH_BATIBOOT.user.root },
            { name: 'Designations' },
          ]}
          action={
            <Button variant="contained" onClick={handleOpenModal} startIcon={<Iconify icon={'eva:plus-fill'} />}>
               Add Designation
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
            nameLink={'Department'}
          />
            {
            /*  <OrderCreateModal 
           open={openModal}
           onClose={handleCloseModal} 
           edit={isEdit}
           identifier={identifier}
          />
          */
            // <OrderListViewModal open={openViewModal} onClose={handleCloseModal} identifier={identifier} data={modalViewData} />
          }
        </Box>


   <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              {showSkel ? (
                <UserListAnalytics
                  title="Total"
                  total={totalData}
                  percent={100}
                  icon="ic:round-receipt"
                  color={theme.palette.info.main}
                />
              ) : (
                <Skeleton animation="wave" sx={{ width: '260px', height: '60px', mx: 10 }} />
              )}

              {showSkel ? (
                <UserListAnalytics
                  title="Active"
                  total={ccc.active}
                  percent={(ccc.active * 100) / (ccc.active+ccc.banned)}
                  icon="eva:checkmark-circle-2-fill"
                  color={theme.palette.success.main}
                />
              ) : (
                <Skeleton animation="wave" sx={{ width: '260px', height: '60px', mx: 10 }} />
              )}

              {showSkel ? (
                <UserListAnalytics
                  title="Banned"
                  total={ccc.banned}
                  percent={(ccc.banned * 100) / (ccc.active+ccc.banned)}
                  icon="eva:bell-fill"
                  color={theme.palette.error.main}
                />
              ) : (
                <Skeleton animation="wave" sx={{ width: '260px', height: '60px', mx: 10 }} />
              )}
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

             
            </Stack>
          )}

          <Divider />

          <UserTableToolbar
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
                    ? usersDesignationArr.map((items) => (
                        <UserDepartmentTableRow
                          // isDesktop={isDesktop}
                          showSkeleton={showSkel}
                          key={items.id}
                          row={usersDesignation.byId[items.id]}
                          selected={selected.includes(items.id)}
                          onSelectRow={() => onSelectRow(items.id)}
                          onDeleteRow={() => handleDeleteRow(items.id)}
                          onEditRow={() => handleEditRow(usersDesignation.byId[items.id].fname)}
                          onViewRow={() => handleViewRow(items)}
                          // onEditRow={() => handleEditRow(items.id)}
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
