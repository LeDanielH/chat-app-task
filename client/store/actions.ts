import { Dispatch } from 'redux'
import {
	TAction,
	TAppState,
	TMessageUpdatePayload,
	TMessage
} from './types'
import { TWSActionEnum, TWSData } from '../api/types'
import { MEETING_BOT, YOU } from '../constants'
import { getMessageWithUsername } from './utils'

const _userJoined = (wsData: TWSData): TAction => ({
	type: 'USER_JOINED',
	payload: wsData
})

export const userJoined = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { users } = getState()
	const existingUser = users.find(
		(user: TWSData) => user.id === wsData.id
	)

	if (existingUser) {
		console.warn('user already exists')
	} else {
		dispatch(_userJoined(wsData))
		const mettingBotData: TMessage = {
			username: MEETING_BOT,
			timestamp: wsData.timestamp,
			value: `${wsData.value} joined the meeting`,
			type: TWSActionEnum.message,
			id: wsData.id
		}
		dispatch(_messageSent(mettingBotData))
	}
}

const _usersOnline = (wsDataList: TWSData): TAction => ({
	type: 'USERS_ONLINE',
	payload: wsDataList
})

export const usersOnline = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { users } = getState()
	// do not have id yet
	const existingUser = users.find(
		(user: TWSData) => user.id === wsData.id
	)

	if (existingUser) {
		console.warn('user already exists')
	} else {
		dispatch(_usersOnline(wsData))
	}
}

const _userRegistered = (wsData: TWSData): TAction => ({
	type: 'USER_REGISTERED',
	payload: wsData
})

export const userRegistered = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const state = getState()
	const existingUser = state.users.find(
		(user: TWSData) => user.id === wsData.id
	)
	if (existingUser) {
		console.log('user already exists')
	} else {
		const userData: TWSData = {
			...wsData,
			value: YOU
		}
		dispatch(_userRegistered(userData))
	}
}

const _userLeft = (index: number): TAction => ({
	type: 'USER_LEFT',
	payload: index
})

export const userLeft = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { users } = getState()
	const leavingUserIndex = users.findIndex(
		(user: TWSData) => user.id === wsData.id
	)

	if (leavingUserIndex > -1) {
		dispatch(_userLeft(leavingUserIndex))
		const mettingBotData: TMessage = {
			username: MEETING_BOT,
			timestamp: Date.now(),
			value: `${users[leavingUserIndex].value} left the meeting`,
			type: TWSActionEnum.message,
			id: users[leavingUserIndex].id
		}
		dispatch(_messageSent(mettingBotData))
	}
}

const _messageReceived = (wsData: TMessage): TAction => ({
	type: 'MESSAGE_RECEIVED',
	payload: wsData
})

export const messageReceived = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { users } = getState()
	const messageWithUsername = getMessageWithUsername(users, wsData)
	dispatch(_messageReceived(messageWithUsername))
}

const _messageSent = (messageWithUsername: TMessage): TAction => ({
	type: 'MESSAGE_SENT',
	payload: messageWithUsername
})

export const messageSent = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { users } = getState()
	const messageWithUsername = getMessageWithUsername(users, wsData)

	dispatch(_messageSent(messageWithUsername))
}

const _messageUpdated = (
	updatedMessageData: TMessageUpdatePayload
): TAction => ({
	type: 'MESSAGE_UPDATED',
	payload: updatedMessageData
})

export const messageUpdated = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { messages } = getState()
	const messageToBeUpdatedIndex = messages.findIndex(
		(message: TMessage) => {
			const isSameUser = message.id === wsData.id
			const isSameTimestamp = message.timestamp === wsData.timestamp
			return isSameUser && isSameTimestamp
		}
	)

	if (messageToBeUpdatedIndex > -1) {
		dispatch(
			_messageUpdated({
				index: messageToBeUpdatedIndex,
				data: wsData
			})
		)
	} else {
		console.error('could not find the message to be updated')
	}
}
