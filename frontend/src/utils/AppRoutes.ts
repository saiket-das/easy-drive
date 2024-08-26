const AppRoutes = {
  HOME: "/",
  CARS: "/rent-a-car",
  CAR_DETAILS: (id = ":id") => `/car/${id}`,
  // CAR_DETAILS: "/car/:id",
  ABOUT_US: "/about-us",
  CART: "/cart",
  DASHBOARD: "/dashboard",
  CHECKOUT: "/checkout",
  ORDER_SUCCESS: "/order-success",

  SIGNIN: "/signin",
  SIGNUP: "/signup",
};

export default AppRoutes;
