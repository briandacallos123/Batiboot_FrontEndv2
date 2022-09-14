import { Outlet } from 'react-router-dom';
// @mui
import {Typography, Box} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';



// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  display: 'flex', // <--- this is added
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <> 
      <HeaderStyle>
        <Logo />
        <Typography variant="body1"  sx={{ml: 1.5, mt: 1, fontWeight:"bold"}}>Batiboot</Typography>
      </HeaderStyle>
      <Outlet />
    </>
  );
}
