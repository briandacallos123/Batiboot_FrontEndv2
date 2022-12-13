import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// utils
import axios from 'axios';
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

export const UpdateQuotation = createAsyncThunk('quotation/add', async (data) => {
  return data;
});

const initialState = {
  isLoading: false,
  error: null,
  quotations: { byId: {}, allIds: [] },
  quotationsArr: [],
  quotationToEdit: null,
  quotationArrNew: [],
  totalData: 0,
  quotationServices: [],
  totalQuotationStatusArr: [],
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
    getQuotationByUser(state, action) {
      const { data } = action.payload;
      state.quotationToEdit = data;
    },
    getQuotationServices(state, action) {
      const { data } = action.payload;
      state.quotationServices = data.services;
    },

    getTotalQuotationStatusArr(state, action) {
      const { data } = action.payload;
      state.totalQuotationStatusArr = data;
    },

    // GET QUOTATION SUCCESS
    getQuotationSuccess(state, action) {
      const { data, total, ccc } = action.payload;
      state.isLoading = false;
      state.quotations.byId = objFromArray(data);
      state.quotations.allIds = Object.keys(state.quotations.byId);
      state.quotationsArr = data;
      state.quotationArr = data;
      state.totalData = total;
      state.ccc = ccc;
    },

    // updateQuotationArr(state, action) {
    //   const { data } = action.payload;
    //   const newQuotation = [...action.quotationArr, ...data];
    //   state.quotationsArr = newQuotation;
    // },

    // approve quotation
  },
  extraReducers: {
    [UpdateQuotation.fulfilled]: (state, action) => {
      const newQuotationArr = [...state.quotationArr, ...action.payload];
      state.quotationArr = newQuotationArr;
    },
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

export function fetchData(payload) {
  getAllQuotationStatus(payload);
}

// export const updateQuotation = (data) => {
//   console.log('dATA MO: ', data);
//   // dispatch(slice.actions.updateQuotationArr(data));
// };
// export function getQuotationsByUser(payload) {
//   const { accessToken } = localStorage;
//   V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await V4axios.post('/api/quotations/user/get', payload);
//       dispatch(slice.actions.getQuotationByUser(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

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

export function getAllQuotationStatus() {
  const { accessToken } = localStorage;
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/Get/All/Quotations/Status/Total');
      dispatch(slice.actions.getTotalQuotationStatusArr(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
