// External imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Local imports
import "./App.css";
import Home from "@components/pages/Home/Home.tsx";
import Error from "@pages/Error/Error.tsx";
import MainLayout from "@organisms/MainLayout.tsx";
import Login from "@pages/Login/Login.tsx";
import Profile from "@pages/Profile/Profile.tsx";
import Style from "@pages/Styles/Styles.tsx";
import { RootState } from "@redux/store.ts";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state: RootState) => state.firebase.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home user={user} /> },
        { path: "/profile", element: <Profile user={user} /> },
        { path: "/auth/oauth2/login", element: <Login /> },
        { path: "/styletest", element: <Style /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
