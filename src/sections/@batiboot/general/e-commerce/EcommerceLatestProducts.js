// @mui
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Link, Card, CardHeader, Typography, Stack } from '@mui/material';
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

export default function EcommerceLatestProducts({title, subheader, list, ...other}) {

  
  return (
    
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {list && list.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Stack>
        </Scrollbar>
    </Card>
     
  );
}

// ----------------------------------------------------------------------

// ProductItem.propTypes = {
//   product: PropTypes.shape({
//     updated_at: PropTypes.number,
//     product_name: PropTypes.string,
//     // updated_at: PropTypes.string,
//   }),
// };

function ProductItem({ product }) {
  const { product_name:productName,updated_at:updateAt } = product;
  // const { pName, orderNumber, inquireQuoStatus } = product;
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={productName} color={createAvatar(productName).color} sx={{ mr: 1 }}>
        {createAvatar(productName).name}
      </Avatar>
      <Box sx={{ flexGrow: 0.97 }}>
        <Link sx={{ color: 'text.primary', typography: 'subtitle2' ,textTransform:'capitalize'} } >{productName}</Link>

        <Stack direction="row">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {updateAt}
          </Typography>
        </Stack>
      </Box>

      {/* <Label
        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
        color={
          (inquireQuoStatus === 'approved' && 'success') ||
          (inquireQuoStatus === 'received' && 'warning') ||
          (inquireQuoStatus === 'draft' && 'error') ||
          'default'
        }
        sx={{ textTransform: 'capitalize' }}
      >
        {inquireQuoStatus}
      </Label> */}
    </Stack>
  );
}
