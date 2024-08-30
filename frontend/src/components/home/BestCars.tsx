import { useGetAllCarsQuery } from "../../redux/features/car/carApi";
import { CarProps } from "../../types";
import AppLoading from "../ui/AppLoading";
import BestCarCard from "./BestCarCard";

const BestCars = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);

  if (isLoading) {
    return (
      <div>
        <AppLoading />
      </div>
    );
  }

  const slicedArray = cars.data.slice(0, 3);

  return (
    <div className="grid grid-cols-3 justify-around mb-20 ">
      {slicedArray.map((carInfo: CarProps) => (
        <BestCarCard key={carInfo._id} carInfo={carInfo} />
      ))}
    </div>
  );
};

export default BestCars;
