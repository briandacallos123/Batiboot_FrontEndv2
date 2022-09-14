import { m } from 'framer-motion';
import * as React from 'react';
// @mui
import { Container, Grid, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { MotionViewport, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(5, 0),
  marginTop: 55,
}));

export default function ServicesSecond(props) {
  const { loading = false } = props;

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container direction="row" columnSpacing={4} rowSpacing={2} paddingRight={{ xs: 0, md: 4 }}>
          <Grid item xs={12} md={4} sx={{ color: 'primary.main' }}>
            <m.div variants={varFade().inUp}>
              <Typography variant="h3">
                {loading ? <Skeleton animation="wave" /> : 'QUALITY AND PERFORMANCE AT THE RIGHT PRICE'}
              </Typography>
            </m.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <m.div variants={varFade().inUp}>
              <Typography variant="caption">
                {loading ? (
                  <Skeleton animation="wave" />
                ) : (
                  `送货地址：深圳市宝安区福海街道大洋田社区皓鹏智慧园A栋 1楼自编88号仓 导航地址：大洋田浩鹏智慧园 Delivery
                address: 1 / F, Building A, Hao Peng Wisdom Park, Dayangtian Community, Fuhai Street, Bao'an District,
                Shenzhen Navigation address: Haopeng Wisdom Garden, Dayangtian
                送货地址：深圳市宝安区福海街道大洋田社区皓鹏智慧园A栋 1楼自编88号仓 导航地址：大洋田浩鹏智慧园
                收货时间：周一 至 周六（AM9:00~PM18：00)`
                )}
              </Typography>
            </m.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <m.div variants={varFade().inUp}>
              <Typography variant="caption">
                {loading ? (
                  <Skeleton animation="wave" />
                ) : (
                  `送货地址：深圳市宝安区福海街道大洋田社区皓鹏智慧园A栋 1楼自编88号仓 导航地址：大洋田浩鹏智慧园 Delivery
                address: 1 / F, Building A, Hao Peng Wisdom Park, Dayangtian Community, Fuhai Street, Bao'an District,
                Shenzhen Navigation address: Haopeng Wisdom Garden, Dayangtian`
                )}
              </Typography>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
