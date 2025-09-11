import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const userData = useSelector((store) => store.user);
  if (!userData?._id) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  const userData = useSelector((store) => store.user);

  return (
    <Routes>
      {/* Root "/" redirects based on login */}
      <Route
        path="/"
        element={
          userData?._id ? <Navigate to="/feed" /> : <Navigate to="/login" />
        }
      />

      {/* Login route */}
      <Route
        path="/login"
        element={userData?._id ? <Navigate to="/feed" /> : <Login />}
      />

      {/* Signup route */}
      <Route
        path="/signup"
        element={userData?._id ? <Navigate to="/feed" /> : <Signup />}
      />

      {/* Body wrapper for protected pages */}
      <Route
        path="/"
        element={<Body />}
      >
        <Route
          path="feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="connections"
          element={
            <ProtectedRoute>
              <Connections />
            </ProtectedRoute>
          }
        />
        <Route
          path="requests"
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
