import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';

import adminQuotationsReducer from './slices/adminQuotation';
import adminOrderReducer from './slices/adminOrder';

import getRoleReducer from './slices/getRole';
import getDepartmentReducer from './slices/getDepartment';
import getDesignationReducer from './slices/getDesignation';
import getShiftReducer from './slices/getShift';
import adminUserReducer from './slices/adminUser';
import adminUserDepartmentReducer from './slices/adminUserDepartment';
import adminUserDesignationReducer from './slices/adminUserDesignation';
import adminUserRoleReducer from './slices/adminUserRole';

import userQuotationReducer from './slices/userQuotation';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  
  // Admin
  adminQuotation: adminQuotationsReducer,
  adminOrder: adminOrderReducer,

  // User Mangement
  getRole: getRoleReducer,
  getDepartment: getDepartmentReducer,
  getDesignation: getDesignationReducer,
  getShift: getShiftReducer,
  adminUser: adminUserReducer,
  adminUserDepartment: adminUserDepartmentReducer,
  adminUserDesignation: adminUserDesignationReducer,
  adminUserRole: adminUserRoleReducer,
  userQuotation: userQuotationReducer,
});

export { rootPersistConfig, rootReducer };
