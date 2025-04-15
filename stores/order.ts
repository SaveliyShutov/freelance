import { defineStore } from "pinia"
import OrderApi from '../api/OrderApi'

import { useAuth } from './auth';

import type { Order } from "../types/order.interface"
import type { Application } from "../types/application.interface"
import type { OrderWithApplication } from "../types/orderWithApplication.interface"


export const useOrder = defineStore('order', () => {
  let orders = ref<Order[]>([])
  let my_orders_with_applications = ref<OrderWithApplication[]>([])
  let my_applications = ref<Application[]>([])

  async function getAll() {
    if (orders.value && orders.value?.length > 0) return null
    let res = await OrderApi.getAll()
    orders.value = res.data?.value

    return res
  }

  async function getOrdersWithApplications() {
    if (my_orders_with_applications.value && my_orders_with_applications.value?.length > 0) return null

    let user = useAuth()?.user;
    if (!user?.employer_orders) return [];

    let myOrders = user.employer_orders;
    let res = await OrderApi.getOrdersWithApplications(myOrders)
    my_orders_with_applications.value = res.data?.value
    return res
  }

  async function getById(order_id: string) {
    let res = await OrderApi.getById(order_id)

    return res
  }

  async function createOrder(order: Order) {
    return await OrderApi.createOrder(order)
  }

  async function createApplication(application: Application) {
    return await OrderApi.createApplication(application)
  }

  return {
    orders,
    my_orders_with_applications,
    getAll,
    createOrder,
    getById,
    createApplication,
    getOrdersWithApplications
  }
})
