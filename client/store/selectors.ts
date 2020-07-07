import { createSelector } from 'reselect'
import { TAppState } from './types'

export const usersState = (state: TAppState) => state.users;
export const messagesState = (state: TAppState) => state.messages;
export const usersCountSelector = createSelector(usersState, (users: TAppState['users']): number => users.length)
