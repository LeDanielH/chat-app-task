export type TUserMessageDto = {
	name: string
	timePostedTimestamp: number // ms
	message: string
}

export type TWSData = {
	type: 'register' | 'message'
	value: string,
}
