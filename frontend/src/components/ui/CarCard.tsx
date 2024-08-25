import { Link } from "react-router-dom";
import AppRoutes from "../../utils/AppRoutes";
import { CarProps } from "../../types/car.types";

const CarCard = ({
  _id,
  name,
  //   color,
  //   isElectric,
  status,
  pricePerHour,
}: CarProps) => {
  return (
    <div>
      <Link to={AppRoutes.CAR_DETAILS(_id)}>
        <div className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              alt={name}
              //   src={images[0]}
              src="https://images.unsplash.com/photo-1538592116845-119a3974c958?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
