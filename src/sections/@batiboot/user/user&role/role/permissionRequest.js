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
        {id: 4, name: 'List Invoice', group: 1, groupName: 'Invoice' },
        {id: 5, name: 'Create Invoice', group: 1, groupName: 'Invoice' },
        {id: 6, name: 'Edit Invoice', group: 1, groupName: 'Invoice' },
        {id: 7, name: 'Delete Invoice', group: 1, groupName: 'Invoice' },
       ],

       'Order':[
        {id: 8, name: 'List Order', group: 2, groupName: 'Order' },
        {id: 9, name: 'View Order', group: 2, groupName: 'Order' },
        {id: 10, name: 'Track Order', group: 2, groupName: 'Order' },
        {id: 11, name: 'Delete Order', group: 2, groupName: 'Order' },
        {id: 12, name: 'Edit Order', group: 2, groupName: 'Order' },
       ],

       'Inquire':[
        {id: 13, name: 'List Inquire', group: 3, groupName: 'Inquire' },
        {id: 14, name: 'Create Inquire', group: 3, groupName: 'Inquire' },
        {id: 15, name: 'View Inquire', group: 3, groupName: 'Inquire' },
        {id: 16, name: 'Delete Inquire', group: 3, groupName: 'Inquire' },
        {id: 17, name: 'Edit Inquire', group: 3, groupName: 'Inquire' },
       ],

       'Message':[
        {id: 18, name: 'Message', group: 4, groupName: 'Message' },
       ],

       'User&Role':[
        {id: 19, name: 'Designation', group: 5, groupName: 'User&Role' },
        {id: 20, name: 'Edit Designation', group: 5, groupName: 'User&Role' },
        {id: 21, name: 'Department', group: 6, groupName: 'User&Role' },
        {id: 22, name: 'Edit Department', group: 6, groupName: 'User&Role' },
        {id: 23, name: 'User', group: 6, groupName: 'User&Role' },
        {id: 24, name: 'Create User', group: 6, groupName: 'User&Role' },
        {id: 25, name: 'Edit User', group: 6, groupName: 'User&Role' },
        {id: 26, name: 'Role', group: 6, groupName: 'User&Role' },
        {id: 27, name: 'Edit Role', group: 6, groupName: 'User&Role' },
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