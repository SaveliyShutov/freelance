export interface Application {
  _id: string,
  worker: string, // user.id
  workerName: string
  status: string, // на рассмотрении, подтверждено, отказ
  avatar: string
  rating: number
}
