import { applyMiddleware, compose, createStore, Store } from 'redux'
import { ReduxPersist } from '../store/reduxPersist'
import promiseMiddleware from 'redux-promise-middleware'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { TAction, TAppState } from '../store/types'
import { rootReducer } from '../store/reducer'

const middleware = [
	thunk as ThunkMiddleware<TAppState, TAction>,
	promiseMiddleware
]

const composeEnhancers =
	(process.env.NODE_ENV !== 'production' &&
		(window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose)) ||
	compose

const persistedState = ReduxPersist.loadState()
//Create Redux store
export const store: Store<TAppState, TAction> = createStore(
	rootReducer,
	persistedState,
	composeEnhancers(applyMiddleware(...middleware))
)
