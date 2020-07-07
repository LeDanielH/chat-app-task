import { TAppState } from './types'

export class ReduxPersist {
	public static loadState = (): TAppState | undefined => {
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
	public static saveState = (state: TAppState) => {
		try {
			const serializedstate = JSON.stringify(state)
			localStorage.setItem('state', serializedstate)
		} catch (error) {
			// ignore write errors
		}
	}
}
