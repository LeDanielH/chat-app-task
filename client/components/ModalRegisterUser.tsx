import React from 'react'
import { Modal } from './Modal'
import { WebSocketForm } from './WebSocketForm'
import { Image, SimpleWrapper } from '@householdjs/elements'
import { TWSActionEnum, TWSData } from '../api/types'

type TModalEnterUserName = {
	isVisible: boolean
	ws: WebSocket
}

export const ModalRegisterUser = ({ isVisible, ws }: TModalEnterUserName) => {
	// TODO remove - handled by listener in Tabs
	const handleOnRegistered = (wsData: TWSData) => {
		console.info(wsData) //
	}

	const handleOnRegisterFail = () => {
		console.error('registration failed')
	}

	return (
		<Modal isVisible={isVisible}>
			<SimpleWrapper center bottom>
				<Image src="https://toughbyte.s3.amazonaws.com/uploads/client/logo/40/pexip_logo.png" />
			</SimpleWrapper>
			<WebSocketForm
				wsType={TWSActionEnum.register}
				placeholder="John Doe"
				successCallback={handleOnRegistered}
				errorCallback={handleOnRegisterFail}
				ws={ws}
				label={'Enter your name'}
			/>
		</Modal>
	)
}
