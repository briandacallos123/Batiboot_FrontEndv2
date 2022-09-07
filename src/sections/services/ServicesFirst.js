import { m } from 'framer-motion';
// @mui
import { Button, Container, Typography, Grid } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(5, 0),
  marginTop: 55,
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

export default function ServicesSecond() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container direction="row">
          <Grid item md={4} paddingX={{ xs: 2, md: 0 }} sx={{ py: 1, color: 'primary.main' }}>
            <m.div variants={varFade().inUp}>
              <Typography variant="h3">QUALITY AND PERFORMANCE AT THE RIGHT PRICE</Typography>
            </m.div>
          </Grid>
          <Grid item md={4} sx={{ px: 2, py: 1 }}>
            <m.div variants={varFade().inUp}>
              <Typography variant="caption">
                送货地址：深圳市宝安区福海街道大洋田社区皓鹏智慧园A栋 1楼自编88号仓 导航地址：大洋田浩鹏智慧园 Delivery
                address: 1 / F, Building A, Hao Peng Wisdom Park, Dayangtian Community, Fuhai Street, Bao'an District,
                Shenzhen Navigation address: Haopeng Wisdom Garden, Dayangtian
                送货地址：深圳市宝安区福海街道大洋田社区皓鹏智慧园A栋 1楼自编88号仓 导航地址：大洋田浩鹏智慧园
                收货时间：周一 至 周六（AM9:00~PM18：00)
              </Typography>
            </m.div>
          </Grid>
          <Grid item md={4} sx={{ px: 2, py: 1 }}>
            <m.div variants={varFade().inUp}>
              <Typography variant="caption">
                送货地址：深圳市宝安区福海街道大洋田社区皓鹏智慧园A栋 1楼自编88号仓 导航地址：大洋田浩鹏智慧园 Delivery
                address: 1 / F, Building A, Hao Peng Wisdom Park, Dayangtian Community, Fuhai Street, Bao'an District,
                Shenzhen Navigation address: Haopeng Wisdom Garden, Dayangtian
              </Typography>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
