export default {
  getAll(): Promise<any> {
    return useApiFetch(`/order/get-all`, { method: 'POST'})
  },
  createOrder(order: any): Promise<any> {
    return useApiFetch(`/order/create`, {
      method: 'POST',
      body: { order }
    })
  },
}