import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
  LINK: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
  CHANGEPASSWORD: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  ACCOUNTCHANGEPASSWORD: (state) => ({
    ...state,
    isAuthenticated: true,
  }),
  CHECKEMAILCODE: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
  VALIDATEUSERPASSWORD: (state) => ({
    ...state,
    isAuthenticated: true,
  }),
  UPDATEPROFILE: (state) => ({
    ...state,
    isAuthenticated: true,
  }),
  NEW_USER_EMAIL_VERIFICATION: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
  RESEND_EMAIL_VERIFICATION: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },

  CREATE_QUOTATION: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  ACCEPT_ORDER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  forgot: () => Promise.resolve(),
  changePassword: () => Promise.resolve(),
  checkEmailCode: () => Promise.resolve(),
  validateUserPassword: () => Promise.resolve(),
  accountChangePassword: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
  newUserEmailVerification: () => Promise.resolve(),
  resendEmailVerification: () => Promise.resolve(),
  createQuotation: () => Promise.resolve(),
  acceptOrder: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-profile', {
            headers: {
              'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
            },
          });
          /* ACCESS TOKEN AS HEADERS */
          /* 'x-access-token' : accessToken,   */
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, pass) => {
    const response = await axios.post('/api/account/login',
      {
        email,
        pass,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,

        },
      }
    );
    const { accessToken, user } = response.data;
    // alert(accessToken)
    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const forgot = async (email) => {
    const response = await axios.post(
      '/api/email/send-link-api',
      {
        email,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
        },
      }
    );
    const user = response.data;

    // alert(user.email)
    // alert(accessToken)
    // setSession(accessToken);

    dispatch({
      type: 'LINK',
      payload: {
        user,
      },
    });
  };

  const validateUserPassword = async (email, password) => {
    const response = await axios.post(
      '/api/account/validate-user',
      {
        email,
        password,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
        },
      }
    );

    dispatch({
      type: 'VALIDATEUSERPASSWORD',
    });
  };

  const changePassword = async (token, email, password) => {
    const response = await axios.put(
      '/api/account/change-password',
      {
        token,
        email,
        password,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
        },
      }
    );

    dispatch({
      type: 'CHANGEPASSWORD',
    });
  };
  const accountChangePassword = async (email, password) => {
    const response = await axios.put(
      '/api/account/change-password',
      {
        email,
        password,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
        },
      }
    );

    dispatch({
      type: 'ACCOUNTCHANGEPASSWORD',
    });
  };

  const checkEmailCode = async (code) => {
    const response = await axios.post(
      '/api/account/get-verification-code',
      {
        code,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
        },
      }
    );

    const user = response.data;
    dispatch({
      type: 'CHECKEMAILCODE',
      payload: {
        user,
      },
    });
  };

  const updateProfile = async (name, email, phone, photoURL, address) => {
    const response = await axios.put(
      '/api/account/update-profile',
      {
        name,
        email,
        phone,
        photoURL,
        address,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
        },
      }
    );

    const user = response.data;
    dispatch({
      type: 'UPDATEPROFILE',
      payload: {
        user,
      },
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post(
      '/api/account/register',
      {
        email,
        password,
        firstName,
        lastName,
        user_role: 0,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
        },
      }
    );
    const { accessToken, user } = response.data;
    console.log(response.data);
    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });

    setTimeout(() => {
      window.location.href = response.data;
    }, 2000);
    // window.open(response.data);
  };

  const resendEmailVerification = async (email) => {
    const response = await axios.post(
      '/api/account/resend-email',
      {
        email,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
        },
      }
    );
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'RESEND_EMAIL_VERIFICATION',
      payload: {
        user,
      },
    });
  };

  const newUserEmailVerification = async (token, email, code) => {
    const response = await axios.post(
      '/api/account/validate-user-email',
      {
        email,
        token,
        code,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
        },
      }
    );
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'NEW_USER_EMAIL_VERIFICATION',
      payload: {
        user,
      },
    });
  };

  const createQuotation = async (data) => {
    const response = await axios.post(
      '/api/quotations',
      
       
      data,
      

     
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
          // 'Access-Control-Allow-Origin': '*',
          // "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE" ,
          // 'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        },
      
      }
    );
    const user = response.data;

    // alert(user.email)
    // alert(accessToken)
    // setSession(accessToken);

    dispatch({
      type: 'CREATE_QUOTATION',
      payload: {
        user,
      },
    });
  };

  const acceptOrder = async (data) => {
    const response = await axios.post(
      '/api/orders',
      
       
      data,
      

     
      {
        headers: {
          'x-api-key': process.env.REACT_APP_SECRET_API_KEY,
          // 'Access-Control-Allow-Origin': '*',
        },
      }
    );
    const user = response.data;

    // alert(user.email)
    // alert(accessToken)
    // setSession(accessToken);

    dispatch({
      type: 'ACCEPT_ORDER',
      payload: {
        user,
      },
    });
  };



  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        forgot,
        changePassword,
        checkEmailCode,
        validateUserPassword,
        accountChangePassword,
        updateProfile,
        newUserEmailVerification,
        resendEmailVerification,
        createQuotation,
        acceptOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
