import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const UpdateOrder = createAsyncThunk('order/update', async (payload) => {
  console.log('HERE');
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  try {
    const response = await V4axios.post('/api/order/update/information', payload);
    // dispatch(slice.actions.getOrderSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
});

// export function UpdateOrder(payload) {
//   const { accessToken } = localStorage;
//   V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await V4axios.post('/api/order/update/information', payload);
//       dispatch(slice.actions.getOrderSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

const initialState = {
  isLoading: false,
  error: null,
  orders: { byId: {}, allIds: [] },
  ordersArr: [],
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
  name: 'adminOrder',
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
    getOrderSuccess(state, action) {
      const { data, total, ccc } = action.payload;
      state.isLoading = false;
      state.orders.byId = objFromArray(data);
      state.orders.allIds = Object.keys(state.orders.byId);
      state.ordersArr = data;
      state.totalData = data.length;
      state.ccc = ccc;
      console.log(action.payload);
    },
  },
  extraReducers: {
    [UpdateOrder.fulfilled]: (state, action) => {
      console.log('Action payload: ', action.payload);
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
/* export const {  } = slice.actions; */
// ----------------------------------------------------------------------

export function getAllOrders(payload) {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.post('/api/orders/all', payload);
      dispatch(slice.actions.getOrderSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
