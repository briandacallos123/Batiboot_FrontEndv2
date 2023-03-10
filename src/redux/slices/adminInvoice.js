import { createSlice } from '@reduxjs/toolkit';
// utils
import { /* axios, */ V4axios } from '../../utils/axios';
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
  invoice: { byId: {}, allIds: [] },
  invoiceArr: [],
  totalInvoiceStatusArr: [],
  totalData: 0,
  ccc: {
    approved: 0,
    cancelled: 0,
    done: 0,
    pending: 0,
    total: 0,
  },
};

const slice = createSlice({
  name: 'adminInvoice',
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

    getTotalInvoiceStatusArr(state, action){
      const {data} = action.payload;
      state.totalInvoiceStatusArr = data;
      
    },

    // GET QUOTATION SUCCESS
    getInvoiceSuccess(state, action) {
      const { data, total, ccc } = action.payload;
      state.isLoading = false;
      state.invoice.byId = objFromArray(data);
      state.invoice.allIds = Object.keys(state.invoice.byId);
      state.invoiceArr = data;
      state.totalData = data.length;
      state.ccc = ccc;
      // console.log(action.payload);
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
/* export const {  } = slice.actions; */
// ----------------------------------------------------------------------

export function getAllInvoice(payload) {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.post('/api/invoice/all', payload);
      dispatch(slice.actions.getInvoiceSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllInvoiceStatus() {
  const {accessToken} = localStorage
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/Get/All/Invoice/Total/Status');
      dispatch(slice.actions.getTotalInvoiceStatusArr(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteInvoice(payload) {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.post('/api/invoice/delete', payload);
      dispatch(slice.actions.getInvoiceSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
