import type { Application } from './application.interface';

export interface Order {
  _id: string,
  title: string,
  organization: string, // organisation._id
  date: string,
  workingHours: string,
  duration: number,
  adress: string,
  description: string,
  salaryRange: number,
  applications: [Application] // [ ...applications._ids ]
}
