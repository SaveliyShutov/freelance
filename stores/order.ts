import { defineStore } from "pinia"
import OrderApi from '../api/OrderApi'

import { useAuth } from './auth';

import type { Order } from "../types/order.interface"


export const useOrder = defineStore('order', () => {
  let orders = ref<Order[]>()

  async function getAll() {
    if (orders.value && orders.value?.length > 0) return null
    let res = await OrderApi.getAll()
    orders.value = res.data?.value

    return res
  }

  async function getById(order_id: string) {
    let res = await OrderApi.getById(order_id)

    return res
  }

  async function createOrder(order: Order) {
    return await OrderApi.createOrder(order)
  }


  return {
    orders,
    getAll,
    createOrder,
    getById
  }
})
