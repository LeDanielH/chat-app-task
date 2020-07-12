import { format } from 'date-fns'

export const getPrettyDateTime = (timestamp: number) =>
	format(timestamp, 'd. M. yyyy HH:mm:ss')

export const getPrettyTime = (timestamp: number) =>
	format(timestamp, 'HH:mm:ss')
