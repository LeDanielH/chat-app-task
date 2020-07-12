import { Dispatch } from 'redux'
import { TAction, TAppState, TMessageUpdatePayload, TMessage } from './types'
import { TWSActionEnum, TWSData } from '../api/types'
import {
	LEFT_THE_MEETING,
	MEETING_BOT,
	MESSAGE_REMOVED,
	YOU
} from '../constants'
import { getMessageWithUsername, getMessageToBeUpdatedIndex } from './utils'

const _userJoined = (wsData: TWSData): TAction => ({
	type: 'USER_JOINED',
	payload: wsData
})

export const userJoined = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { users } = getState()
	const existingUser = users.find((user: TWSData) => user.id === wsData.id)

	if (existingUser) {
		console.warn('user already exists')
	} else {
		dispatch(_userJoined(wsData))
		const mettingBotData: TMessage = {
			username: MEETING_BOT,
			timestamp: wsData.timestamp,
			value: `${wsData.value} joined the meeting`,
			type: TWSActionEnum.messageBroadcasted,
			id: wsData.id
		}
		dispatch(_messageBroadcasted(mettingBotData))
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
	const existingUser = users.find((user: TWSData) => user.id === wsData.id)

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
		console.warn('user already exists')
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
			value: `${users[leavingUserIndex].value} ${LEFT_THE_MEETING}`,
			type: TWSActionEnum.messageBroadcasted,
			id: users[leavingUserIndex].id
		}
		dispatch(_messageBroadcasted(mettingBotData))
	}
}

const _messageBroadcasted = (messageWithUsername: TMessage): TAction => ({
	type: 'MESSAGE_BROADCASTED',
	payload: messageWithUsername
})

export const messageBroadcasted = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { users } = getState()
	const messageWithUsername = getMessageWithUsername(users, wsData)
	dispatch(_messageBroadcasted(messageWithUsername))
}

export const messageUpdated = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { messages } = getState()
	const messageToBeUpdatedIndex = getMessageToBeUpdatedIndex(messages, wsData)
	if (messageToBeUpdatedIndex > -1) {
		dispatch(
			_messageUpdated({
				data: wsData,
				index: messageToBeUpdatedIndex
			})
		)
	}
}

const _messageUpdated = (
	updatedMessageData: TMessageUpdatePayload
): TAction => {
	return {
		type: 'MESSAGE_UPDATED',
		payload: updatedMessageData
	}
}

export const messageRemoved = (wsData: TWSData) => (
	dispatch: Dispatch<TAction>,
	getState: () => TAppState
) => {
	const { messages } = getState()
	const messageRemovedIndex = messages.findIndex((message: TMessage) => {
		const isSameUser = message.id === wsData.id
		const isSameTimeStamp = message.timestamp === wsData.timestamp

		return isSameUser && isSameTimeStamp
	})

	if (messageRemovedIndex > -1) {
		dispatch(
			_messageUpdated({
				data: { ...wsData, value: MESSAGE_REMOVED },
				index: messageRemovedIndex
			})
		)
	}
}
