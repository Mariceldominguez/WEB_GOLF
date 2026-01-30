import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../pages/home/page"));
const ProductDetail = lazy(() => import("../pages/product/page"));
const CatalogPage = lazy(() => import("../pages/catalog/page"));
const CartPage = lazy(() => import("../pages/cart/page"));
const CheckoutPage = lazy(() => import("../pages/checkout/page"));
const NotFound = lazy(() => import("../pages/NotFound"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/catalogo",
    element: <CatalogPage />,
  },
  {
    path: "/carrito",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/producto/:id",
    element: <ProductDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
