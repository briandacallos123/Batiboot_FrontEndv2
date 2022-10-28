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
  usersDesignation: { byId: {}, allIds: [] },
  usersDesignationtArr : [],
  totalData:0,
  ccc:{
    active: 0,
    banned: 0,
  },
};

const slice = createSlice({
  name:'adminUsersDesignation',
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
    getUsersDesignationSuccess(state, action) {
      const {data,total,ccc} = action.payload;
      state.isLoading = false;
      state.usersDesignation.byId = objFromArray(data);
      state.usersDesignation.allIds = Object.keys(state.usersDesignation.byId);
      state.usersDesignationArr = data;
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

export function getAllUsersDesignation(payload) {
  const {accessToken} = localStorage
  V4axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   V4axios.defaults.headers.common.x_api_key = process.env.REACT_APP_SECRET_API_KEY;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await V4axios.post('/api/management/designation/list', payload);
      dispatch(slice.actions.getUsersDesignationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

