import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { store } from './config/store'
// import { ReduxPersist } from './store/reduxPersist'
// import _throttle from 'lodash/throttle'
import { Provider } from 'react-redux'
import { Page } from './components/Page'
import { APP_ROOT_ID } from './constants'
import { WebSocketProvider } from './components/wsContext'

// store.subscribe(
// 	_throttle(() => {
// 		const { messages = [], users = [] } = store.getState();
// 		ReduxPersist.saveStateToSessionStorage({
// 			messages,
// 			users,
// 		})
// 	}, 1000)
// )

const Root = () => (
	<Provider store={store}>
		<WebSocketProvider>
			<Page />
		</WebSocketProvider>
	</Provider>
)

ReactDOM.render(<Root />, document.getElementById(APP_ROOT_ID))
