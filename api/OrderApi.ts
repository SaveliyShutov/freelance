export default {
  getAll(): Promise<any> {
    return useApiFetch(`/orders/get-all`, { method: 'POST'})
  },
  createOrder(order: any): Promise<any> {
    return useApiFetch(`/orders/create`, {
      method: 'POST',
      body: { order }
    })
  },
}