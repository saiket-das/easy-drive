import { useParams } from "react-router-dom";

const RentCar = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  return (
    <div>
      <h1>Rent car</h1>
    </div>
  );
};

export default RentCar;
