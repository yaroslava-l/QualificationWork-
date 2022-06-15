import {
    ADMIN_ROUTE,
    GOODS_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SERVICES_ROUTE,
    PROFILE_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Goods from "./pages/Goods";
import Services from "./pages/Services";
import Profile from "./pages/Profile";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]
export const publicRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: GOODS_ROUTE,
        Component: Goods
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: SERVICES_ROUTE + "/:id",
        Component: Services
    }
]