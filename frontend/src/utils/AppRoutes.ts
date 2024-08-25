const AppRoutes = {
  HOME: "/",
  CARS: "/rent-a-car",
  CAR_DETAILS: (id = ":id") => `/car/${id}`,
  ABOUT_US: "/about-us",
  CART: "/cart",
  DASHBOARD: "/dashboard",
  CHECKOUT: "/checkout",
  ORDER_SUCCESS: "/order-success",
  SIGNIN: "/signin",
};

export default AppRoutes;
