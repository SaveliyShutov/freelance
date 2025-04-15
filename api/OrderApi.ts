import type { Application } from "~/types/application.interface"

export default {
  getAll(): Promise<any> {
    return useApiFetch(`/order/get-all`, { method: 'GET' })
  },
  getOrdersWithApplications(userOrders: string[]): Promise<any> {
    return useApiFetch(`/order/get-orders-with-lesson`, {
      method: 'POST',
      body: {
        userOrders
      },
    })
  },
  getById(order_id: string): Promise<any> {
    return useApiFetch(`/order/get-by-id?order_id=${order_id}`, { method: 'GET' })
  },
  createApplication(application: Application) {
    return useApiFetch(`/order/create-application`, { method: 'POST', body: { application } })
  },
  createOrder(order: any): Promise<any> {
    return useApiFetch(`/order/create`, {
      method: 'POST',
      body: { order }
    })
  },
}