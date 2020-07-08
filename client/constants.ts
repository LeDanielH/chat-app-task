const isProd = process.argv.indexOf('-p') !== -1

export const APP_ROOT_ID = 'pexip-chat-app'
export const YOU = 'You'
export const MEETING_BOT = 'Meeting Bot'
export const UPDATED_AT = 'Updated at'
export const MESSAGE_REMOVED = 'Message removed by user'
export const WS_PORT = 1234
export const CLIENT_PORT = isProd ? WS_PORT : 9876
