// @mui
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Link, Card, CardHeader, Typography, Stack, Skeleton } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import Avatar from '../../../../components/Avatar';
import createAvatar from '../../../../utils/createAvatar';
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

EcommerceLatestProducts.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function EcommerceLatestProducts({ title, subheader, list, ...other }) {
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
  // useEffect(() => {
  //   setOrdersData(list);
  // }, [list]);

  return (
    <Box {...other}>
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {/* {showSkel
            ? list.map((product) => <ProductItem key={product.id} product={product} />)
            : [...Array(list.length)].map((i) => (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  sx={{ width: 'auto', height: '30px', borderRadius: '5px' }}
                />
              ))} */}
          {list && list.map((product) => <ProductItem key={product.id} product={product} />)}
        </Stack>
      </Scrollbar>
    </Box>
  );
}

// ----------------------------------------------------------------------

function ProductItem({ product }) {
  const { product_name: productName, updated_at: updateAt } = product;
  // const { pName, orderNumber, inquireQuoStatus } = product;
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={productName} color={createAvatar(productName).color} sx={{ mr: 1 }}>
        {createAvatar(productName).name}
      </Avatar>
      <Box sx={{ flexGrow: 0.97 }}>
        <Link sx={{ color: 'text.primary', typography: 'subtitle2', textTransform: 'capitalize' }}>{productName}</Link>

        <Stack direction="row">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {updateAt}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
