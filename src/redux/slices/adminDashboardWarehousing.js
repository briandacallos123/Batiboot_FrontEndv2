import { createSlice } from '@reduxjs/toolkit';
// utils
import /* axios, */ {V4axios} from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

function objFromArray(array, key = 'id') {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

const initialState = {
  isLoading: false,
  error: null,
  Warehousingdata: { byId: {}, allIds: [] },
  WarehousingArr: [],
  totalData: 0,
  // ccc:{
  //   approved: 0,
  //   cancelled: 0,
  //   done: 0,
  //   pending:0,
  //   total: 0,
  // },
};

const slice = createSlice({
  name:'adminDashboardWarehousing',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET QUOTATION SUCCESS
    getDashboardSuccess(state, action) {
      const {data,total,ccc} = action.payload;
      state.isLoading = false;
      state.Warehousingdata.byId = objFromArray(data);
      state.Warehousingdata.allIds = Object.keys(state.Warehousingdata.byId);
      state.WarehousingArr = data;
      state.totalData = total;
      state.ccc  = ccc;
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
/* export const {  } = slice.actions; */
// ----------------------------------------------------------------------

export function getAllDashboardWarehousing() {
  const {accessToken} = localStorage
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/testing/Warehousing');
      dispatch(slice.actions.getDashboardSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

