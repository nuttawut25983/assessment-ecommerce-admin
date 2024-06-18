import {
  initialOrderState,
  OrderItemShippingState,
  OrderListItemState,
  OrderStore,
} from '@/store/type/order';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useOrderStore = create<OrderStore, any>(
  devtools((set) => ({
    orderList: initialOrderState.orderList,
    order: initialOrderState.order,
    itemShipping: initialOrderState.itemShipping,
    orderStatus: initialOrderState.orderStatus,
    setOrderList: (list: OrderListItemState[]) =>
      set(() => {
        return {
          orderList: list,
        };
      }),
    setOrder: (order: OrderListItemState) =>
      set(() => {
        return {
          order: order,
        };
      }),
    setItemShipping: (shipping: OrderItemShippingState) =>
      set(() => {
        return {
          itemShipping: shipping,
        };
      }),
    setOrderStatus: (status: number) =>
      set(() => {
        return {
          orderStatus: status,
        };
      }),
  })),
);
