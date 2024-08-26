import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import Routes from "../../utils/AppRoutes";
import { ApppAssets } from "../../utils/AppAssets";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import useAuth from "../../hooks/useAuth";
import AppRoutes from "../../utils/AppRoutes";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, signOut } = useAuth();

  // Handle SIGNOUT or LOGOUT
  const handleLogout = () => {
    signOut();
    dispatch(logout());
    navigate(AppRoutes.SIGNIN, { replace: true });
  };

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between pb-10"
      >
        <div className="flex lg:flex-1">
          <Link to={Routes.HOME} className="-m-1.5 p-1.5">
            <img alt="logo" src={ApppAssets.LOGO} className="h-12 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            to={Routes.HOME}
            className="text-md font-medium leading-6 text-gray-900 hover:text-primary"
          >
            Home
          </Link>
          <Link
            to={Routes.CARS}
            className="text-md font-medium leading-6 text-gray-900 hover:text-primary"
          >
            Rent a Car
          </Link>

          <Link
            to={Routes.ABOUT_US}
            className="text-md font-medium leading-6 text-gray-900 hover:text-primary"
          >
            About us
          </Link>
          <Link
            to={Routes.DASHBOARD}
            className="text-md font-medium leading-6 text-gray-900 hover:text-primary"
          >
            Dashboard
          </Link>
        </PopoverGroup>

        {user ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton>
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-300">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Account settings
                    </a>
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to={Routes.SIGNIN}
              className="text-md font-medium leading-6 text-gray-900 hover:text-primary"
            >
              <button
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 hover:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                Signin
              </button>
            </Link>
          </div>
        )}
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to={Routes.DASHBOARD} className="-m-1.5 p-1.5">
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to={Routes.HOME}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-primary hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to={Routes.CARS}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-primary hover:bg-gray-50"
                >
                  Rent a Car
                </Link>

                <Link
                  to={Routes.ABOUT_US}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-primary hover:bg-gray-50"
                >
                  About us
                </Link>
                <Link
                  to={Routes.DASHBOARD}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-primary hover:bg-gray-50"
                >
                  Dashboard
                </Link>
              </div>
              <div className="py-6">
                <Link
                  to={Routes.CART}
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-full hover:bg-gray-50"
                >
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
