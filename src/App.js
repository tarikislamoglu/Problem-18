import { useState, useEffect } from "react";

// Bu bileşen input alanındaki değişiklikleri izleyerek toplam değişiklik sayısını gösterir. Ancak mevcut kodda sonsuz döngüye neden olan sorun bulunmaktadır.
// Görevler:
// 1. useEffect içindeki sonsuz döngüyü düzeltin ve yalnızca value state'i değiştiğinde count değerini güncelleyin.
//    - useEffect bağımlılık array'ini doğru bir şekilde ayarlayın.
// 2. Input alanına her değişiklik yapıldığında, "Toplam değişiklikler" değeri doğru şekilde artmalıdır.
// 3. Kullanıcı "value" alanını sıfırlamak için bir "Temizle" butonu ekleyin ve bu butona tıklandığında input değerini temizleyin ve bir değişiklik sayısı artışı yapmayın.
// 4. Kullanıcı "value" alanına yazı yazdıkça yazıyı konsola yazdıran bir console.log ekleyin.

// Bonus:
// - Kullanıcı "value" alanına hızlıca çok fazla değişiklik yaptığında (örneğin 5 değişiklik/3 saniye), uyarı gösterin (örneğin, "Çok hızlı değişiklik yapıyorsunuz").
// – Toplam değişiklik sayısını 0'a eşitlendiğinde, bu durumu vurgulamak için görsel geri bildirim sağlayın (örn. "Hiç değişiklik yapılmadı" mesajı).
// - count değeri belirli bir eşik değere (örneğin, 10) ulaştığında input alanını devre dışı bırakın ve mesaj gösterin (örn. "Maksimum değişiklik sayısına ulaştınız.").

// Tailwind ile ilgili istekler:
// 1. "Toplam değişiklikler" metninin rengini, değişiklik sayısına bağlı olarak dinamik hale getirin (örn. düşük sayılar için yeşil, yüksek sayılar için kırmızı).
// 2. Input alanına yazı yazıldığında, alanın arka plan rengini geçici olarak farklı bir renge dönüştürerek görsel geri bildirim sağlayın.
// 3. "Temizle" butonunu hover ve focus durumları için görsel olarak belirgin hale getirin (örn. arka plan rengini değiştirin veya gölge ekleyin).
// 4. Mobil cihazlar için input alanını daha büyük yapın ve yazı tipi boyutunu optimize edin.
// 5. Input alanı boş olduğunda, alanın kenar çizgisi ve placeholder rengini daha belirgin hale getirin.

export default function InputChanges() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [maxValueLength, setMaxValueLength] = useState(false);
  const [inputBg, setInputBg] = useState("bg-white");
  const [changeTimes, setChangeTimes] = useState([]);

  useEffect(() => {
    if (value !== "") {
      setCount((c) => c + 1);
    }
  }, [value]);

  useEffect(() => {
    if (changeTimes.length >= 5) {
      const timeDiff = Date.now() - changeTimes[changeTimes.length - 5];
      if (timeDiff < 3000) {
        alert("Çok hızlı değişiklik yaptınız!");
        setChangeTimes([]);
      }
    }
  }, [changeTimes]);

  function onChange(event) {
    const value = event.target.value;

    setValue(value);

    console.log(value);

    if (value.length >= 10) {
      alert("Max değişiklik sayısına ulaştınız");
      setMaxValueLength(true);
    }

    if (value) {
      setInputBg("bg-sky-100");
      setTimeout(() => {
        setInputBg("bg-white");
      }, 1000);
    }

    setChangeTimes((prev) => [...prev, Date.now()]);
  }

  const handleResetClick = () => {
    setValue("");
    setCount(0);
    setMaxValueLength(false);
  };

  return (
    <div className="mx-auto max-w-md p-8 flex sm-flex-row flex-col items-center sm:justify-center border-2 mt-5 rounded-md sm:w-[400px] h-[600px] justify-center">
      <label
        htmlFor="changes"
        className={`block text-sm font-medium leading-6 sm:w-2/3 w-full text-center ${
          count < 5 ? "text-green-500" : "text-red-500"
        }`}
      >
        Toplam değişiklikler ( {count})
      </label>
      <div className="mt-2 flex flex-col sm:flex-row items-center  sm:w-2/3 w-full  ">
        <input
          id="changes"
          className={`block sm:w-2/3 w-full rounded-md  border-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6 flex-3 max-h-[30px] ${
            value === "" ? "border-red-500 " : ""
          } ${inputBg} `}
          onChange={onChange}
          value={value}
          disabled={maxValueLength}
        />
        <button
          className="border-2 mt-2 sm:mt-0 sm:ml-2  rounded-md hover:bg-slate-500 hover:text-white focus:border-blue-700 sm:w-2/3  w-full  self-center flex-1"
          onClick={handleResetClick}
        >
          Temizle
        </button>
      </div>

      {
        <p
          className={` text-white p-1 rounded-md mt-2  sm:w-2/3 w-full ${
            count === 0 ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {count === 0 ? "Hiç değişiklik yapılmadı" : "Değişlik yapıldı"}
        </p>
      }
    </div>
  );
}
