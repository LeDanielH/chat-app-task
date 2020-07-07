import { TAppState } from './types'
import { createSelectorCreator, defaultMemoize, createSelector } from 'reselect';
import _isEqual from 'lodash/isEqual';
import { TWSData } from '../api/types'
import { YOU } from '../constants'

export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, _isEqual);


export const usersState = (state: TAppState) => state.users;
export const messagesState = (state: TAppState) => state.messages;
export const usersCountSelector = createSelector(usersState, (users: TAppState['users']): number => users.length)

export type TMessagesSelectorReturn = TWSData & {
	username: string,
}

export const messagesSelector = createDeepEqualSelector([usersState, messagesState], (users: TWSData[], messages: TWSData[]): TMessagesSelectorReturn[] => {
	return messages.map((message: TWSData): TMessagesSelectorReturn => {
		const user = users.find((user: TWSData) => user.id === message.id)
		const username = user ? user.value : 'unknown';
		return {
			...message,
			username,
		}
	})
})

// just the easiest thing to do at the moment, not the right thing
export const isRegisteredSelector = createSelector([usersState], (users: TWSData[]): boolean => {
	return users.findIndex((user: TWSData) => user.value === YOU) > -1;
})
