import { ThunkDispatch } from 'redux-thunk'

export type Action =
	| { type: 'DOWNLOAD_CONFIG' }
	| { type: 'DOWNLOAD_CONFIG_PENDING' }
	| { type: 'DOWNLOAD_CONFIG_FULFILLED' }
	| { type: 'DOWNLOAD_CONFIG_REJECTED' }

export interface AppState {
	isFetching?: boolean
	error?: string
}

export type ExchangeThunkDispatch = ThunkDispatch<AppState, undefined, Action>
