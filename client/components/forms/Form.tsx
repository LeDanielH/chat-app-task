import React, { FormEvent, ReactNode } from 'react'

type TForm = {
	children: ReactNode
	onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}
export const Form = ({ onSubmit, children }: TForm) => {
	return <form onSubmit={onSubmit}>{children}</form>
}
