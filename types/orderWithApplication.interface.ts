import type { Application } from "./application.interface"

export interface OrderWithApplication {
  _id?: string,
  title: string,
  type: string,
  employer_id?: string, // employer._id
  employer_name?: string, // employer._id
  date: string,
  hours: number,
  address: string,
  description: string,
  budget: number,
  applications?: [Application]
  images?: [] // [ ...applications._ids ]
}
