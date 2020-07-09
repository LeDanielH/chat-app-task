import { TAppState } from './types'
import { createSelector } from 'reselect'

export const usersState = (state: TAppState) => state.users
export const messagesState = (state: TAppState) => state.messages
export const usersCountSelector = createSelector(
	usersState,
	(users: TAppState['users']): number => users.length
)

export const registeredUserIdState = (state: TAppState) =>
	state.registeredUserId

export const isRegisteredSelector = createSelector(
	[registeredUserIdState],
	(id: string): boolean => {
		return !!id
	}
)

export const canEditMessageSelectorFactory = (messageId: string) =>
	createSelector(
		registeredUserIdState,
		(registeredUserId: string) => messageId === registeredUserId
	)
