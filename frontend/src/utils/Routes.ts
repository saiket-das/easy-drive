const Routes = {
  HOME: "/",
  ABOUT_US: "/about-us",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: (id = ":id") => `/products/${id}`,
  CART: "/cart",
  DASHBOARD: "/dashboard",
  CHECKOUT: "/checkout",
  ORDER_SUCCESS: "/order-success",
};

export default Routes;
