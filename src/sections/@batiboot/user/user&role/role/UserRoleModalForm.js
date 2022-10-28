import PropTypes, { object } from 'prop-types';
import { paramCase } from 'change-case';

// FORM

import * as Yup from 'yup';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @MUI
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  TableContainer,
  Table,
  Tooltip,
  TableBody,
  IconButton,
  TableCell,
  TableRow,
  Checkbox,
  FormGroup,
  LabelStyle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AvatarGroup,
  Avatar,
  Button,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DialogAnimate } from '../../../../../components/animate';
// import UserCreateRoleModalAddUser from './UserCreateRoleModal_addUser';
import usePermissionsRequest from './permissionRequest';
// UTILS

import { dispatch, useDispatch, useSelector } from '../../../../../redux/store';
import { getAllRoles } from '../../../../../redux/slices/getRole';
// ROUTES
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// _MOCK

import useAuth from '../../../../../hooks/useAuth';

import _mock from '../../../../../_mock';
import createAvatar from '../../../../../utils/createAvatar';

 import _userRole from '../../../../../_mock/batiboot/role.json';
import _userList from '../../../../../_mock/batiboot/user.json';
import _status from '../../../../../_mock/batiboot/roleStatus.json';

// HOOKS
import useTable, { getComparator, emptyRows } from '../../../../../hooks/useTable';
import useTabs from '../../../../../hooks/useTabs';
// COMPONENTS

import EmptyContent from '../../../../../components/EmptyContent';
import Iconify from '../../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../../components/hook-form';

// Table
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../../../components/table';
import FormConverter from '../../../../../components/helpers/FormConverter';

UserRolesCreateForm.propsType = {
  isEdit: PropTypes.pool,
  currentUser: PropTypes.object,
  handleCloseModal: PropTypes.func,
};

export default function UserRolesCreateForm(props) {
  const { user, createUserRole } = useAuth();
  console.log(user.permission);
  const { isEdit, currentUser, handleCloseModal, formRef } = props;
  // const { roles, totalData, ccc, rolesArr, isLoading } = useSelector((state) => state.getRole);
  const navigate = useNavigate();
  const location = useLocation();
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  // -------Working on it---------------

  const {
    permissionRequest,
    setCategory,
    Category,
    SelectedCategoryTitle,
    setSelectedCategoryTitle,
    InMemoSelectedCategory,
    setInMemoSelectedCategory,
    InMemoryRebuildGroup,
    setInMemoryRebuildGroup,
  } = usePermissionsRequest();

  const [storedValues, setStoredValues] = useState([]);
  const [roleText, setRoleText] = useState('');

  const [permissionCollectionArray, setPermissionCollectionArray] = useState([]);
  const [roleArray, setRoleArray] = useState([]);
  const [statusArray, setStatusArray] = useState([]);

  const [status, setStatus] = useState();

  const [tempRoleText, setTempRoleText] = useState('');
  const [holdStatus, setHoldStatus] = useState('')

  const handleStoredValue = (permissionValues, roleValue, statusValue) => {
    setStoredValues(InMemoryRebuildGroup); // InMemoryRebuildGroup
    setTempRoleText(roleValue);
    setHoldStatus(statusValue);

    setPermissionCollectionArray((current) => [...current, InMemoryRebuildGroup]);
    setRoleArray((current) => [...current, roleText]);
    setStatusArray((current) => [...current, status]);

    // resets
    setInMemoSelectedCategory({});
    setRoleText('');
    setStatus('');
  };

  // console.log('Roles', roleArray);
  // console.log('Permissions', permissionCollectionArray);
  // console.log(storedValues)
     console.log('array ', [InMemoryRebuildGroup].map((i,k) => i).map((i,k) => i));
  // ------Working on it------------------

  const TABLE_HEAD = [
    { id: 'user', label: 'user', align: 'left' },
    { id: 'role', label: 'Role', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'action', label: 'Actions', align: 'right' },
  ];

  const stats = [
    'Active', 'Inactive'
  ]

  const theme = useTheme();

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
  } = useTable();

  // -------------------Working on it

  
  const onClickBtnMenu = (item, title) => {
    setCategory(item);
    setSelectedCategoryTitle(title);
  };

  const removefromList = (key) => {
    delete InMemoSelectedCategory[key];
    setInMemoSelectedCategory({
      ...InMemoSelectedCategory,
    });
  };

  const onHandleCheck = (e, group, groupname, gid, value) => {
    if (e.target.checked) {
      setInMemoSelectedCategory({
        ...InMemoSelectedCategory,
        [e.target.value]: {
          id: gid,
          checked: true,
          fromGroup: group,
          fromGroupName: groupname,
          value 
        },
      });
    } else {
      delete InMemoSelectedCategory[e.target.value];
      setInMemoSelectedCategory({
        ...InMemoSelectedCategory,
      });
    }
    //  console.log(InMemoSelectedCategory)
  };

  const [procedures, setprocedures] = React.useState([]);
  const Rebuild = () => {
    const memory = InMemoSelectedCategory;
    const groupName = [];
    Object.entries(memory).map(([key, item]) => {
      groupName.push(item.fromGroupName);
      return true;
    });

    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    const distinctGroup = groupName.filter(distinct);
    const RebuildGroups = {};
    const pushID = [];
    distinctGroup.map((value) => {
      const pushChild = [];
      Object.entries(memory).map(([key, item]) => {
        if (value === item.fromGroupName) {
          pushChild.push({ id: item.id, name: key, remarks: '', value: item.value });
          // pushChild.push({value: item.value});
          pushID.push(item.id);
          RebuildGroups[value] = pushChild;
        }
        return true;
      });
      return true;
    });
    setprocedures(pushID);
    setInMemoryRebuildGroup(RebuildGroups);
  };

  //  const [isCheckedVal, setisCheckVal] = React.useState(null);
  //  const [SearchData, setSearchData] = React.useState([]);


  React.useEffect(() => {
    Rebuild();
    const search = [];
    Object.entries(usePermissionsRequest).map(([key, value]) => {
      value.map((data) => search.push(data));
      return true;
    });
    //   setSearchData(search);
    //    setisCheckVal(null);
    // react-hooks/exhaustive-deps
  }, [InMemoSelectedCategory]);

  // Working on it -------------------

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    role: Yup.string().required('Role is required'),
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      role: currentUser?.role || '',
      // user: currentUser?.user || '',
      status: currentUser?.status || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    onChange,
    onInput,
    formState: { isSubmitting },
  } = methods;

  const [tableData, setTemp] = React.useState([]);

  const [tempRole, GETROLE] = React.useState('');
  const [tempStatus, GETSTATUS] = React.useState('');

  const [filterName, setFilterName] = React.useState('');

  const [filterRole, setFilterRole] = React.useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  /*  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTemp(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTemp(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_APGIT.user.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72; 

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus); */

  const [filteredEmployees, checkIfEmployeesHasRole] = React.useState(_userList.filter((key) => key.role === ''));

  const onAddTemp = (event) => {
    const Add = {
      id: tableData.length + 1,
      role: tempRole,
      name: _userList.find((key) => key.id === parseInt(event.target.value, 10)).name,
      status: tempStatus,
      identifier: _userList.find((key) => key.id === parseInt(event.target.value, 10)).id,
    };
    setTemp((tmp) => [...tableData, Add]);
  };
  const condition = () => {
    if (tempRole === '' || tempStatus === '') return 'none';
  };

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      UpdateData();
      reset();
      handleCloseModal();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.role);
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateData = () => {
    if (!_userRole.some((item) => item.role === tempRole.toLowerCase())) {
      _userRole.push({
        id: _userRole.length + 1,
        status: tempStatus,
        permission: 12,
        role: tempRole,
      });
    }

    /* TRY MULTI INSERT ROLE FROM TABLE ***************************************************** */

    _userList.map((key) => {
      const found = tableData.find((item) => item.identifier === key.id);
      if (found) Object.assign(key, found);
      return key;
    });
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const [valueIndex, setValueIndex] = useState(0);
  const handleChange = (event, newValueIndex) => {
    setValueIndex(newValueIndex);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const [openUser, setOpenUser] = React.useState(false);
  const handleOpenUser = () => setOpenUser(true);
  const handleCloseUser = () => setOpenUser(false);

  //

  const handleSaveAsDraft = async () => {}
  const handleCreateAndSend = async (data) => {
    data.permissions = InMemoryRebuildGroup;
    data.company_id = 1;
    data.status_id = data.status; 
    data.name = data.role.charAt(0).toUpperCase() + data.role.slice(1);
    data.slug = data.role.charAt(0).toLowerCase() + data.role.slice(1);
    const payload = FormConverter(data);
    console.log(payload);


    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
     const response =  await createUserRole(data);

      // enqueueSnackbar('Create success!');
      // navigate(PATH_DASHBOARD.user.role);
      enqueueSnackbar('Roles Added!', { variant: 'success', persist: false, });
        navigate(PATH_DASHBOARD.user.role);

      
    } catch (error) {
      console.error(error);
      if(error.message === "Role Exists") {
      enqueueSnackbar('Role Exists!', { variant: 'error',persist: false, });
      }
      
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid container xs={12}>
          <Grid item spacing={3} xs={12} md={4} sx={{ mt: 3, p: 2 }}>
            <Card sx={{ ml: 3 }}>

        
            {/* <Accordion key={1}>
                    <AccordionSummary
                      expandIcon={<Iconify icon={'eva:arrow-ios-downward-fill'} width={20} height={20} />}
                    >
                      <Typography variant="h5">{"Example: Accordion"}</Typography>
                      
                    </AccordionSummary>

                    <AccordionDetails>
                      <Typography variant="Caption">{"Example only: Accordion Content for show"}</Typography>

                      <Box
                        sx={{
                          mt: 3,
                          display: 'grid',
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                      >
                        
                        <Stack alignItems="flex-start">
                          <LoadingButton type="submit" variant="contained" onClick={handleOpenUser}>
                            {'Add User'}
                          </LoadingButton>{' '}
                        </Stack>

                        <Box>
                          <AvatarGroup total={15} alignItems="flex-start">
                            <Avatar alt="Remy Sharp" src={_mock.image.avatar(1)} />
                            <Avatar alt="Travis Howard" src={_mock.image.avatar(2)} />
                            <Avatar alt="Cindy Baker" src={_mock.image.avatar(3)} />
                          </AvatarGroup>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
           */}

          

              <Card>
                {/* * */}
                <div style={{ overflowY: 'auto', maxHeight: '27rem', minHeight: '20rem' }}>
                  {Object.keys(InMemoryRebuildGroup).length ? (
                    Object.entries(InMemoryRebuildGroup).map(([key, item]) => {
                      return (
                        <>
                          <div className="divider">&nbsp;</div>
                          <div className="divider">&nbsp;</div>
                          <Typography
                            variant="h5"
                            sx={{
                              justifyContent: 'flex-start',
                              justifyItems: 'flex-start',
                              alignItems: 'flex-start',
                              textAlign: 'left',
                              ml: 2,
                            }}
                          >
                            {key}
                          </Typography>
                          <ol>
                            {item.map((childItems, childId) => {
                              return (
                                <>
                                  <Typography
                                    sx={{
                                      justifyContent: 'flex-start',
                                      justifyItems: 'flex-start',
                                      alignItems: 'flex-start',
                                      textAlign: 'left',
                                      ml: 4.5,
                                    }}
                                  >
                                    <li sx={{ mt: 1 }}>
                                      <Stack direction="row" spacing={1}>
                                        <Typography variant="body1" key={childId}>
                                          {childItems.name}
                                        </Typography>
                                        <Iconify
                                          onClick={() => removefromList(childItems.name)}
                                          icon={'eva:close-fill'}
                                          width={20}
                                          height={20}
                                          sx={{
                                            mt: 2,
                                            backgroundColor: 'gray',
                                            color: 'white',
                                            borderRadius: '50%',
                                            padding: '2px',
                                            cursor: 'pointer',
                                            '&:hover': { color: 'white', backgroundColor: theme.palette.primary.main },
                                          }}
                                        />
                                      </Stack>
                                    </li>
                                  </Typography>
                                </>
                              );
                            })}
                          </ol>
                        </>
                      );
                    })
                  ) : (
                    <EmptyContent
                      title="No Data Selected"
                      description="Select data on the list."
                      sx={{ maxHeight: '300px' }}
                    />
                  )}
                </div>{' '}
                {/* * */}
              </Card>

              <DialogAnimate open={openUser} className="dialog-center" fullScreen>
                <div className="mpp-main">
                  <div className="mpp-header">
                    <DialogTitle className="dialog-title" sx={{ backgroundColor: theme.palette.primary.main }}>
                      {/*  <Image disabledEffect alt='samplejhonghilario' src='/assets/hip-logosm.png' sx={{ position: 'fixed', top: -11, left: 1, width: 90, height: 90 }} /> */}
                      <Typography
                        sx={{ position: 'fixed', top: 18, left: 50, color: 'white' /* theme.palette.primary.light */ }}
                      >
                        Add Users
                      </Typography>
                      <Button
                        sx={{
                          position: 'fixed',
                          top: 14,
                          right: 15,
                          color: 'black',
                          '&:hover': { backgroundColor: 'white', color: theme.palette.primary.main },
                        }}
                        variant="contained"
                        onClick={handleCloseUser}
                        startIcon={<Iconify icon={'eva:arrow-back-fill'} />}
                      >
                        {' '}
                        {/* ? handlePageModal : */}
                        Back
                      </Button>
                    </DialogTitle>
                  </div>

                  {/* <div className="mpp-body">{<UserCreateRoleModalAddUser />}</div> */}

                  <div className="mpp-footer" sx={{ backgroundColor: theme.palette.primary.main }}>
                    <DialogActions sx={{ '& .MuiDialogActions-root': { padding: '30px !important' } }}>
                      <Button
                        onClick={handleCloseUser}
                        variant="outlined"
                        size="small"
                        sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: 'white' } }}
                      >
                        Cancel
                      </Button>
                      <LoadingButton type="button" size="small" variant="contained">
                        {/* !isEdit ? `Create ${nameLink}` : 'Save Changes' */}
                        Add User
                      </LoadingButton>
                    </DialogActions>
                  </div>
                </div>
              </DialogAnimate>

              {/*    <Card>
                    <Box>
                      <EmptyContent  title="No Data Selected" description="Select data on the list." sx={{ height:'300px' }}/>
                    </Box>
        </Card>  */}
            </Card>
          </Grid>

          <Grid item spacing={3} xs={12} md={8} sx={{ mt: 1, p: 1 }}>
            <Card sx={{ p: '1rem' }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                {/* onInput={(e) => GETROLE(e.target.value.toLowerCase())} =RHFTextField */}
                {/*  onChange={(e) => GETSTATUS(e.target.value)}  value={tempStatus} =RHFSelect */}
                <RHFTextField name="role" label="Role"  />

                <RHFSelect name="status" label="Status" placeholder="Status" >
                  <option value={""} />
                  {_status.map((option, i) => (
                    <option key={i} value={option.id} >
                      {option.status}
                    </option>
                  ))}
                </RHFSelect>
              </Box>
            </Card>

            <Card
              sx={{
                display: 'flex',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              {/* */}

              <>
                <Grid md={4.5} sx={{ p: 2 }}>
                  <div style={{ overflowY: 'auto', height: '24rem' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        variant="h5"
                        sx={{
                          justifyContent: 'flex-start',
                          justifyItems: 'flex-start',
                          alignItems: 'flex-start',
                          textAlign: 'left',
                          ml: 2,
                        }}
                      >
                        {SelectedCategoryTitle}
                      </Typography>
                    </Box>
                    {Category.map((item, key) => (
                      <Box sx={{ display: 'grid' }} key={key}>
                        <FormControlLabel
                          value={item.name}
                          control={
                            <Checkbox
                              onClick={(e) => onHandleCheck(e, item.id, item.groupName, item.group, item.value)}
                              checked={InMemoSelectedCategory[item.name] !== undefined ?? !true}
                            />
                          }
                          label={
                            <Typography variant="h6" sx={{ color: theme.palette.primary.dark }}>
                              {item.name}
                            </Typography>
                          }
                          sx={{ float: 'left', ml: 1, mt: -0.5 }}
                        />
                      </Box>
                    ))}
                  </div>
                </Grid>
              </>

              <>
                <Grid container spacing={2} sx={{ pl: 1, pr: 1, pt: 2, height: 0 }} md={7.5} xs={12}>
                  {Object.entries(permissionRequest).map(([key, items]) => (
                    <Grid item md={3} sx={{ paddingTop: 0 }} key={key}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => onClickBtnMenu(items, key)}
                        sx={
                          key === SelectedCategoryTitle
                            ? {
                                ml: 1,
                                mt: -1,
                                justifyContent: 'center',
                                justifyItems: 'center',
                                textAlign: 'center',
                                display: 'grid',
                                wordBreak: 'normal',
                                fontSize: '12px',
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                                '&:hover': { backgroundColor: theme.palette.primary.main },
                              }
                            : {
                                ml: 1,
                                mt: -1,
                                justifyContent: 'center',
                                justifyItems: 'center',
                                textAlign: 'center',
                                display: 'grid',
                                wordBreak: 'normal',
                                fontSize: '12px',
                                backgroundColor: 'white',
                                color: 'black',
                                '&:hover': { backgroundColor: theme.palette.primary.main, color: 'white' },
                              }
                        }
                      >
                        <Typography variant="body2">{key}</Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                {/*    <div className="divider">&nbsp;</div>
                <div className="divider">&nbsp;</div> */}
              </>

              {/* */}
            </Card>
            {/* <Box sx={{ p: 0.5, justifyItems: 'flex-end' }}>
              <Stack sx={{ mt: 1, width: '100px' }}>
                <LoadingButton
                  type="button"
                  variant="contained"
                  onClick={() => handleStoredValue(InMemoryRebuildGroup, roleText, status)}
                >
                  Save Role
                </LoadingButton>
              </Stack>
            </Box> */}
          </Grid>
        </Grid>
      </Grid>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton
                        color="inherit"
                        size="small"
                        variant="contained"
                        loading={ isSubmitting}
                        onClick={handleSubmit(handleSaveAsDraft)}
                        type='submit'
                        sx={{display:'none'}}
                        ref={formRef}
                    />

                    <LoadingButton
                        size="small"
                        variant="contained"
                        loading={isSubmitting}
                        onClick={handleSubmit(handleCreateAndSend)}
                        type='submit'
                        sx={{display:'none'}}
                        ref={formRef}
                    />
                </Stack>
    </FormProvider>
  );
}

function applySortFilter({ tableData, comparator, filterName, filterStatus }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.role.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  return tableData;
}
