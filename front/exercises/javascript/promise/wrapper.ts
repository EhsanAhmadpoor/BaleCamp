interface ExpiringItem<T> {
  value: T;
  expiry: number;
}

class ExpiringLocalStorage {
  static setItem<T>(key: string, value: T, expiryTimeInSeconds: number): void {
    const now = Date.now();
    const expiryTime = now + expiryTimeInSeconds * 1000;
    const item: ExpiringItem<T> = {
      value: value,
      expiry: expiryTime
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getItem<T>(key: string): T | null {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item: ExpiringItem<T> = JSON.parse(itemStr);
    const now = Date.now();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}

// استفاده از ExpiringLocalStorage

// ذخیره آیتم با زمان انقضای 60 ثانیه
ExpiringLocalStorage.setItem('myKey', 'myValue', 60);

// بازیابی آیتم
const value = ExpiringLocalStorage.getItem<string>('myKey');
console.log(value);

// حذف آیتم
ExpiringLocalStorage.removeItem('myKey');

// پاک کردن تمام آیتم‌ها
ExpiringLocalStorage.clear();
