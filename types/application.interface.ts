export interface Application {
  _id?: string,
  worker: string,
  letter: string,
  initials: string,
  phone: string,
  order: string,
  date?: string,
  status?: string, // на рассмотрении, подтверждено, отказ
  images?: [],
  rating?: string,
  employer?: string
}
