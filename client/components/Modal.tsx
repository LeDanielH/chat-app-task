// @ts-ignore
import ReactModal from 'react-modal'
import React, { ReactNode } from 'react'
import { THEME } from '../config/theme'
import { Spacing } from '@householdjs/utils'
import { margin, padding } from 'polished'
import { APP_ROOT_ID } from '../constants'

type TModalProps = {
	children: ReactNode
	isVisible: boolean
}

export const Modal = ({ children, isVisible }: TModalProps) => {
	return (
		<ReactModal
			isOpen={isVisible}
			style={{
				overlay: {
					backgroundColor: THEME.colors.backdropModal,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
				content: {
					backgroundColor: THEME.colors.containerBackground,
					borderRadius: 0,
					maxWidth: THEME.sizes.maxModalWidth,
					position: 'static',

					...margin(null, 'auto'),
					...padding(Spacing.big),
					border: 0,
				}
			}}
		>
			{children}
		</ReactModal>
	)
}

ReactModal.setAppElement(`#${APP_ROOT_ID}`)
