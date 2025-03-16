export interface Application {
  _id: string,
  worker: string,
  workerName: string
  status: string, // на рассмотрении, подтверждено, отказ
  images: [],
  rating: string,
  employer: string
}
