const ROUTES = {
  HOME: "/",
  CARS: "/cars",
  CAR_DETAILS: (id = ":id") => `/car/${id}`,
  RENT_CAR: (id = ":id") => `/car/rent-car/${id}`,
  ABOUT_US: "/about-us",
  CART: "/cart",
  DASHBOARD: "dashboard",

  // DASHBOARD: (role: string) => `/car/${role}`,

  // ADMIN
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "dashboard",
  ADMIN_CARS: "cars",
  ADMIN_ADD_CAR: "add-car",
  ADMIN_BOOKING: "bookings",
  ADMIN_RETURN_CAR: "return-car",

  // USER
  USER: "/user",
  USER_DASHBOARD: "dashboard",
  USER_MY_BOOKING: "my-booking",

  CHECKOUT: "/checkout",
  ORDER_SUCCESS: "/order-success",

  SIGNIN: "/signin",
  SIGNUP: "/signup",
};

export default ROUTES;
