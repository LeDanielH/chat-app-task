import { TAppState } from './types'

export class ReduxPersist {
	public static loadStateFromLocalStorage = (): TAppState | undefined => {
		try {
			const serializedState = localStorage.getItem('state')
			if (serializedState === null) {
				return undefined
			}
			return JSON.parse(serializedState)
		} catch (error) {
			return undefined
		}
	}
	public static loadStateFromSessionStorage = (): TAppState | undefined => {
		try {
			const serializedState = sessionStorage.getItem('state')
			if (serializedState === null) {
				return undefined
			}
			return JSON.parse(serializedState)
		} catch (error) {
			return undefined
		}
	}
	public static saveStateToLocalStorage = (state: TAppState) => {
		try {
			const serializedstate = JSON.stringify(state)
			localStorage.setItem('state', serializedstate)
		} catch (error) {
			// ignore write errors
		}
	}

	public static saveStateToSessionStorage = (state: TAppState) => {
		try {
			const serializedstate = JSON.stringify(state)
			sessionStorage.setItem('state', serializedstate)
		} catch (error) {
			// ignore write errors
		}
	}
}
