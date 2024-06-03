import axios from 'axios';
import { useEffect, useState } from 'react';

const Toppings = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/toppings')
      .then((res) => setData(res.data));
  }, []);

  // Ürüne tıklandığında çalışır
  const handleChange = (isChecked, item) => {
    isChecked
      ? setBasket([...basket, item])
      : setBasket(basket.filter((i) => i.name !== item.name));
  };

  return (
    <div className="container">
      <h2>Toppings</h2>
      <h5>
        Each <span className="text-success">3</span> $
      </h5>
      <h5>
        Total{' '}
        <span data-testid="total" className="text-success">
          {basket.length * 3}
        </span>
        &nbsp; $
      </h5>

      <div className="row gap-3 p-3">
        {data.map((item) => (
          <div className="top-card col" style={{ width: '150px' }} key={item.name}>
            <label
              htmlFor={item.name}
              className="d-flex flex-column align-items-center gap-3"
            >
              <img height={100} src={item.imagePath} alt={item.name} />

              <p className="text-nowrap text-center">{item.name}</p>
            </label>

            <input
              onChange={(e) => handleChange(e.target.checked, item)}
              className="d-none"
              id={item.name}
              type="checkbox"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppings;

