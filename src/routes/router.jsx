import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import { Component } from "react";
import Coverage from "../pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children :[
      {index:true,
        Component: Home,
      
      },
      {
        path:'/coverage',
        Component:Coverage
      }
    ]
  }
]);