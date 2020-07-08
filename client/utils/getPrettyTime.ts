import { format } from 'date-fns'

export const getPrettyTime = (timestamp: number) =>
	format(timestamp, ' d. M. yyyy HH:mm:ss')
