import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import Scoops from '.';
import userEvent from '@testing-library/user-event';

/*
 ! Seçiciler > 3 ana parçadan oluşur

 ? Method [All] BySeçici
 * method > get | find | query
 * get > başlangıçta dom'da olan elementleri almak için kullanlır | elementi bulamazsa test failler
 * query > get ile benzer çalışır | element bulunamazsa null döndürür ve test devam eder 
 * find > elementin ne zaman ekrana basılacağı belli değilse kullanılır (api isteklerinde)
 
 * not: find methodu promise döndürür
 * bu yüzden async awail ile kullanılmalı
 
 * eğer methoda all eklersek seçicinin koşuluna uyan bütün elementleri alır
 * all kullanırsak her zaman dizi şeklinde cevap alırız
*/

test("API'dan gelen veriler için ekrana kartlar basılır.", async () => {
  render(<Scoops />);

  // Ekrana basılan resimleri al
  const images = await screen.findAllByAltText('çeşit-resim');

  // gelen resimlerin satısı 1 den büyük veya eşit mi
  expect(images.length).toBeGreaterThanOrEqual(1);
});

test('Çeşitlerin ekleme ve sıfırlama işlemleri çalışır.', async () => {
  // User-event'in kurulumu
  const user = userEvent.setup();

  // Bileşeni ekrana bas
  render(<Scoops />);

  // Bütün ekleme ve sıfırlama butonlarını çağır
  const addButtons = await screen.findAllByRole('button', { name: /add/i });

  const delButtons = await screen.findAllByRole('button', { name: /reset/i });

  // Toplam fiyat elementini çağır
  const total = screen.getByTestId('total');

  // Toplam fiyatı 0 mı kontrol et
  expect(total.textContent).toBe('0');

  // Ekle butonlarından birine tıkla
  await user.click(addButtons[0]);

  // Toplam fiyatın 20 mı kontrol et
  expect(total.textContent).toBe('20');

  // Ekle butonlarından birine 2 kez tıkla
  await user.dblClick(addButtons[2]);

  // Toplam fiyatı 60 mı kontrol et
  expect(total.textContent).toBe('60');

  // Ilk ekleneni kaldır
  await user.click(delButtons[0]);

  // Toplam fiyatı 40 mı kontrol et
  expect(total.textContent).toBe('40');

  // Son eklenini kaldır
  await user.click(delButtons[2]);

  // Toplam fiyatı 0 mı kontrol et
  expect(total.textContent).toBe('0');
});
