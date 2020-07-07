import { pxToRem, Spacing, multiplyStringValue } from '@householdjs/utils'
import { transparentize } from 'polished'

const BASE_FONT_SIZE = 16

export const getRem = (px: number) => pxToRem(px, BASE_FONT_SIZE)

const COLORS = {
	gray: '#9095A0', // time
	grayLight: '#ECECEC', // background
	beige: '#A0A0A0', // slider
	blueDark: '#001539', // name (title)
	black: '#010032', // text
	blue: '#007FF0', // link
	white: '#ffffff' // messages container
}

export const COLORS_UI = {
	text: COLORS.black,
	heading: COLORS.blueDark,
	link: COLORS.blue,
	time: COLORS.gray,
	windowBackground: COLORS.grayLight,
	slider: COLORS.beige,
	userUpdate: COLORS.gray,
	border: COLORS.gray,
	loader: COLORS.blue,
	tabActive: COLORS.white,
	tabInActive: COLORS.grayLight,
	backdropModal: transparentize(0.7, COLORS.black),
	containerBackground: COLORS.white,
}

const SIZES = {
	tabSelectorHeight: getRem(75),
	tabSelectorMinWidth: getRem(220),
	inputHeight: getRem(56),
	sliderWidth: getRem(12),
	borderWidth: getRem(1),
	participantListItemHeight: getRem(66),
	// need to use it deeper inside the DOM to keep the scrollbar on the right
	tabChatRightSpacingCompensation: Spacing.big,
	maxModalWidth: getRem(320),
}

export const SIZES_UI = {
	...SIZES,
	baseSpacing: Spacing.default,
	spacingTabsContainer: multiplyStringValue(Spacing.default, 2),
	spacingBetweenUsers: multiplyStringValue(Spacing.default, 2),
	spacingBetweenUserAndTime: multiplyStringValue(Spacing.default, 0.75),
	spacingInput: Spacing.default
}

const Z_INDEX = {
	modal: 2,
	loader: 3,
}

export const TYPOGRAPHY = {
	ffBody: 'sans-serif',
	fwUserName: '700',
	fsBody: getRem(15),
	fwBold: 800,
	fwRegular: 400,
	fsHeading: getRem(16),
	fwMessage: '400',
	fsPageTitle: getRem(18)
}

export const TYPOGRAPHY_UI = {
	...TYPOGRAPHY,
	fsMessage: TYPOGRAPHY.fsBody,
	fsUserName: TYPOGRAPHY.fsHeading,
	fwMessage: TYPOGRAPHY.fwRegular,
	fwHeading: TYPOGRAPHY.fwBold,
	lhBody: multiplyStringValue(TYPOGRAPHY.fsBody, 2)
}

export const THEME = {
	colors: COLORS_UI,
	sizes: SIZES_UI,
	typography: TYPOGRAPHY_UI,
	zIndex: Z_INDEX
}

export type ThemeType = typeof THEME
