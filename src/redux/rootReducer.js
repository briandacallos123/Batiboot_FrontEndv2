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
import userOrderReducer from './slices/userOrder';

import adminDashboardReducer from './slices/adminDashboard';
import userDashboardReducer from './slices/userDashboard';

import adminInvoiceReducer from './slices/adminInvoice';

// For Line Chart Data
import adminDashboardFulfillmentReducer from './slices/adminDashboardFulfillment';
import adminDashboardProductSourcingReducer from './slices/adminDashboardProductSourcing';
import adminDashboardImportingReducer from './slices/adminDashboardImporting';
import adminDashboardWarehousingReducer from './slices/adminDashboardWarehousing';
import adminDashboardProductRebrandingReducer from './slices/adminDashboardProductRebranding';
import adminDashboardPrivateLabelReducer from './slices/adminDashboardPrivateLabel';
// For Line Chart Data

import adminDashboardlatestInquiriesReducer from './slices/adminDashboardLatesInquiries';
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
  userOrder: userOrderReducer,
  adminDashboard: adminDashboardReducer,
  userDashboard: userDashboardReducer,
  adminInvoice: adminInvoiceReducer,
  // For Linechart Data
  adminDashboardFulfillment: adminDashboardFulfillmentReducer,
  adminDashboardProductSourcing: adminDashboardProductSourcingReducer,
  adminDashboardImporting: adminDashboardImportingReducer,
  adminDashboardWarehousing: adminDashboardWarehousingReducer,
  adminDashboardProductRebranding: adminDashboardProductRebrandingReducer,
  adminDashboardPrivateLabel: adminDashboardPrivateLabelReducer,
  // For Linechart Data

  adminDashboardLatesInquiries: adminDashboardPrivateLabelReducer,

});

export { rootPersistConfig, rootReducer };
