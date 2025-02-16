import type { Application } from './application.interface';
import type { Order } from './order.interface';
import type { Organization } from './organisation.interface';

export interface User {
	_id: string
	address: string
	description: string
	name: string
	surname: string
	info: string
	email: string
	phone: string
	password: string
	role: string
	avatars: string[]
	rating?: number
	applications?: [Application]
	orders?: [Order]
	organisation?: Organization // organisation._id
}
