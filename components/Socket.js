import io from 'socket.io-client'

const socket = io('https://bulderchat.herokuapp.com/')

export default socket