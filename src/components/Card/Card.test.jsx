import { render, screen } from '@testing-library/react';
import Card from '.';
import userEvent from '@testing-library/user-event';

const item = {
  name: 'Chocolate',
  imagePath: '/images/chocolate.png',
};

// Prop olarak verileri alan bir bileşeni test ediyorsak
// Aldığı propların benzerini göndermemiz gerekir!
test('Miktar , başlık ve fotoğraf gelen veriye göre ekrana basılır', () => {
  render(
    <Card
      item={item}
      amount={5}
      addToBasket={() => {}}
      clearFromBasket={() => {}}
    />
  );

  // miktar spanını çağır
  const amount = screen.getByTestId('amount');

  // Miktar 5 mi kontrol et
  expect(amount.textContent).toBe('5');

  // Chocolate yazısı ekrana basıldı mı?
  screen.getByText('Chocolate');

  // Resim elementini al
  const image = screen.getByAltText('çeşit-resim');

  // src değeri "/images/chocolate.png" mi?
  expect(image).toHaveAttribute('src', item.imagePath);
});

test('Butonlara tıklanınca fonksiiyonlar doğru pametreler ile çalışır', async () => {
  const user = userEvent.setup();

  // Prop olarak scoops bileşeninden gönderilen orjinal fonksiyonları göndermeyeceğimizden fonksiyonların doğru şekilde doğru zamanda doğru parametreler ile çalışıyor mu kontrolünü yapabilmek için asıl fonksiyonu taklit eden mock fonksiyonu tanımlamak gerekir//
  const addMockFn = jest.fn();
  const clearMockFn = jest.fn();

  render(
    <Card
      item={item}
      amount={3}
      addToBasket={addMockFn}
      clearFromBasket={clearMockFn}
    />
  );

  // Butonları al
  const addBtn = screen.getByRole('button', { name: /Add/i });
  const clearBtn = screen.getByRole('button', { name: /Reset/i });

  // Ekle butonuna tıkla
  await user.click(addBtn);

  // Add to Basket fonksiyonu doğru parametreleri alarak çalıştı mı?
  expect(addMockFn).toHaveBeenCalledWith(item);

  // Sıfırla butonuna tıkla
  await user.click(clearBtn);

  // Clear From Basket fonksiyonu doğru parametleri alarak çalıştı mı?
  expect(clearMockFn).toHaveBeenCalledWith('Chocolate');
});
