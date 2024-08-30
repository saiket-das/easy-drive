import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { CarProps } from "../../types";
import ROUTES from "../../constants/routes";

const BestCarCard = ({ carInfo }: { carInfo: CarProps }) => {
  const {
    _id,
    name,
    description = "Product description goes here.",
    pricePerHour = 20,
    color,
  } = carInfo;
  return (
    <div className="mx-auto mt-11 w-80 transform overflow-hidden shadow-md rounded-lg duration-300 hover:scale-100 hover:shadow-lg">
      <img
        className="h-56 w-full object-cover object-center"
        src="https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Product Image"
      />
      <div className="px-6 py-4">
        <h2 className="mb-3 text-2xl font-medium">{name}</h2>
        <p className="mb-2 text-gray-700">{description}</p>
        <div className="flex items-center">
          <p className="mr-2 text-md font-semibol">Color: {color}</p>
          {/* <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
            $25.00
          </p> */}
          <p className="ml-auto text-lg font-medium text-green-500">
            ৳{pricePerHour}
          </p>
        </div>

        <Link
          to={ROUTES.CAR_DETAILS(_id)}
          className="w-full mt-5 mb-1 flex justify-center items-center bg-primary text-white font-base py-2 px-4 rounded hover:bg-primary-600"
        >
          See more
          <ArrowRightCircleIcon
            aria-hidden="true"
            className="w-5 ml-2 flex-none text-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default BestCarCard;
