import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home/Home";

import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";
import About from "../pages/About/About";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyParcels from "../Components/MyParcels/MyParcels";
import Pricing from "../pages/Pricing/Pricing";
import Services from "../pages/Services/Services";

import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Payment/PaymentHistory";
import ApproveRiders from "../pages/ApproveRiders/ApproveRiders";
import CurrentRiders from "../pages/CurrentRiders/CurrentRiders";
import ManageUsers from "../pages/ManageUsers/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,

      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenters.json')
          .then(res => res.json()),
      },
      {
        path: '/rider',
        element: <PrivateRoute><Rider></Rider></PrivateRoute>,
        loader: () => fetch('/serviceCenters.json')
          .then(res => res.json())

      }, {
        path: '/send-parcel',
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
        loader: () => fetch('/serviceCenters.json')
          .then(res => res.json())
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/pricing',
        element: <Pricing></Pricing>,
        loader: () => fetch('/serviceCenters.json')
          .then(res => res.json()),
      }, {
        path: '/services',
        element: <Services></Services>
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/register',
        Component: Register

      }, {
        path: '/login',
        Component: Login
      }
    ]
  }
  , {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels
      },

      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path:'approve-riders',
        Component:ApproveRiders
      },{
        path:'current-riders',
        Component:CurrentRiders
      },
      {
        path:'manage-users',
        Component:ManageUsers
      }
    ]
  }
]);