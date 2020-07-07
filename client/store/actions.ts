import { Dispatch } from 'redux'
import { TAppState, TAction, TMessageUpdatePayload } from './types'
import { TWSData } from '../api/types'
import { YOU } from '../constants'

const _userJoined = (wsData: TWSData): TAction => ({
	type: 'USER_JOINED',
	payload: wsData,
});

export const userJoined = (wsData: TWSData) => (dispatch: Dispatch<TAction>) => {
	dispatch(_userJoined(wsData))
}

const _userRegistered = (wsData: TWSData): TAction => ({
	type: 'USER_JOINED',
	payload: wsData,
});

export const userRegistered = (wsData: TWSData) => (dispatch: Dispatch<TAction>, getState: () => TAppState) => {
	const state = getState();
	const existingUser = state.users.find((user: TWSData) => user.id === wsData.id);
	if (existingUser) {
		console.log('user already exists')
	} else {
		const userData: TWSData = {
			...wsData,
			value: YOU,
		}
		dispatch(_userRegistered(userData))
	}
}

const _userLeft = (index: number): TAction => ({
	type: 'USER_LEFT',
	payload: index,
});

export const userLeft = (wsData: TWSData) => (dispatch: Dispatch<TAction>, getState: () => TAppState) => {
	const { users } = getState();
	const leavingUserIndex = users.findIndex((user: TWSData) => user.id === wsData.id);

	if(leavingUserIndex > -1) {
		dispatch(_userLeft(leavingUserIndex))
	}
}

const _messageReceived = (wsData: TWSData): TAction => ({
	type: 'MESSAGE_RECEIVED',
	payload: wsData,
})

export const messageReceived = (wsData: TWSData) => (dispatch: Dispatch<TAction>) => {
	dispatch(_messageReceived(wsData))
}

const _messageSent = (wsData: TWSData): TAction => ({
	type: 'MESSAGE_SENT',
	payload: wsData,
})

export const messageSent = (wsData: TWSData) => (dispatch: Dispatch<TAction>) => {
	dispatch(_messageSent(wsData))
}

const _messageUpdated = (wsData: TMessageUpdatePayload): TAction => ({
	type: 'MESSAGE_UPDATED',
	payload: wsData,
})

export const messageUpdated = (wsData: TWSData) => (dispatch: Dispatch<TAction>, getState: () => TAppState) => {
	const { messages } = getState();
	const messageToBeUpdatedIndex = messages.findIndex((message: TWSData) => {
		const isSameUser = message.id === wsData.id;
		const isSameTimestamp = message.timestamp === wsData.timestamp;
		return isSameUser && isSameTimestamp
	})

	if(messageToBeUpdatedIndex > -1) {
		dispatch(_messageUpdated({
			index: messageToBeUpdatedIndex,
			data: wsData,
		}))
	} else {
		console.error('could not find the message to be updated')
	}
}
