import bapnuoc from "../assets/images/bapnuoc.jpg";
import movie1 from "../assets/images/movie1.jpg";
import movie2 from "../assets/images/movie2.jpg";
import type { BookingInfo } from "../interface";
// data chọn ghế
export const dataFake = [
  {
    id: 1,
    name: "A01",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 2,
    name: "A02",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 3,
    name: "A03",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 4,
    name: "A04",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 5,
    name: "A05",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 6,
    name: "",
    type: "entryway",
    status: false,
  },
  {
    id: 7,
    name: "A06",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 8,
    name: "A07",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 9,
    name: "A08",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 10,
    name: "A09",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 11,
    name: "A10",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 12,
    name: "A11",
    type: "normal",
    status: false,
    seatType: "normal",
    price: 60000,
  },
  {
    id: 13,
    name: "G10",
    type: "couple",
    status: false,
    seatType: "couple-01",
  },
  {
    id: 14,
    name: "G09",
    type: "couple",
    status: false,
    seatType: "couple-01",
  },
  {
    id: 15,
    name: "",
    type: "empty",
    status: false,
  },
  {
    id: 16,
    name: "A02",
    type: "couple",
    status: false,
    seatType: "couple-02",
  },
  {
    id: 17,
    name: "A02",
    type: "couple",
    status: false,
    seatType: "couple-02",
  },
  {
    id: 18,
    name: "G10",
    type: "couple",
    status: false,
    seatType: "couple-03",
  },
  {
    id: 19,
    name: "G09",
    type: "couple",
    status: false,
    seatType: "couple-03",
  },
  {
    id: 20,
    name: "",
    type: "empty",
    status: false,
  },
  {
    id: 21,
    name: "A02",
    type: "couple",
    status: false,
    seatType: "couple-04",
  },
  {
    id: 22,
    name: "A02",
    type: "couple",
    status: false,
    seatType: "couple-04",
  },
  {
    id: 23,
    name: "A02",
    type: "couple",
    status: false,
    seatType: "couple-05",
  },
  {
    id: 24,
    name: "A02",
    type: "couple",
    status: false,
    seatType: "couple-05",
  },
];

export const dataNoteColor = [
  {
    id: 1,
    type: "normal",
  },
  {
    id: 2,
    type: "VIP",
  },
  {
    id: 3,
    type: "chairSold",
  },
  {
    id: 4,
    type: "couple",
  },
  {
    id: 5,
    type: "luxury",
  },
  {
    id: 6,
    type: "entryway",
  },
  {
    id: 4,
    type: "chairSelected",
  },
];

export const dataCorn = [
  {
    id: 1,
    name: "Combo bắp nước",
    price: 80000,
    description: "1 Bắp 44oz + 1 Coca 32oz",
    image: bapnuoc,
    quantity: 0,
  },
  {
    id: 2,
    name: "Combo bắp nước 1",
    price: 120000,
    description: "1 Bắp 44oz + 1 Coca 32oz",
    image: bapnuoc,
    quantity: 0,
  },
  {
    id: 3,
    name: "Combo bắp nước 2",
    price: 100000,
    description: "1 Bắp 44oz + 1 Coca 32oz",
    image: bapnuoc,
    quantity: 0,
  },
];

export const moviesNow = [
  {
    id: 1,
    title: "CHAINSAW MAN – THE MOVIE: CHƯƠNG REZE",
    image: movie1,
    tag: "T18",
  },
  {
    id: 2,
    title: "ĐỒI HÀNH XÁC: TÀ THUYẾT ĐEN TRỞ LẠI",
    image: movie2,
    tag: "T18",
  },
  {
    id: 3,
    title: "TRẬN CHIẾN SAU TRẬN CHIẾN",
    image: movie1,
    tag: "T18",
  },
  {
    id: 4,
    title: "MARS EXPRESS",
    image: movie2,
    tag: "T16",
  },
  {
    id: 5,
    title: "CẬU BÉ CÁ HEO VÀ BÍ MẬT 7 ĐẠI DƯƠNG",
    image: movie1,
    tag: "T18",
  },
  {
    id: 6,
    title: "CẬU BÉ CÁ HEO VÀ BÍ MẬT 7 ĐẠI DƯƠNG",
    image: movie1,
    tag: "T18",
  },
  {
    id: 7,
    title: "CẬU BÉ CÁ HEO VÀ BÍ MẬT 7 ĐẠI DƯƠNG",
    image: movie1,
    tag: "T18",
  },
  {
    id: 8,
    title: "CẬU BÉ CÁ HEO VÀ BÍ MẬT 7 ĐẠI DƯƠNG",
    image: movie1,
    tag: "T18",
  },
];

export const dataInformation = {
  name: "Dong",
  email: "daidongtma@gmail.com",
  phoneNumber: "00",
  rap: "DCINE Quy Nhơn",
  nameMovie: "Chị Ngã Em Nâng",
  showTime: "20:30 - 05/10/2025",
  informationChair: [
    {
      id: 1,
      name: "L01",
      price: 60000,
    },
    {
      id: 2,
      name: "L02",
      price: 60000,
    },
  ],
  numberComboCorn: 0,
};

export const dataPayment = {
  totalPrice: 90000,
  orderCode: "0000",
  unit: "DCINE",
};

export const dataCompleteBooking: BookingInfo[] = [
  { key: "1", label: "Người đặt", value: "Dong" },
  { key: "2", label: "Ngày đặt", value: "08/10/2025" },
  { key: "3", label: "Phim", value: "" },
  { key: "4", label: "Ghế", value: "" },
  { key: "5", label: "Suất chiếu", value: "" },
  { key: "6", label: "Rạp", value: "" },
  { key: "7", label: "Tổng tiền", value: "60.000 vnđ" },
  {
    key: "8",
    label: "Trạng Thái",
    value:
      "Đặt vé không thành công. Vui lòng kiểm tra lại thông tin hoặc liên hệ hotline để được hỗ trợ.",
  },
];