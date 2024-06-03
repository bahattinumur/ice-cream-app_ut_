import { fireEvent, render, screen } from '@testing-library/react';
import Form from '.';

test('Koşulların onaylanmasına göre buton aktifliği', () => {
  //1) Test edilince olan bileşen render edilir.
  render(<Form />);

  //2) Gerekli elemaları çağır
  const button = screen.getByRole('button');
  const checkbox = screen.getByRole('checkbox');

  //3) Checkbox'ın tiklenmememiş olduğunu kontrol et!
  expect(checkbox).not.toBeChecked();

  //4) Butonun in-aktif olduğunu kontrol et.
  expect(button).toBeDisabled();

  //5) Check-box'a tıkla.
  fireEvent.click(checkbox);

  //6) Butonun aktif olduğunu kontrol et.
  expect(button).toBeEnabled();

  //7) Check-box'a tıkla.
  fireEvent.click(checkbox);

  //8) Butonun in-aktif olduğunu kontrol et!
  expect(button).toBeDisabled();
});

test('Onay butonunun hover durumuna göre bildirim gözükür', () => {
  //1) Form'u renderla
  render(<Form />);

  //2) Gerekli elemanları al
  const checkbox = screen.getByRole('checkbox');
  const button = screen.getByRole('button');
  const alert = screen.getByText(/we will/i); //insensetive

  //3) Check-box'i tikle (buton aktif hale gelir!!)
  fireEvent.click(checkbox);

  //4) Bildirim ekranda olmadığını kontrol et.
  expect(alert).not.toBeVisible();

  //5) Mouse'u butona getir.
  fireEvent.mouseEnter(button);

  //6) Bildirim ekrana geldi mi kontrol et.
  expect(alert).toBeVisible();

  //7) Mouse'u butondan çek.
  fireEvent.mouseLeave(button);

  //8) Bildirim ekrandan gitti mi kontrol et.
  expect(alert).not.toBeVisible();
});
