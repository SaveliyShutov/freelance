export interface Order {
  startTime: string;
  _id?: string;
  title: string;
  type?: string;
  employer_id?: string;
  employer_name?: string;
  date: Date;
  hours: number;
  budget: number;
  address: string;
  description?: string;
  paymentType: 'hourly' | 'shift';
  applications?: any[];
  images?: any[];
}