import { Action, AppState } from './types'

const initialState: AppState = {
	isFetching: false,
	error: ''
}

export const rootReducer = (
	state: AppState = initialState,
	action: Action
): AppState => {
	switch (action.type) {
		case `DOWNLOAD_CONFIG_PENDING`: {
			return {
				...state,
				isFetching: true,
				error: ''
			}
		}
		case `DOWNLOAD_CONFIG_FULFILLED`: {
			return {
				...state,
				isFetching: false,
				error: ''
			}
		}
		case `DOWNLOAD_CONFIG_REJECTED`: {
			return {
				...state,
				isFetching: false,
				error: 'DOWNLOAD_CONFIG_REJECTED'
			}
		}
		default:
			return state
	}
}
