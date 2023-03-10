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
  quotations: { byId: {}, allIds: [] },
  quotationsArr : [],
  totalData:0,
  ccc:{
    approved: 0,
    cancelled: 0,
    done: 0,
    pending:0,
    total: 0,
  },
};

const slice = createSlice({
  name:'userQuotation',
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
    getQuotationSuccess(state, action) {
      const {data,total,ccc} = action.payload;
      state.isLoading = false;
      state.quotations.byId = objFromArray(data);
      state.quotations.allIds = Object.keys(state.quotations.byId);
      state.quotationsArr = data;
      state.totalData = data.length;
      state.ccc  = ccc;
      console.log(action.payload)
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
/* export const {  } = slice.actions; */
// ----------------------------------------------------------------------

export function getAllQuotations(payload) {
  const {accessToken} = localStorage
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.post('/api/quotations/user/get',payload);
      dispatch(slice.actions.getQuotationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

