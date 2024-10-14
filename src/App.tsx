// External imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Local imports
import "./App.css";
import Home from "@components/pages/Home/Home.tsx";
import Error from "@pages/Error/Error.tsx";
import MainLayout from "@organisms/MainLayout.tsx";
import Login from "@pages/Login/Login.tsx";
import Profile from "@pages/Profile/Profile.tsx";
import { auth } from "@utils/auth/firebaseConfig.ts";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store.ts";

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
                { path: "/auth/oauth2/login", element: <Login auth={auth} /> },
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
