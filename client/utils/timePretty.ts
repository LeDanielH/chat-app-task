import { format } from 'date-fns'

export const timePretty = (timestamp: number) => format(timestamp, 'HH:MM')
