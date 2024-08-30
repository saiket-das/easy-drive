import { Link } from "react-router-dom";

import { CarProps } from "../../types/car.types";
import ROUTES from "../../constants/routes";

const CarCard = ({
  _id,
  name,
  images,
  //   color,
  //   isElectric,
  status,
  pricePerHour,
}: CarProps) => {
  return (
    <div>
      <Link to={ROUTES.CAR_DETAILS(_id)}>
        <div className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              alt={name}
              src={images[0]}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">{name}</h3>
              <p className="mt-1 text-sm text-gray-500">Status: {status}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">৳{pricePerHour}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
