import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    ' url(https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 320,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function ServicesHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="Our" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
            <TextAnimate text="Services" sx={{ mr: 2 }} />
          </Box>

          {/* <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium',
              }}
            >
              Let's work together and
              <br /> make awesome site easily
            </Typography>
          </m.div> */}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
