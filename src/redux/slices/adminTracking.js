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
  tracking: { byId: {}, allIds: [] },
  trackingArr: [],
  totalData: 0,
  totalDataReceived: 0,
  totalDataProgress: 0,
  totalDataPreparing: 0,
    ccc: {
    approved: 0,
    cancelled: 0,
    done: 0,
    pending: 0,
    total: 0,
  },
};

const slice = createSlice({
  name: 'adminTracking',
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

     getReceived(state, action){
      const {total} = action.payload;
      state.totalDataReceived = total;
      
    },

    getProgress(state, action){
      const {total} = action.payload;
      state.totalDataProgress = total;
      
    },
    getPreparing(state, action){
      const {total} = action.payload;
      state.totalDataPreparing = total;
      
    },
    // GET QUOTATION SUCCESS
    trackingSuccess(state, action) {
      const { data, total, ccc } = action.payload;
      state.isLoading = false;
      state.tracking.byId = objFromArray(data);
      state.tracking.allIds = Object.keys(state.tracking.byId);
      state.trackingArr = data;
      state.totalData = data.length;
      state.ccc = ccc;
      console.log(action.payload);
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
/* export const {  } = slice.actions; */
// ----------------------------------------------------------------------

export function getAlltracking() {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/Get/All/Shipment');
      console.log('RESPONSE TO', response);
      dispatch(slice.actions.trackingSuccess(response.data));

    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllShipmentReceived() {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/Get/All/Received/Shipment/Total');
      dispatch(slice.actions.getReceived(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllShipmentProgress() {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/Get/All/Progress/Shipment/Total');
      dispatch(slice.actions.getProgress(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllShipmentPreparing() {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/Get/All/Preparing/Shipment/Total');
      dispatch(slice.actions.getPreparing(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// export function deleteInvoice(payload) {
//   const { accessToken } = localStorage;
//   V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await V4axios.post('/api/invoice/delete', payload);
//       dispatch(slice.actions.getInvoiceSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
