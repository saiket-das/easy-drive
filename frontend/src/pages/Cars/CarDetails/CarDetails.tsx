import { Link, useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../../redux/features/car/carApi";
import AppLoading from "../../../components/ui/AppLoading";
import ROUTES from "../../../constants/routes";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: car, isLoading } = useGetSingleCarQuery(id);

  if (isLoading) {
    return (
      <div>
        <AppLoading />
      </div>
    );
  }

  const {
    name,
    description,
    color,
    isElectric,
    status,
    features,
    pricePerHour,
  } = car.data;

  const carColor = color.toLowerCase();
  const colorClass =
    carColor === "black" || carColor === "white"
      ? `bg-${carColor}`
      : `bg-${carColor}-500`;

  const colorClassName = `mt-4 border-2 border-gray-300 ${colorClass} relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full`;
  const isButtonDisable = status === "unavailable" ? true : false;

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <Link
                  to={ROUTES.CARS}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  Cars
                </Link>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm font-medium text-gray-500 hover:text-gray-600">
              {name}
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              alt={name}
              src="https://images.unsplash.com/photo-1538592116845-119a3974c958?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt={name}
                src="https://images.unsplash.com/photo-1538592116845-119a3974c958?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt={name}
                src="https://images.unsplash.com/photo-1538592116845-119a3974c958?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              alt={name}
              src="https://images.unsplash.com/photo-1538592116845-119a3974c958?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ৳{pricePerHour}
              <span className="text-xl font-light text-gray-500">
                /per hour
              </span>
            </p>

            <div className="mt-10">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <div
                  className={colorClassName}
                  //   className={`mt-4 border-2 ${colorClassName} bg-red-500 relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full`}
                />
              </div>
              <div className="mt-4">
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {isElectric === true ? "Electric" : "Non electric"}
                </span>
              </div>

              <Link
                to={ROUTES.RENT_CAR(id)}
                className="flex items-center flex-col sm:flex-row justify-center mt-6"
              >
                <button
                  disabled={isButtonDisable}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                    isButtonDisable
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-600"
                  }`}
                >
                  {isButtonDisable ? "Unavailable" : "Rent car"}
                </button>
              </Link>
            </div>
          </div>

          {/* Description and details */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Features</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {features.map((feature: string) => (
                    <li key={feature} className="text-gray-400">
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
