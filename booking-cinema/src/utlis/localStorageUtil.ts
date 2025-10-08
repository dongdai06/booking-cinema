// utils/localStorage.ts

// Các key localStorage được khai báo const để type-safe
export const localStorageKeys = {
  IS_LOGIN: "IS_LOGIN",
} as const;

type LocalStorageKey = keyof typeof localStorageKeys;

// Helper chung để xử lý try/catch
const safeLocalStorage = <T>(action: () => T, fallback: T): T => {
  try {
    return action();
  } catch (error) {
    console.error("LocalStorage error:", error);
    return fallback;
  }
};

// Lưu item vào localStorage
export const setLocalStorageItem = <T>(key: LocalStorageKey, value: T) =>
  safeLocalStorage(() => localStorage.setItem(localStorageKeys[key], JSON.stringify(value)), undefined);

// Lấy item từ localStorage
export const getLocalStorageItem = <T>(key: LocalStorageKey): T | null =>
  safeLocalStorage(() => {
    const item = localStorage.getItem(localStorageKeys[key]);
    return item ? (JSON.parse(item) as T) : null;
  }, null);

// Xóa item theo key
export const removeLocalStorageItem = (key: LocalStorageKey) =>
  safeLocalStorage(() => localStorage.removeItem(localStorageKeys[key]), undefined);

// Xóa tất cả item trong localStorage
export const clearLocalStorage = () =>
  safeLocalStorage(() => localStorage.clear(), undefined);

// Action cụ thể xóa IS_LOGIN
export const actionRemoveStorage = () => removeLocalStorageItem(localStorageKeys.IS_LOGIN);
