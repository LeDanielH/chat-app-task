export type TUserMessageDto = {
	name: string
	timestamp: number // ms
	message: string
}

export type TWSData = {
	id: string,
	type: 'register' | 'message' | 'join'
	value: string,
	timestamp: number,
}
