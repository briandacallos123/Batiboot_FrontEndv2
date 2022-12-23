import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment } from '@mui/material';
import { useDispatch } from 'react-redux';

import { UpdateOrder } from '../../../../redux/slices/adminOrder';
import { approveQuotation } from '../../../../redux/slices/adminQuotation';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const GENDER_OPTION = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

const SERVICE_OPTION = [
  'Product Sourcing',
  'Importing',
  'Private Label',
  'Warehousing',
  'Fulfillment',
  'Product Rebranding',
];

const TAGS_OPTION = [];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

OrderListModalForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
  formRef: PropTypes.any,
};

export default function OrderListModalForm({
  isEdit,
  currentProduct,
  formRef,
  handleCloseModal,
  data,
  identifier,
  utils,
  modalViewData,
}) {
  const navigate = useNavigate();
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: identifier?.product_name || modalViewData?.product_name || '',
      description: identifier?.description || modalViewData?.description || '',
      images: identifier?.attachments || modalViewData?.attachments || [],
      price: identifier?.price || modalViewData?.price || 0,
      services: identifier?.services || modalViewData?.services || SERVICE_OPTION[0],
      id: identifier?.id || modalViewData?.id || '',
      quantity: identifier?.quantity || modalViewData?.quantity || '',
      contact_number: identifier?.contact_number || modalViewData?.contact_number || '',
      email: identifier?.email || modalViewData?.email || '',
      address_from: identifier?.address_from || modalViewData?.address_from || '',
      address_to: identifier?.address_to || modalViewData?.address_to || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [identifier]
  );

  // from current Product to identifier for edit.
  // const defaultValues = useMemo(
  //   () => ({
  //     name: currentProduct?.name || '',
  //     description: currentProduct?.description || '',
  //     images: currentProduct?.images || [],
  //     code: currentProduct?.code || '',
  //     sku: currentProduct?.sku || '',
  //     price: currentProduct?.price || 0,
  //     priceSale: currentProduct?.priceSale || 0,
  //     tags: currentProduct?.tags || [TAGS_OPTION[0]],
  //     inStock: true,
  //     taxes: true,
  //     gender: currentProduct?.gender || GENDER_OPTION[2].value,
  //     services: currentProduct?.service || SERVICE_OPTION[0],
  //   }),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [currentProduct]
  // );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async () => {
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
    //   navigate(PATH_DASHBOARD.eCommerce.list);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const images = values.images || [];

      setValue('images', [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.images]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };
  const handleSaveAsDraft = async () => {
    setLoadingSave(true);

    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   setLoadingSave(true);
    //   handleCloseModal();
    //   //  navigate(PATH_BATIBOOT.invoice.list);
    //   //   console.log(JSON.stringify(newInvoice, null, 2));
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleCreateAndSend = async () => {
    // console.log('VALUES: ', values);
    // console.log('isEdit: ', isEdit);
    // setLoadingSend(true);

    try {
      if (isEdit) {
        await dispatch(UpdateOrder(values));
      }
      if (!isEdit) {
        // brian dito yung dispatch add orders
        console.log('test');

        await dispatch(approveQuotation(values));
        return;
      }
      // reset();
      // handleCloseModal();
      // utils();
      // enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      /*    navigate(PATH_BATIBOOT.invoice.list);
      console.log(JSON.stringify(newInvoice, null, 2)); */
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ pb: 10 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Product Name" />

              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFEditor simple name="description" />
              </div>

              <div>
                <LabelStyle>Images</LabelStyle>
                <RHFUploadMultiFile
                  showPreview
                  name="images"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  onUpload={() => console.log('ON UPLOAD')}
                />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={2}>
                <RHFTextField type="number" name="quantity" label="Quantities" />

                {/* 
                <RHFTextField name="sku" label="Product SKU" /> */}

                {/*   <div>
                  <LabelStyle>Gender</LabelStyle>
                  <RHFRadioGroup
                    name="gender"
                    options={GENDER_OPTION}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </div> */}

                <RHFSelect name="services" label="Services">
                  {SERVICE_OPTION.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField
                  name="price"
                  label="Price per piece"
                  placeholder="0.00"
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={2}>
                <RHFTextField type="number" name="contact_number" label="Additional Contact number #" />
                <RHFTextField name="email" label="Additional Email" />
              </Stack>
            </Card>
          </Stack>
          {/* <LoadingButton
          color="error"
          size="small"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleCloseModal}
          type='submit'
          sx={{display:'none'}}
          ref={formRef}
        /> */}

          <LoadingButton
            color="inherit"
            size="small"
            variant="contained"
            loading={loadingSave && isSubmitting}
            onClick={handleSubmit(handleSaveAsDraft)}
            type="submit"
            sx={{ display: 'none' }}
            ref={formRef}
          />

          <LoadingButton
            size="small"
            variant="contained"
            loading={loadingSend && isSubmitting}
            onClick={handleSubmit(handleCreateAndSend)}
            type="submit"
            sx={{ display: 'none' }}
            ref={formRef}
          />
        </Grid>
        {/*  <Grid md={12} sx={{ py: 2 ,mt: 4 }}> */}

        {/*     </Grid> */}
      </Grid>
    </FormProvider>
  );
}
