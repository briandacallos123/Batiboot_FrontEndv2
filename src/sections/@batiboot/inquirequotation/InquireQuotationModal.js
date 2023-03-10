import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDispatch } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment } from '@mui/material';
import { fetchData } from '../../../redux/slices/adminQuotation';
// routes
import { PATH_DASHBOARD, PATH_BATIBOOT } from '../../../routes/paths';
import useAuth from '../../../hooks/useAuth';
// import {  } from '../../../redux/slices/adminQuotation';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
//
import InquireQuotationModalAddress from './InquireQuotationModalAddress';

// ----------------------------------------------------------------------

const GENDER_OPTION = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

// const CATEGORY_OPTION = [
//   { group: 'Category 1',
//       classify: ['Home & Garden', 'Gift & Crafts', 'Beauty & Personal Use', 'Electrical Equipment',
//       'Fashion Accessories', 'Home Appliance', 'Luggage, Bags & Cases', 'Power Transmission', 'Tools & Hardware', 'Sports Entertainment']
//   },
//   { group: 'Category 2', classify: ['Apparel', 'Packaging & Printing', 'Liquid & Chemicals', 'Fabric & Textile',
//     'Food & Beverages', 'Textiles', 'Machinery', 'Renewable Energy', 'School & Office Supplies', 'Toys & Hobbies'
//   ]},
//   { group: 'Category 3', classify: ['Furniture', 'Plants & Agriculture', 'Consumer Electronics, Safety & Security', 'Fabrication',
//     'Health & Medical', 'Lights & Lightning', 'Vehicle Parts & Accessories', 'Rubber & Plastics', 'Shoes & Accessories', 'Jewelries'
//   ]},
// ];

const SERVICE_OPTION = [
  'Product Sourcing',
  'Importing',
  'Private Label',
  'Warehousing',
  'Fulfillment',
  'Product Rebranding',
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
  formRef: PropTypes.any,
  handleCloseModal: PropTypes.func,
};

export default function ProductNewEditForm({
  isEdit,
  currentProduct,
  formRef,
  formRefDraft,
  handleCloseModal,
  dataEdit,
  utils,
}) {
  const navigate = useNavigate();
  const { createQuotation, user, updateQuotation, createDraft } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [rawFile, setrawFiles] = useState(null);
  const [NewrawFile, setNewrawFile] = useState(null);
  const [isEmptyFields, setIsEmptyFields] = useState(false);
  const dispatch = useDispatch();

  const NewProductSchema = Yup.object().shape({
    // this is required to comment to force form fields to accept empty values.
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    // price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      email: dataEdit?.email || '',
      id: dataEdit?.id || '',
      name: dataEdit?.product_name || '',
      description: dataEdit?.description || '',
      imagesDelete: [],
      NewImage: [],
      images: dataEdit?.attachments || [],
      address_from: dataEdit?.address_from || '',
      address_to: dataEdit?.address_to || '',
      contact: dataEdit?.contact_number || '',
      // code: currentProduct?.code || '',
      // sku: currentProduct?.sku || '',
      price: dataEdit?.price || 0,
      // priceSale: currentProduct?.priceSale || 0,
      // tags: currentProduct?.tags || [TAGS_OPTION[0]],
      // inStock: true,
      // taxes: true,
      // gender: currentProduct?.gender || GENDER_OPTION[2].value,
      // category: currentProduct?.category || SERVICE_OPTION[0],
      quantity: dataEdit?.quantity || 0,
      service: dataEdit?.services || '',
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataEdit]
  );

  // if (isEdit) {
  //   console.log('EDIT: ', defaultValues);
  // }

  const forceFieldsToRequired = isEmptyFields ? NewProductSchema : '';

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

  const handleEditSubmit = async (data) => {
    // console.log('VALUES: ', values);
    setLoadingSend(true);
    try {
      const form = new FormData();
      Object.entries(data).map(([key, value]) => {
        if (key !== 'images' && key !== 'NewImage') {
          const datKey = Array.isArray(value) ? `${key}[]` : key;
          form.append(datKey, value);
        }
        return true;
      });
      NewrawFile?.map((file) => form.append('NewImage[]', file));
      await updateQuotation(form);
      setLoadingSend(false);
      /* window.location.reload(); */
      // utils();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveAsDraft = async (data) => {
    // return;
    setLoadingSave(true);

    try {
      const form = new FormData();
      form.append('email', user?.email);
      form.append('id', user?.id);
      form.append('name', data?.name || '');
      // form.append('product', data.name);
      form.append('description', data.description);
      // form.append('code', data.code);
      // form.append('sku', data.sku);
      form.append('price', data.price);
      // form.append('priceSale', data.priceSale);
      // form.append('tags', data.tags);
      // form.append('inStock', data.inStock);
      // form.append('taxes', data.taxes);
      form.append('contact_number', data.contact_number);
      form.append('address_from', values.invoiceFrom.name);
      form.append('address_to', values.invoiceTo.name);
      form.append('quantity', data.quantity);
      form.append('services', data.service);
      rawFile?.map((file) => form.append('images[]', file));
      await createDraft(form);
      reset();
      setLoadingSave(true);
      handleCloseModal();
      enqueueSnackbar('Created Draft Successfully');
      utils();
      //  navigate(PATH_BATIBOOT.invoice.list);
      //   console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAndSend = async (data) => {
    /* console.log("woooooooo", getValues("images"),user.email,user.id); */

    try {
      const form = new FormData();
      form.append('email', user?.email);
      form.append('id', user?.id);
      form.append('name', data?.name || '');
      // form.append('product', data.name);
      form.append('description', data.description);
      // form.append('code', data.code);
      // form.append('sku', data.sku);
      form.append('price', data.price);
      // form.append('priceSale', data.priceSale);
      // form.append('tags', data.tags);
      // form.append('inStock', data.inStock);
      // form.append('taxes', data.taxes);
      form.append('contact_number', data.contact_number);
      form.append('address_from', values.invoiceFrom.name);
      form.append('address_to', values.invoiceTo.name);
      form.append('quantity', data.quantity);
      form.append('services', data.service);
      rawFile?.map((file) => form.append('images[]', file));
      console.log(data);

      let isEmpty = 0;

      form.forEach((item) => {
        if (item.length === 0) {
          alert('All fields are required');
          isEmpty = 1;
        }
      });

      if (isEmpty === 0) {
        await createQuotation(form);
        utils();
        enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
        reset();
        handleCloseModal();
        setLoadingSend(false);
      }

      // window.location.reload();

      /*    navigate(PATH_BATIBOOT.invoice.list);
      console.log(JSON.stringify(newInvoice, null, 2)); */
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setrawFiles(acceptedFiles);
      setNewrawFile(acceptedFiles);
      const NewImages = values.NewImage || [];
      const images = values.images || [];
      if (isEdit) {
        setValue('NewImage', [
          ...NewImages,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
        setValue('images', [
          ...images,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
      } else {
        setValue('images', [
          ...images,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
      }
    },
    [setValue, values.images]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
    setValue('NewImage', []);
  };

  const handleRemove = (file) => {
    const value = getValues('imagesDelete');
    let existed = [];
    if (value.length) {
      existed = value.filter((v) => v === file?.id);
    }
    if (existed.length === 0) value.push(file?.id);
    setValue('imagesDelete', value);

    const filteredItemsNew = values.NewImage?.filter((_file) => _file !== file);
    setValue('NewImage', filteredItemsNew);

    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };
  // console.log("default",defaultValues);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ pb: 10 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <InquireQuotationModalAddress isEdit={isEdit} editData={dataEdit} />
              {/* <InquireQuotationModalAddress editData={isEdit && dataEdit} isEdit={isEdit} /> */}

              <RHFTextField name="name" label="Product Name" />

              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFEditor simple name="description" />
              </div>

              <div>
                <LabelStyle>Images Edit</LabelStyle>
                <RHFUploadMultiFile
                  showPreview
                  isEdit={isEdit}
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
                <RHFSelect name="service" label="Services" placeholder="Services">
                  <option value={''} />
                  {SERVICE_OPTION.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField name="quantity" label="Quantities" />

                <RHFTextField
                  name="price"
                  label="Price per piece"
                  placeholder="0.00"
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">???</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField name="email" label="Email Address" />
                <RHFTextField name="contact_number" label="Contact Number" />
              </Stack>
            </Card>
          </Stack>
          <LoadingButton
            color="inherit"
            size="small"
            variant="contained"
            loading={loadingSave && isSubmitting}
            onClick={handleSubmit(handleSaveAsDraft)}
            type="submit"
            sx={{ display: 'none' }}
            ref={formRefDraft}
          />

          <LoadingButton
            size="small"
            variant="contained"
            loading={loadingSend && isSubmitting}
            // handleEditSubmit
            // handleCreateAndSend
            onClick={handleSubmit(isEdit ? handleEditSubmit : handleCreateAndSend)}
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
