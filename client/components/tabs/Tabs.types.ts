import { ReactNode } from 'react'

export type TTabCommonProps = {
	isActive: boolean
}

export type TTabSelectorTitleProps = {
	title: string
	centered: boolean
}

export type TTab = {
	name: string
	tabSelector: (centered: boolean) => ReactNode
	tabContent: ReactNode
}
