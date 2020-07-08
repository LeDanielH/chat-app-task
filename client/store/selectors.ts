import { TAppState } from './types'
import { createSelectorCreator, defaultMemoize, createSelector } from 'reselect'
import _isEqual from 'lodash/isEqual'
import { TWSData } from '../api/types'
import { YOU } from '../constants'

export const createDeepEqualSelector = createSelectorCreator(
	defaultMemoize,
	_isEqual
)

export const usersState = (state: TAppState) => state.users
export const messagesState = (state: TAppState) => state.messages
export const usersCountSelector = createSelector(
	usersState,
	(users: TAppState['users']): number => users.length
)

export const registeredUserIdState = (state: TAppState) =>
	state.registeredUserId

// just the easiest thing to do at the moment, not the right thing
export const isRegisteredSelector = createSelector(
	[usersState],
	(users: TWSData[]): boolean => {
		return users.findIndex((user: TWSData) => user.value === YOU) > -1
	}
)

export const canEditMessageSelectorFactory = (messageId: string) =>
	createSelector(
		registeredUserIdState,
		(registeredUserId: string) => messageId === registeredUserId
	)
