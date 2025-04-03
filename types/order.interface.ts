export interface Order {
  _id: string,
  title: string,
  type: string,
  employer?: string, // employer._id
  date: string,
  hours: number,
  location: string,
  description: string,
  budget: number,
  applications?: [] // [ ...applications._ids ]
}
