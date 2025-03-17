export interface Order {
  _id: string,
  title: string,
  employer: string, // employer._id
  date: string,
  hours: string,
  duration: number,
  adress: string,
  description: string,
  price: number,
  applications: [] // [ ...applications._ids ]
}
