
import { TableRow, TableCell,
          Skeleton, Box } from '@mui/material';



// eslint-disable-next-line
export default function UserTableRow() {


  return (
    <TableRow hover >
      <TableCell padding="checkbox">
          <Skeleton animation="wave" variant='rectangular' sx={{ width: '20px', height: '20px', borderRadius:'5px' }} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton variant='circular' animation="wave" sx={{ width: '40px', height: '40px', mr: 2 }} />
            <Skeleton animation="wave" sx={{ width: '110px', height: '25px' }} />
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            <Skeleton animation="wave" sx={{ width: '390px', height: '25px' }} />
      </TableCell>

      <TableCell align="left">
             <Skeleton animation="wave" sx={{ width: '240px', height: '25px' }} />
      </TableCell>

      <TableCell align="center">
            <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
               <Skeleton variant='circular' animation="wave" sx={{ width: '30px', height: '30px' }} />
            </Box>
      </TableCell>

      <TableCell align="center">
            <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
              <Skeleton animation="wave" sx={{ width: '110px', height: '33px' }} />
            </Box>
      </TableCell>

      <TableCell align="right">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', justifyItems: 'flex-end' }}>
            <Skeleton variant='circular' animation="wave" sx={{ width: '40px', height: '40px' }} />
        </Box>
      </TableCell>
    </TableRow>
  );
}
