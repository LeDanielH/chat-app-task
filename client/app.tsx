import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { store } from './config/store'
import { ReduxPersist } from './store/reduxPersist'
import _throttle from 'lodash/throttle'
import { Provider } from 'react-redux'
import { Page } from './components/Page'
import { APP_ROOT_ID } from './constants'

store.subscribe(
	_throttle(() => {
		const { messages, users } = store.getState();
		ReduxPersist.saveState({
			messages,
			users,
		})
	}, 1000)
)

const Root = () => (
	<Provider store={store}>
		<Page />
	</Provider>
)

ReactDOM.render(<Root />, document.getElementById(APP_ROOT_ID))
