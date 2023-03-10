import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import BatibootLayout from '../layouts/batiboot';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN_BATIBOOT,PATH_AFTER_LOGIN_BATIBOOT_AGENT,PATH_AFTER_LOGIN_BATIBOOT_USER, } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register /> 
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password/:token/:email', element: <NewPassword /> },
        { path: 'verify/:token/:email', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    /*
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },
        { path: 'sample/:id', element: <Sample /> },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },
    */

  

    {
      path: 'agent',
      element: (
        <AuthGuard>
          <BatibootLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN_BATIBOOT_AGENT} replace />, index: true },
        { path: 'dashboard', element: <RoleBasedGuard accessibleRoles={['agent']}>
           <GeneralDashApp /> 
         </RoleBasedGuard>
         },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/batiboot/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
           /*  { path: ':id', element: <InvoiceDetails /> }, */
            { path: ':id/edit', element: <InvoiceList /> },
            { path: 'create', element: <InvoiceList /> }, 
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/batiboot/user/designation" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'account', element: <UserAccount /> },
            { path: 'designation', element: <DesignationList /> },
            { path: 'department', element: <DepartmentList /> },
            { path: 'list', element: <UserList /> },
            { path: 'roles', element: <UserRoleList /> },

          ]
        },
        {
          path: 'order',
          children: [
            { element: <Navigate to="/batiboot/order/list" replace />, index: true },
            { path: 'list', element: <OrderList /> },
            { path: 'create', element: <OrderList /> },
            { path: 'tracking', element: <Tracking /> },  
            { path: 'createTracking', element: <Tracking /> },  
          ]
        },
        {
          path: 'inquire',
          children: [
            { element: <Navigate to="/batiboot/inquire/list" replace />, index: true },
            { path: 'list', element: <InquireQuotation /> },
            { path: 'create', element: <InquireQuotation /> }, 
          ]
        },
        {
          path: 'help',
          children: [
            { element: <Navigate to="/batiboot/help/faq" replace />, index: true },
            { path: 'faq', element: <HelpAssistance /> },
          ]
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/batiboot/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'rules', element: <Rules />
        }
      ]
    },

    {
      path: 'user',
      element: (
        <AuthGuard>
          <BatibootLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN_BATIBOOT_USER} replace />, index: true },
        { path: 'dashboard', element: <RoleBasedGuard accessibleRoles={['user/dashboard',]}>
           <GeneralDashAppUser /> 
         </RoleBasedGuard>
         },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/batiboot/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
           /*  { path: ':id', element: <InvoiceDetails /> }, */
            { path: ':id/edit', element: <InvoiceList /> },
            { path: 'create', element: <InvoiceList /> }, 
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/batiboot/user/designation" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'account', element: <UserAccount /> },
            { path: 'designation', element: <DesignationList /> },
            { path: 'department', element: <DepartmentList /> },
            { path: 'list', element: <UserList /> },
            { path: 'roles', element: <UserRoleList /> },

          ]
        },
        {
          path: 'order',
          children: [
            { element: <Navigate to="/batiboot/order/list" replace />, index: true },
            { path: 'list', element: <OrderListUser /> },
            { path: 'create', element: <OrderListUser /> },
            { path: 'tracking', element: <Tracking /> },  
            { path: 'createTracking', element: <Tracking /> },  
          ]
        },
        {
          path: 'inquire',
          children: [
            { element: <Navigate to="/batiboot/inquire/list" replace />, index: true },
            { path: 'list', element: <InquireQuotationUser /> },
            { path: 'create', element: <InquireQuotationUser  /> }, 
          ]
        },
        {
          path: 'help',
          children: [
            { element: <Navigate to="/batiboot/help/faq" replace />, index: true },
            { path: 'faq', element: <HelpAssistance /> },
          ]
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/batiboot/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'rules', element: <Rules />
        }
      ]
    },

    {
      path: 'admin',
      element: (
        <AuthGuard>
          <BatibootLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN_BATIBOOT} replace />, index: true },
        { path: 'dashboard', element: <RoleBasedGuard accessibleRoles={['admin/dashboard']}>
           <GeneralDashApp /> 
         </RoleBasedGuard>
         },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/batiboot/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
           /*  { path: ':id', element: <InvoiceDetails /> }, */
            { path: ':id/edit', element: <InvoiceList /> },
            { path: 'create', element: <InvoiceList /> }, 
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/batiboot/user/designation" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'account', element: <UserAccount /> },
            { path: 'designation', element: <DesignationList /> },
            { path: 'department', element: <DepartmentList /> },
            { path: 'list', element: <UserList /> },
            { path: 'roles', element: <UserRoleList /> },

          ]
        },
        {
          path: 'order',
          children: [
            { element: <Navigate to="/batiboot/order/list" replace />, index: true },
            { path: 'list', element: <OrderList /> },
            { path: 'create', element: <OrderList /> },
            { path: 'tracking', element: <Tracking /> },  
            { path: 'createTracking', element: <Tracking /> },  
          ]
        },
        {
          path: 'inquire',
          children: [
            { element: <Navigate to="/batiboot/inquire/list" replace />, index: true },
            { path: 'list', element: <InquireQuotation /> },
            { path: 'create', element: <InquireQuotation /> }, 
          ]
        },
        {
          path: 'help',
          children: [
            { element: <Navigate to="/batiboot/help/faq" replace />, index: true },
            { path: 'faq', element: <HelpAssistance /> },
          ]
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/batiboot/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'rules', element: <Rules />
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Home2 />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'services', element: < Services/>},
        { path: 'freight-calculator', element: <FreightCalulator /> },
        { path: 'home2', element: <Home2/> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
// BATIBOOT 

// USER 

const UserAccount = Loadable(lazy(() => import('../pages/batiboot/User&Role/UserAccount')));
const UserProfile = Loadable(lazy(() => import('../pages/batiboot/User&Role/UserProfile')));

// DASHBOARD
const GeneralDashApp = Loadable(lazy(() => import('../pages/batiboot/GeneralDashboard')))
const GeneralDashAppUser = Loadable(lazy(() => import('../pages/batiboot/GeneralDashboardUser')))
const InvoiceList = Loadable(lazy(() => import('../pages/batiboot/GeneralInvoice')))

/* Invoice */
const InvoiceDetails = Loadable(lazy(() => import('../pages/batiboot/GeneralInvoiceCreate')))

const InvoiceCreate = Loadable(lazy(() => import('../pages/batiboot/GeneralInvoiceCreate')))
/* USER AND ROLES */

const UserRoleList = Loadable(lazy(() => import('../pages/batiboot/User&Role/UserRole')))
const UserList = Loadable(lazy(() => import('../pages/batiboot/User&Role/UserList')));
const DepartmentList = Loadable(lazy(() => import('../pages/batiboot/User&Role/UserDepartment')))
const DesignationList = Loadable(lazy(() => import('../pages/batiboot/User&Role/UserDesignation')))

/* ORDER LIST */
const OrderListUser = Loadable(lazy(() => import('../pages/batiboot/Order/OrderListUser')))
const OrderList = Loadable(lazy(() => import('../pages/batiboot/Order/OrderList')))
const Tracking = Loadable(lazy(() => import('../pages/batiboot/Tracking/ShipmentTracking')))

/* Inquire Quotation */

const InquireQuotation = Loadable(lazy(() => import('../pages/batiboot/Quotation/InquiryAndQuotation')))
const InquireQuotationUser = Loadable(lazy(() => import('../pages/batiboot/Quotation/InquiryAndQuotationUser')))

/* HELP FAQs */
const HelpAssistance = Loadable(lazy(() => import('../pages/batiboot/HelpAssistance')))
/* RULES AND REGULATION */
const Rules = Loadable(lazy(() => import('../pages/batiboot/RulesAndRegulations')))
/* MAIL MESSAGE */

const Message = Loadable(lazy(() => import('../pages/batiboot/Message')))
/* const InboundLogistics = Loadable(lazy(() => import('../pages/batiboot/GeneralInvoice')))
const OutboundLogistics = Loadable(lazy(() => import('../pages/batiboot/GeneralInvoice'))) */

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));
const Sample = Loadable(lazy(() => import('../pages/dashboard/Sample')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// INVOICE

/* const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit'))); */

// BLOG
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// USER
// const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
/* const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList'))); */
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// APP
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// TEST RENDER PAGE BY ROLE
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const Services = Loadable(lazy(() => import('../pages/Services')))
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Home2 = Loadable(lazy(() => import('../pages/Home2')));
const FreightCalulator = Loadable(lazy(() => import('../pages/FreightCalculator')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
