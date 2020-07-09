import React from 'react'
import { Modal } from './Modal'
import { Form } from './Form'
import { Image, SimpleWrapper } from '@householdjs/elements'
import { TWSActionEnum } from '../api/types'

type TModalEnterUserName = {
	isVisible: boolean
	ws: WebSocket
}

export const ModalRegisterUser = ({ isVisible, ws }: TModalEnterUserName) => {
	return (
		<Modal isVisible={isVisible}>
			<SimpleWrapper center bottom>
				<Image src="https://toughbyte.s3.amazonaws.com/uploads/client/logo/40/pexip_logo.png" />
			</SimpleWrapper>
			<Form
				wsType={TWSActionEnum.register}
				placeholder="John Doe"
				ws={ws}
				label={'Enter your name to join'}
			/>
		</Modal>
	)
}
