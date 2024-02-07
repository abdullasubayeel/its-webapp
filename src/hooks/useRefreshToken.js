import { setCredentials } from "../api/auth/authSlice";
import axios from "../api/axios";
import useAuth from "./useAuth";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        email: response.data?.email,
        userId: response.data?.userId,
      };
    });

    dispatch(setCredentials({ ...response.data }));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
