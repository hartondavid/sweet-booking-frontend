import Login from "./views/Login.js";
import Dashboard from "./views/dashboard/Index.js";
import Cakes from "./views/dashboard/Cakes.js";
import AddEditCake from "./views/dashboard/AddEditCake.js";
import CakeIngredients from "./views/dashboard/CakeIngredients.js";
import StockIngredients from "./views/dashboard/StockIngredients.js";
import AddEditStockIngredient from "./views/dashboard/AddEditStockIngredient.js";
import Reservations from "./views/dashboard/Reservations.js";
import AddReservation from "./views/dashboard/AddReservation.js";
import BoughtCakes from "./views/dashboard/BoughtCakes.js";
import RemainingCakes from "./views/dashboard/RemainingCakes.js";
import Register from "./views/Register.js";
import Users from "./views/dashboard/Users.js";
import AddUser from "./views/dashboard/AddUser.js";
var routes = [
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: <Login />,
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        component: <Register />,
        layout: "/auth",
    },

    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Dashboard,
        layout: "/dashboard",
    },

    {
        path: "/cakes",
        name: "Cakes",
        icon: "ni ni-tv-2 text-primary",
        component: Cakes,
        layout: "/dashboard",
    },

    {
        path: "/addEditCake/:cakeId",
        name: "AddEditCake",
        component: AddEditCake,
        layout: "/dashboard",
    },

    {
        path: "/cakeIngredients",
        name: "CakeIngredients",
        component: CakeIngredients,
        layout: "/dashboard",
    },

    {
        path: "/stockIngredients",
        name: "StockIngredients",
        component: StockIngredients,
        layout: "/dashboard",
    },
    {
        path: "/addEditStockIngredient/:ingredientId",
        name: "AddEditStockIngredient",
        component: AddEditStockIngredient,
        layout: "/dashboard",
    },
    {
        path: "/reservations",
        name: "Reservations",
        component: Reservations,
        layout: "/dashboard",
    },
    {
        path: "/addReservation/:cakeId",
        name: "AddReservation",
        component: AddReservation,
        layout: "/dashboard",
    },

    {
        path: "/boughtCakes",
        name: "BoughtCakes",
        component: BoughtCakes,
        layout: "/dashboard",
    },
    {
        path: "/remainingCakes",
        name: "RemainingCakes",
        component: RemainingCakes,
        layout: "/dashboard",
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
        layout: "/dashboard",
    },
    {
        path: "/addUser",
        name: "AddUser",
        component: AddUser,
        layout: "/dashboard",
    },

]

export default routes;  