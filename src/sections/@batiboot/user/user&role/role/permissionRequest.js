import { useState } from 'react';

export default function usePermissionsRequest(props) {
    const [permissionRequest, setPermissionRequest] = useState(props?.defaultData || 
       {
    'Dashboard':[
        {id: 1, name: 'Admin Dashboard', group: 0, groupName: 'Dashboard', value:'admin/dashboard' },
        {id: 2, name: 'Agent Dashboard', group: 0, groupName: 'Dashboard', value:'agent/dashboard' },
        {id: 3, name: 'User Dashboard', group: 0, groupName: 'Dashboard', value:'user/dashboard' },
       ],

       'Invoice':[
        {id: 4, name: 'User List Invoice', group: 1, groupName: 'Invoice', value:'user/invoice/list' },
        {id: 5, name: 'List Invoice', group: 1, groupName: 'Invoice', value:'admin/invoice/list' },
        {id: 6, name: 'Create Invoice', group: 1, groupName: 'Invoice', value:'admin/invoice/create' },
        {id: 7, name: 'Edit Invoice', group: 1, groupName: 'Invoice', value:'admin/invoice/edit' },
        {id: 8, name: 'Delete Invoice', group: 1, groupName: 'Invoice', value:'admin/invoice/delete' },
       ],

       'Order':[
        {id: 8, name: 'User List Order', group: 2, groupName: 'Order', value:'user/order/list' },
        {id: 9, name: 'User Track Order', group: 2, groupName: 'Order', value:'user/order/track'  },
        {id: 10, name: 'List Order', group: 2, groupName: 'Order', value:'admin/order/list'  },
        {id: 11, name: 'View Order', group: 2, groupName: 'Order', value:'admin/order/view'  },
        {id: 12, name: 'Track Order', group: 2, groupName: 'Order', value:'admin/order/track'  },
        {id: 13, name: 'Delete Order', group: 2, groupName: 'Order', value:'admin/order/delete'  },
        {id: 14, name: 'Edit Order', group: 2, groupName: 'Order', value:'admin/order/edit'  },
       ],

       'Inquire':[
        {id: 15, name: 'User List Inquire', group: 3, groupName: 'Inquire', value:'user/inquire/list' },
        {id: 16, name: 'List Inquire', group: 3, groupName: 'Inquire', value:'admin/inquire/list' },
        {id: 17, name: 'Create Inquire', group: 3, groupName: 'Inquire', value:'admin/inquire/create' },
        {id: 18, name: 'View Inquire', group: 3, groupName: 'Inquire', value:'admin/inquire/view' },
        {id: 19, name: 'Delete Inquire', group: 3, groupName: 'Inquire', value:'admin/inquire/delete' },
        {id: 20, name: 'Edit Inquire', group: 3, groupName: 'Inquire', value:'admin/inquire/edit' },
       ],

       'Message':[
        {id: 21, name: 'User Message', group: 4, groupName: 'Message', value:'user/mail/all' },
        {id: 22, name: 'Message', group: 4, groupName: 'Message', value:'admin/mail/all' },
       ],

       'User&Role':[
        {id: 23, name: 'Designation', group: 5, groupName: 'User&Role', value:'admin/user/designation' },
        // {id: 24, name: 'Edit Designation', group: 5, groupName: 'User&Role', value:'admin/user/designation/edit' },
        {id: 24, name: 'Department', group: 6, groupName: 'User&Role', value:'admin/user/department' },
        // {id: 26, name: 'Edit Department', group: 6, groupName: 'User&Role', value:'admin/user/department/edit' },
        {id: 25, name: 'User', group: 6, groupName: 'User&Role', value:'admin/user/list' },
        // {id: 28, name: 'Create User', group: 6, groupName: 'User&Role', value:'admin/user/create' },
        // {id: 29, name: 'Edit User', group: 6, groupName: 'User&Role', value:'admin/user/edit' },
        {id: 26, name: 'Role', group: 6, groupName: 'User&Role', value:'admin/user/roles' },
        // {id: 31, name: 'Edit Role', group: 6, groupName: 'User&Role', value:'admin/user/roles' },
       ],

  
    });

    const [Category,setCategory] = useState(props?.defaultCategory || [] );
    const [SelectedCategoryTitle,setSelectedCategoryTitle] = useState(props?.defaultSelectedCategoryTitle || 'No Category Selected' );

    const [InMemoSelectedCategory,setInMemoSelectedCategory] = useState(props?.defaultInMemoSelectedCategory || {} );
    const [InMemoryRebuildGroup,setInMemoryRebuildGroup] = useState(props?.defaultInMemoryRebuildGroup || {} );
    const [InMemorySearchGroup,setInMemorySearchGroup] = useState(props?.defaultInMemorySearchGroup || {} );

    return {
        permissionRequest,
        setPermissionRequest,
        Category,
        setCategory,
        SelectedCategoryTitle,
        setSelectedCategoryTitle,
        InMemoSelectedCategory,
        setInMemoSelectedCategory,
        InMemoryRebuildGroup,
        setInMemoryRebuildGroup,
        InMemorySearchGroup,
        setInMemorySearchGroup
    };
} 