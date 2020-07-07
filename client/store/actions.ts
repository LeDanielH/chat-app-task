import { Dispatch } from 'redux'
import { fetchApi } from '../api/api'
import { Action } from './types'
import { endpoints } from '../api/endpoints'

export const downloadConfiguration = () => (dispatch: Dispatch<Action>) => {
	dispatch({
		type: 'DOWNLOAD_CONFIG',
		async payload() {
			return await fetchApi(endpoints.config)
		}
	})
}
