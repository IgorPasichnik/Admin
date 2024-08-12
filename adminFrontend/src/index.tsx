import React from "react";
import { ConfigProvider, theme } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Paths } from "./paths";
import "./index.css";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Auth } from "./features/auth/auth";
import reportWebVitals from "./reportWebVitals";
import { Products } from "./pages/products/Products";
import { AddProduct } from "./pages/add-product/AddProduct";
import { Status } from "./pages/status/Status";
import { Product } from "./pages/product/Product";
import { EditProduct } from "./pages/edit-product/EditProduct";

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Products />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.productAdd,
    element: <AddProduct />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.product}/:id`,
    element: <Product />,
  },
  {
    path: `${Paths.productEdit}/:id`,
    element: <EditProduct />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
