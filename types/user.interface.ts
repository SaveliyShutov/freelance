export interface User {
	_id: string
	address: string
	description: string
	name: string
	surname: string
	email: string
	phone: string
	password: string
	role: string
	avatars: string[]
	rating: string
	applications: string[]
	orders: string[]
	organisation: string // organisation._id
}
