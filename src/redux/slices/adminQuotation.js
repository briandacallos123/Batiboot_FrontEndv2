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
  quotations: { byId: {}, allIds: [] },
  quotationsArr: [],
  totalData: 0,
  totalDataPendings: 0,
  totalDataApproved: 0,
  totalDataReceived: 0,
  quotationServices: [],
  ccc: {
    approved: 0,
    cancelled: 0,
    done: 0,
    pending: 0,
    total: 0,
  },
};

const slice = createSlice({
  name: 'adminQuotation',
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

    getQuotationServices(state, action) {
      const { data } = action.payload;
      state.quotationServices = data.services;
    },

    getPendings(state, action){
      const {total} = action.payload;
      state.totalDataPendings = total;
    },

    getApproved(state, action){
      const {total} = action.payload;
      console.log('TOTAL APPROVED' , total)
      state.totalDataApproved = total;
      
    },
    
    getReceived(state, action){
      const {total} = action.payload;
      console.log('TOTAL RECEIVED' , total)
      state.totalDataReceived = total;
      
    },

    // GET QUOTATION SUCCESS
    getQuotationSuccess(state, action) {
      const { data, total, ccc } = action.payload;
      state.isLoading = false;
      state.quotations.byId = objFromArray(data);
      state.quotations.allIds = Object.keys(state.quotations.byId);
      state.quotationsArr = data;
      state.totalData = total;
      state.ccc = ccc;
    },

    // approve quotation
  },
});

// Reducer
export default slice.reducer;
// Actions
/* export const {  } = slice.actions; */
// ----------------------------------------------------------------------

export function getAllQuotations(payload) {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.post('/api/quotations/all', payload);
      dispatch(slice.actions.getQuotationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getQuotationServices() {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/quotations/all/services');
      dispatch(slice.actions.getQuotationServices(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function approveQuotation(payload) {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.post('/api/quotations/approved', payload);
      dispatch(slice.actions.getQuotationSuccess(response.data));
    } catch (err) {
      const errorMessage = err.message;
      if (errorMessage === 'Quotation is already approved.') {
        alert(err.message);
      }
      // alert(err.message);
      dispatch(slice.actions.hasError(err));
    }
  };
}


export function getAllQuotationsData() {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/Get/All/Quotations/Total');
      dispatch(slice.actions.getQuotationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function getAllQuotationsPendings() {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/Get/All/Pending/Quotations/Total');
      dispatch(slice.actions.getPendings(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllQuotationsApproved() {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/Get/All/Approved/Quotations/Total');
      dispatch(slice.actions.getApproved(response.data));
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


