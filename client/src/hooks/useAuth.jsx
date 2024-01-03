import { useReducer, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.utils.js";

const initialState = {
  isAuthenticated: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const { state, dispatch } = useAuth();
  let navigate = useNavigate();

  // export function useProvideAuth() {
  //   const { state, dispatch } = useAuth();
  //   if (!state || !dispatch) {
  //     throw new Error("Invalid state or dispatch from useAuth");
  //   }
  //   let navigate = useNavigate();

  const signin = async (username, password, confirm_password) => {
    try {
      const response = await api.post(`/auth/signin`, {
        username: username,
        password: password,
        confirm_password: confirm_password,
      });
      localStorage.setItem("MernAppUser", JSON.stringify(response.data));
      dispatch({
        type: "LOGIN",
        payload: response.data,
      });
      return response;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  // const signup = async (userData) => {
  //   try {
  //     await api.post(`/auth/signup`, userData);
  //     return await signin(userData.username, userData.password);
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response) {
  //       throw new Error(error.response.data.error);
  //     } else {
  //       throw error;
  //     }
  //   }
  // };

  const signup = async (
    username,
    email,
    password,
    confirm_password, 
    zipcode,
    dog,
    profile_image,
  ) => {
    try {
      await api.post(`/auth/signup`, {
        username: username,
        password: password,
        confirmPassword: confirm_password,
        email: email,
        zipcode: zipcode,
        dogs: dog,
        profile_image: profile_image,
      });
      return await signin(username, password);
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const signout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("MernAppUser"));
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("MernAppUser")) || false;
    if (savedUser) {
      dispatch({
        type: "LOGIN",
        payload: savedUser,
      });
    } else {
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [dispatch]);

  return {
    state,
    getCurrentUser,
    signin,
    signup,
    signout,
  };
}
