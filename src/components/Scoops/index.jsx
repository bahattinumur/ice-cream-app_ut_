import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../Card';

const Scoops = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  // Sepete elaman ekler.
  const addToBasket = (item) => {
    setBasket([...basket, item]);
  };

  // Elemanları sepetten kaldır.
  const clearFromBasket = (name) => {
    setBasket(basket.filter((i) => i.name !== name));
  };

  // API'dan verileri al.
  useEffect(() => {
    axios.get('http://localhost:4000/scoops').then((res) => setData(res.data));
  }, []);

  return (
    <div className="container my-5">
      <h1>Ice Creams</h1>
      <h4>
        Each <span className="text-success">20</span> $
      </h4>
      <h3>
        Total{' '}
        <span data-testid={'total'} className="text-success">
          {basket.length * 20}
        </span>
        $
      </h3>

      <div className="row gap-5 justify-content-between mt-4 p-4">
        {data?.map((i) => (
          <Card
            amount={basket.filter((item) => item.name === i.name).length}
            addToBasket={addToBasket}
            clearFromBasket={clearFromBasket}
            item={i}
            key={i.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Scoops;
