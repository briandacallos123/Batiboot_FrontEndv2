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
  designations: { byId: {}, allIds: [] },
  designationsArr : [],
  totalData:0,
  // ccc:{
  //   approved: 0,
  //   cancelled: 0,
  //   done: 0,
  //   pending:0,
  //   total: 0,
  // },
};

const slice = createSlice({
  name:'getDesignation',
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
    getDesignationsSuccess(state, action) {
      const {data,total,ccc} = action.payload;
      state.isLoading = false;
      state.designations.byId = objFromArray(data);
      state.designations.allIds = Object.keys(state.designations.byId);
      state.designationsArr = data;
      state.totalData = data.length;
      // state.ccc  = ccc;
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
/* export const {  } = slice.actions; */
// ----------------------------------------------------------------------

export function getAllDesignations() {
  const {accessToken} = localStorage
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.get('/api/management/designation/all');
      dispatch(slice.actions.getDesignationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

