import axios from "axios";
import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import ProtectRoutes from "./components/auth/ProtectRoutes";
import { LayoutLoader } from "./components/layout/Loaders";
import { server } from "./constants/config";
import { userExists, userNotExists } from "./redux/reducer/auth";
import { SocketProvider } from "./Socket";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoutes user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoutes user={!user} redirect="/">
                <Login />
              </ProtectRoutes>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectRoutes user={!user} redirect="/">
                <SignUp />
              </ProtectRoutes>
            }
          />

          <Route path="*" element={<NotFound user={user} />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-centre" />
    </BrowserRouter>
  );
};

export default App;
