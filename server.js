var APIServer = require( 'realizehit-server-api' )
var WSServer = require( 'realizehit-server-ws' )
var env = process.env

var wsHttpServer
var apiHttpServer

var REDIS_URI = env.REDIS_URI || 'redis://localhost:6379'
var HTTP_WS_PORT = env.SERVER_PORT || env.SERVER_WS_PORT || 8080
var HTTP_API_PORT = env.SERVER_PORT || env.SERVER_API_PORT || 8080
var HTTP_HOST = env.SERVER_HOST || '0.0.0.0'
var ENDPOINT_WS = env.ENDPOINT || 'ws://' + HTTP_HOST + ':' + HTTP_WS_PORT + '/ws'
var ENDPOINT_API = env.ENDPOINT || 'http://' + HTTP_HOST + ':' + HTTP_API_PORT

if ( HTTP_WS_PORT == HTTP_API_PORT ) {
    wsHttpServer = apiHttpServer = http.createServer().listen( HTTP_WS_PORT )
} else {
    wsHttpServer = http.createServer().listen( HTTP_WS_PORT )
    apiHttpServer = http.createServer().listen( HTTP_API_PORT )
}

var wsServer = new WSServer({
    httpServer: wsHttpServer,
    redis: REDIS_URI
})
var apiServer = new APIServer({
    httpServer: apiHttpServer,
    redis: REDIS_URI
})

console.log( 'WSServer initialized on port ' + HTTP_API_PORT )
console.log( 'APIServer initialized on port ' + HTTP_WS_PORT )
console.log( 'APIServer should be accessed on ' + ENDPOINT )
console.log( 'WSServer should be accessed on ' + ENDPOINT )
