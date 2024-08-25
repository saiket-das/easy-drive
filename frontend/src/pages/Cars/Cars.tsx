import AppLoading from "../../components/ui/AppLoading";
import CarCard from "../../components/ui/CarCard";
import { useGetAllCarsQuery } from "../../redux/features/cars/carApi";
import { CarProps } from "../../types/car.types";

const Cars = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);

  if (isLoading) {
    return (
      <div>
        <AppLoading />
      </div>
    );
  }
  if (cars.length < 0) {
    return (
      <p className="flex justify-center items-center text-primary-600">
        Sorry. No car available
      </p>
    );
  }

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {cars?.data.map((product: CarProps) => (
              <CarCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
