export function formatCurrencyVND(value: number) {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export function formatMMSS(seconds: number) {
  if (seconds < 0) seconds = 0;
  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mm}:${ss}`;
}