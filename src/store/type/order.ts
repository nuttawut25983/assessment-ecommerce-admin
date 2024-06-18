export type OrderStore = {
  orderList: OrderListItemState[];
  order: OrderListItemState;
  itemShipping: OrderItemShippingState;
  orderStatus: number;
  setOrderList: (list: OrderListItemState[]) => void;
  setOrder: (order: OrderListItemState) => void;
  setItemShipping: (shipping: OrderItemShippingState) => void;
  setOrderStatus: (status: number) => void;
};

export type OrderState = {
  orderList: OrderListItemState[];
  order: OrderListItemState;
  itemShipping: OrderItemShippingState;
  orderStatus: number;
};

export type OrderListItemState = {
  id: number;
  customer: CustomerState;
  orderNumber: string;
  totalPrice: number;
  vat: number;
  shippingCost: number;
  paymentStatus: boolean;
  isConfirm: boolean;
  status: number;
  isDelete: boolean;
  description: string;
  createdDate: Date;
  modifiedDate: Date;
  taxDetail: OrderTaxState;
  orderItems: OrderItemState[];
  paymentTransaction: OrderPaymentTransactionState[];
};

export type CustomerState = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
};

export type OrderTaxState = {
  isTax: boolean;
  taxPayerType: number;
  taxId: string;
  taxPayerName: string;
  phoneNumber: string;
  address: string;
  district: string;
  subDistrict: string;
  province: string;
  zipCode: string;
  email: string;
};

export type OrderItemState = {
  id: number;
  status: number;
  item: ItemDetailState;
  shippingDetail: ItemShippingState;
};

export type OrderPaymentTransactionState = {
  id: number;
  orderId: number;
  paymentAmount: number;
  paymentType: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  dateTime: string;
  description: string;
  slipUrl: string;
  createdDate: string;
};

export type ItemDetailState = {
  itemId: number;
  width: number;
  length: number;
  height: number;
  amount: number;
  printing: number;
  model: ItemModelState;
  material: ItemMaterialState;
  coating: ItemCoatingState;
  specialTechnics: ItemSpecialTechnicState[];
  isArtwork: boolean;
  artworkUrl: string;
  productDemo: number;
  description: string;
  unitPrice: number;
  totalPrice: number;
};

export type ItemShippingState = {
  shipping: number;
  shippingCost: number;
  trackingNumber: string;
  recipientName: string;
  phoneNumber: string;
  address: string;
  district: string;
  subDistrict: string;
  province: string;
  zipCode: string;
  isConfirmReceipt: boolean;
  deliveryDate: string;
  receivedDate: string;
  shippingName: string;
  receivedDescription: string;
};

export type OrderItemShippingState = {
  orderId: number;
  orderNumber: string;
  taxDetail: OrderTaxState;
  item: ShippingItemDetailState;
  shippingDetail: ItemShippingState;
};

export type ShippingItemDetailState = {
  itemId: number;
  width: number;
  length: number;
  height: number;
  amount: number;
  model: ItemModelState;
  material: ItemMaterialState;
  unitPrice: number;
};

export type ItemModelState = {
  id: number;
  name: string;
  imageUrl: string;
};

export type ItemMaterialState = {
  id: number;
  name: string;
  gram: number;
  imageUrl: string;
};

export type ItemCoatingState = {
  id: number;
  name: string;
  imageUrl: string;
};

export type ItemSpecialTechnicState = {
  id: number;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
};

export const initialOrderState: OrderState = {
  orderList: [],
  order: null,
  itemShipping: null,
  orderStatus: 1,
};
