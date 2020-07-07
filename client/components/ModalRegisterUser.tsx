import React from 'react'
import { Modal } from './Modal'
import { WebSocketForm } from './WebSocketForm'
import { Image, SimpleWrapper } from '@householdjs/elements'
import { TWSActionType, TWSData } from '../api/types'
import { useDispatch } from 'react-redux'
import { userRegistered } from '../store/actions'

type TModalEnterUserName = {
	isVisible: boolean
	ws: WebSocket,
}

export const ModalRegisterUser = ({
	isVisible,
	ws,
}: TModalEnterUserName) => {

	const dispatch = useDispatch();

	const handleOnRegistered = (wsData: TWSData) => {
		dispatch(userRegistered(wsData))
	}

	const handleOnRegisterFail = () => {
		console.error('registration failed')
	}

	return (
		<Modal isVisible={isVisible}>
			<SimpleWrapper center bottom>
				<Image src='https://toughbyte.s3.amazonaws.com/uploads/client/logo/40/pexip_logo.png' />
			</SimpleWrapper>
			<WebSocketForm
				wsType={TWSActionType.register}
				placeholder="John Doe"
				successCallback={handleOnRegistered}
				errorCallback={handleOnRegisterFail}
				ws={ws}
			/>
		</Modal>
	)
}
