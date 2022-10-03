import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import format from 'date-fns/format';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { LoadingButton, DatePicker, LocalizationProvider,  } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Button,
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  styled,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
// utils
import useAuth from '../../../../../hooks/useAuth';
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { fData } from '../../../../../utils/formatNumber';
import { dispatch, useDispatch, useSelector } from '../../../../../redux/store';
import { getAllRoles } from '../../../../../redux/slices/getRole';
import { getAllDesignations } from '../../../../../redux/slices/getDesignation';
import { getAllDepartments } from '../../../../../redux/slices/getDepartment';
import { getAllShifts } from '../../../../../redux/slices/getShift';

// routes
import { PATH_BATIBOOT, PATH_DASHBOARD } from '../../../../../routes/paths';
// _mock
import { countries } from '../../../../../_mock';
// import { role } from '../../../../../_mock/role';
import Iconify from '../../../../../components/Iconify';
// components
import Label from '../../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../../components/hook-form';

 


UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  nameLink: PropTypes.object,
  formRef: PropTypes.any,
};



export default function UserNewEditForm({ isEdit, currentUser, nameLink, formRef }) {
  const { createUserManagement } = useAuth();
  const { roles, totalData, ccc, rolesArr, isLoading } = useSelector((state) => state.getRole);
  const { designations, designationsArr,totalData: totalDataDesignation, isLoading: isLoadingDesignation } = useSelector((state) => state.getDesignation);
  const { departments, departmentsArr,totalData: totalDataDepartment, isLoading: isLoadingDepartment } = useSelector((state) => state.getDepartment);
  const { shifts, shiftsArr, totalData: totalDataShift, isLoading: isLoadingShift } = useSelector((state) => state.getShift);
  const [bdate, setBdate] = useState(new Date());
  const isMountedRef = useIsMountedRef();

  // useEffect(() => {
  //   dispatch(getAllRoles())
  //   dispatch(getAllDesignations())
  //   dispatch(getAllDepartments())
  //   dispatch(getAllShifts())
  //  }, [dispatch]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().max(11, 'Phone number must be 11 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    // country: Yup.string().required('country is required'),
    // company: Yup.string().required('Company is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role Number is required'),
    // avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    maritalStatus : Yup.string().required('Marital Status is required'),
    gender : Yup.string().required('Gender is required'),
    dateOfBirth : Yup.string().required('Date of Birth is required'),
    religion : Yup.string().required('Religion is required'),
    designation : Yup.string().required('Designation is required'),
    department : Yup.string().required('Department is required'),
    shift : Yup.string().required('Shift is required'),
    basicSalary : Yup.string().required('Basic Salary is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
    role : Yup.string().required('Role is required'),
    confirmPassword: Yup.string()
    .when("password", {
      is: (val) => Yup.boolean(val && val.length > 0 ), 
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    })
    .required("Confirm Password is required"),

  });
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      // country: currentUser?.country || '',
      // state: currentUser?.state || '',
      // city: currentUser?.city || '',
      // zipCode: currentUser?.zipCode || '',
      // avatarUrl: currentUser?.avatarUrl || '',
      // isVerified: currentUser?.isVerified || "non-verified",
      // status: currentUser?.status,
      // company: currentUser?.company || '',
      role: currentUser?.role || '',
      maritalStatus: currentUser?.maritalStatus || '',
      gender: currentUser?.maritalStatus || '',
      dateOfBirth: currentUser?.dateOfBirth || bdate,
      religion: currentUser?._religion || '',
      designation: currentUser?.designation || '',
      department: currentUser?.department || '',
      shift: currentUser?._shift || '',
      basicSalary: currentUser?.basicSalary || '',
      password: currentUser?.password || '',
      confirmPassword: currentUser?.confirmPassword || '',
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
    formState: { isSubmitting, errors },
    setError,
    getValues,
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const date = `${bdate.getFullYear()}-${bdate.getMonth()}-${bdate.getDate()}`;

      console.log(format(bdate,"Pp" ));
      const form = new FormData();
      form.append('name', data.name);
      form.append('email', data.email);
      form.append('password', data.confirmPassword);
      form.append('phone', data.phoneNumber);
      form.append('gender', data.gender);
      form.append('address', data.address);
      form.append('birth_date', date);
      form.append('religion', data.religion);
      form.append('marital_status', data.maritalStatus);
      form.append('designation_id', data.designation);
      form.append('department_id', data.department);
      form.append('shift_id', data.shift);
      form.append('basic_salary', data.basicSalary);
      // form.append('permission', data.permission);
      form.append('user_role', data.role);

console.log(date);
await createUserManagement(form);

      
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
       reset();
      // navigate(PATH_BATIBOOT.user.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: 'error' });
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [date, setDate] = useState(new Date());



  const _departments = ['Admin', 'HR', 'Staff', 'IT', 'Finance', 'Inventory', 'Manager'];

  const _gender = ['Male', 'Female', 'Unisex', 'Others'];

  const _religion = ['Hindu', 'Islam', 'Christian'];

  const _maritalStatus = ['Single', 'Married', 'Separated'];

  const _bloodType = ['A', 'B', 'O', 'AB', 'A-', 'B-', 'O-', 'AB-'];

  const _shift = ['Day', 'Evening', 'Night'];

  const _designation = ['IT', 'HR', 'Marketing', 'Management', 'Administration'];

  const panelTabs = [
    { name: 'Designation', title: 'Designation', index: 0, permission: ['Read', 'Create', 'Update', 'Delete'] },

    { name: 'Department', title: 'Department', index: 1, permission: ['Read', 'Create', 'Update', 'Delete'] },

    {
      name: 'Users',
      title: 'Users',
      index: 2,
      permission: ['Read', 'Profile', 'Create', 'Edit', 'Update', 'Delete', 'Menu', 'Make HR'],
    },

    { name: 'Roles', title: 'Roles', index: 3, permission: ['Read', 'Create', 'Update', 'Delete'] },

    { name: 'LeaveType', title: 'Leave Type', index: 4, permission: ['Read', 'Create', 'Update', 'Delete', 'Menu'] },

    { name: 'LeaveAssign', title: 'Leave Assign', index: 5, permission: ['Read', 'Create', 'Update', 'Delete'] },

    {
      name: 'LeaveRequest',
      title: 'Leave Request',
      index: 6,
      permission: ['Read', 'Create', 'Approve', 'Reject', 'Delete'],
    },

    { name: 'Weekend', title: 'Weekend', index: 7, permission: ['Read', 'Update'] },

    { name: 'Holiday', title: 'Holiday', index: 8, permission: ['Read', 'Create', 'Update', 'Delete'] },

    { name: 'Schedule', title: 'Schedule', index: 9, permission: ['Read', 'Create', 'Update', 'Delete'] },

    { name: 'Attendance', title: 'Attendance', index: 10, permission: ['Read', 'Create', 'Update', 'Delete', 'Menu'] },

    { name: 'Shift', title: 'Shift', index: 11, permission: ['Read', 'Create', 'Update', 'Delete', 'Menu'] },

    {
      name: 'Payroll',
      title: 'Payroll',
      index: 12,
      permission: [
        'Menu',
        'Payroll item read',
        'Payroll item create',
        'Payroll item store',
        'Payroll item edit',
        'Payroll item update',
        'Payroll item delete',
        'Payroll item view',
        'Payroll item menu',
        'List payroll set',
        'Create payroll set',
        'Store payroll set',
        'Edit payroll set',
        'Update payroll set',
        'Delete payroll set',
        'View payroll set',
        'Payroll set menu',
      ],
    },

    {
      name: 'Payslip',
      title: 'Payslip',
      index: 13,
      permission: [
        'Menu',
        'Salary generate',
        'Salary view',
        'Salary delete',
        'Salary edit',
        'Salary update',
        'Salary payment',
        'Payslip list',
      ],
    },

    {
      name: 'AdvanceType',
      title: 'Advance Type',
      index: 14,
      permission: [
        'Menu',
        'Advance type create',
        'Advance type store',
        'Advance type edit',
        'Advance type update',
        'Advance type delete',
        'Advance type view',
        'Advance type list',
      ],
    },

    {
      name: 'AdvancePay',
      title: 'Advance Pay',
      index: 15,
      permission: [
        'Menu',
        'Advance salaries create',
        'Advance salaries store',
        'Advance salaries edit',
        'Advance salaries update',
        'Advance salaries delete',
        'Advance salaries view',
        'Advance salaries approve',
        'Advance salaries list',
        'Advance salaries pay',
        'Advance salaries invoice',
        'Advance salaries search',
      ],
    },

    {
      name: 'Salary',
      title: 'Salary',
      index: 16,
      permission: [
        'Menu',
        'Salary store',
        'Salary edit',
        'Salary update',
        'Salary delete',
        'Salary view',
        'Salary list',
        'Salary pay',
        'Salary invoice',
        'Salary approve',
        'Salary generate',
        'Salary calculate',
        'Salary search',
      ],
    },

    {
      name: 'Account',
      title: 'Account',
      index: 17,
      permission: [
        'Menu',
        'Account create',
        'Account store',
        'Account edit',
        'Account update',
        'Account delete',
        'Account view',
        'Account list',
        'Account search',
      ],
    },

    {
      name: 'Deposit',
      title: 'Deposit',
      index: 18,
      permission: [
        'Menu',
        'Deposit create',
        'Deposit store',
        'Deposit edit',
        'Deposit update',
        'Deposit delete',
        'Deposit list',
      ],
    },

    {
      name: 'Expense',
      title: 'Expense',
      index: 19,
      permission: [
        'Menu',
        'Expense create',
        'Expense store',
        'Expense edit',
        'Expense update',
        'Expense delete',
        'Expense list',
        'Expense approve',
        'Expense invoice',
        'Expense pay',
        'Expense view',
      ],
    },

    {
      name: 'DepositCategory',
      title: 'Deposit Category',
      index: 20,
      permission: [
        'Menu',
        'Deposit category create',
        'Deposit category store',
        'Deposit category edit',
        'Deposit category update',
        'Deposit category delete',
        'Deposit category list',
      ],
    },

    {
      name: 'PaymentMethod',
      title: 'Payment Method',
      index: 21,
      permission: [
        'Menu',
        'Payment method create',
        'Payment method store',
        'Payment method edit',
        'Payment method update',
        'Payment method delete',
        'Payment method list',
      ],
    },

    {
      name: 'Transaction',
      title: 'Transaction',
      index: 22,
      permission: [
        'Menu',
        'Transaction create',
        'Transaction store',
        'Transaction edit',
        'Transaction update',
        'Transaction delete',
        'Transaction view',
        'Transaction list',
      ],
    },

    { name: 'Report', title: 'Report', index: 23, permission: ['Attendance report', '0', 'Menu'] },

    { name: 'LeaveSettings', title: 'Leave Settings', index: 24, permission: ['Read', 'Update'] },

    { name: 'Ip', title: 'Ip', index: 25, permission: ['Read', 'Create', 'Update', 'Delete'] },

    {
      name: 'CompanySetup',
      title: 'Company Setup',
      index: 26,
      permission: [
        'Menu',
        'Activation read',
        'Activation update',
        'Configuration read',
        'Configuration update',
        'Ip whitelist read',
        'Location read',
      ],
    },

    {
      name: 'Location',
      title: 'Location',
      index: 27,
      permission: ['Location create', 'Location store', 'Location edit', 'Location update', 'Location delete'],
    },

    { name: 'ApiSetup', title: 'Api Setup', index: 28, permission: ['Read'] },

    { name: 'Claim', title: 'Claim', index: 29, permission: ['Read', 'Create', 'Update', 'Delete'] },

    { name: 'Payment', title: 'Payment', index: 30, permission: ['Read', 'Create', 'Update', 'Delete'] },

    { name: 'Visit', title: 'Visit', index: 31, permission: ['Menu', 'Read', 'Update', 'View'] },

    {
      name: 'Support',
      title: 'Support',
      index: 32,
      permission: ['Support menu', 'Support read', 'Support create', 'Support reply', 'Support delete'],
    },
  ];
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

  /*   <div>
                    <LabelStyle>Images</LabelStyle>
                </div> */

                 
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
      {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}
        {/* <Grid item xs={12} md={6}>
          <Box>
            <div>
              <LabelStyle>Module Permissions</LabelStyle>
            </div>
            <Card sx>
              <Box sx={{ pt: 2 }}>
                <Tabs
                  value={valueIndex}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  {panelTabs.map((panels) => (
                    <Tab key={panels} label={panels.title} {...a11yProps(panels.index)} />
                  ))}
                </Tabs>

                {panelTabs.map((panels) => (
                  <TabPanel key={panels} value={valueIndex} index={panels.index}>
            
                    {panels.permission.map((option) => (
                      <FormControlLabel
                        key={option.permission}
                        label={option}
                        control={<Checkbox />}
                        sx={{ color: 'text.secondary' }}
                      />
                    ))}{' '}
            
                  </TabPanel>
                ))}
              </Box>
            </Card>
          </Box>
        </Grid> */}
        <Grid item xs={12} md={12} sx={{m:5}}>
          <div>
            <LabelStyle>Fill Up</LabelStyle>
          </div>
          <Card
            sx={{
              p: '1rem',
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <RHFTextField name="name" label="Full Name" />
            <RHFTextField type="number" name="phoneNumber" label="Phone Number" />
            <RHFTextField name="address" label="Address" />
            <RHFTextField name="email" label="Email Address" />
            <RHFSelect name="maritalStatus" label="Marital Status" placeholder="Marital Status">
              <option value="" />
              {_maritalStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </RHFSelect>

           
            <DatePicker
              name="dateOfBirth"
              disableFuture
              label="Date of Birth"
              // format="MM/DD/YYYY"
              inputFormat="MM/dd/yyyy"
              openTo="year"
              views={['year', 'month', 'day']}
              value={bdate}
              onChange={(newBdate) => {
               setBdate(newBdate);
              }}
              renderInput={(params) => <TextField {...params}  />}
               />
  


            <RHFSelect name="gender" label="Gender">
              <option value="" />
              {_gender.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </RHFSelect>
            {/* <RHFSelect name="bloodType" label="Blood Type" placeholder="Blood Type">
              <option value="" />
              {_bloodType.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </RHFSelect> */}
            <RHFSelect name="religion" label="Religion" placeholder="Religion">
              <option value="" />
              {_religion.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </RHFSelect>
            {/* <RHFSelect name="country" label="Country" placeholder="Country">
              <option value="" />
              {countries.map((option) => (
                <option key={option.code} value={option.label}>
                  {option.label}
                </option>
              ))}
            </RHFSelect> */}
          </Card>
          <div>
            <LabelStyle sx={{ mt: 3 }}>Management</LabelStyle>
          </div>
          <Card
            sx={{
              p: '1rem',
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <RHFSelect name="role" label="Role" placeholder="Role">
                <option value="" />
                {rolesArr.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="designation" label="Designation">
                <option value="" />
                {designationsArr.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="department" label="Department">
                <option value="" />
                {departmentsArr.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </RHFSelect>
            </Box>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFSelect name="shift" label="Shift" placeholder="Shift">
                <option value="" />
                {shiftsArr.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField type="number" name="basicSalary" label="Basic Salary" />
            </Box>
          </Card>
          <div>
            <LabelStyle sx={{ mt: 3 }}>Account</LabelStyle>
          </div>
          <Card
            sx={{
              p: '1rem',
              mb: '2rem',
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <RHFTextField
              InputAdornment
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword1(!showPassword1)} edge="end">
                      <Iconify icon={showPassword1 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showPassword1 ? 'text' : 'password'}
              name="password"
              label="Password"
            />
            <RHFTextField
              InputAdornment
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                      <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showPassword2 ? 'text' : 'password'}
              name="confirmPassword"
              label="Confirm Password"
            />
          </Card>
        </Grid>

   
      </Grid>
      <Stack alignItems="flex-end" sx={{ mb: 8 }}>
        {/*    /*  sx={{ p: '1rem', position: 'sticky', bottom: 0, zIndex: 1, backdropFilter: 'blur(10px)'}}> */}
        <LoadingButton
          ref={formRef}
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ display: 'none' }}
        />
      </Stack>
    </FormProvider>
  );
}
