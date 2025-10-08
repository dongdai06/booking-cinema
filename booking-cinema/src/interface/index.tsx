export interface ListDataCorns {
  id: number,
  name: string,
  price: number,
  description: string,
  image: string,
  quantity: number,
}

export interface ListDataChooseChair {
  id: number,
  name: string,
  type: string,
  status: boolean,
  seatType?: string,
  price?: number,
}

export interface BookingInfo {
  key: string;
  label: string;
  value: string;
}