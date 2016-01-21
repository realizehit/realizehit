<a href="http://github.com/realizehit/realizehit">
    <img src="https://raw.githubusercontent.com/realizehit/presskit/master/logo/icons/512x512/icon_g.png" alt="realizehit logo" align="left" width=96px />
</a>

# realizehit [![Build Status](https://travis-ci.org/realizehit/realizehit.svg?branch=master)](https://travis-ci.org/realizehit/realizehit)

**an enhanced and scalable websocket system for your project**

## Current development status: Help Wanted!

This project is currently on a developing stage, watch and rate this repo for future
acknowledge.

**We need your help to write clients on other languages!!**

* [x] [Websocket Server](https://github.com/realizehit/server-ws)
* [x] [API Server](https://github.com/realizehit/server-api)
* [ ] [JS API Client](https://github.com/realizehit/client-api.js) (WIP @cusspvz)
* [ ] [JS Websocket Client](https://github.com/realizehit/client-ws.js) (WIP @cusspvz)
* [ ] PHP API Client
* [ ] PHP Websocket Client
* [ ] Python API Client
* [ ] Python Websocket Client
* [ ] Ruby API Client
* [ ] Ruby Websocket Client
* [ ] JAVA API Client
* [ ] JAVA Websocket Client
* [ ] Perl API Client
* [ ] Perl Websocket Client
* [ ] Go API Client
* [ ] Go Websocket Client

Want to contribute with your knowledge? [Contact me by email](mailto:jose.moreira@findhit.com)

## History

Since findhit was developed it had a lot of realtime communication dependencies  
with web-clients.

At first development stage we relied on an excellent realtime service that you
may already know: [Pusher](http://pusher.com).

[Pusher](http://pusher.com) is wonderful for pub:sub service for stabilish a
web-socket based communication, if you could keep on the **channel**, **event**
model.

After a couple months using [Pusher](http://pusher.com), we decided to create
our own software for communicate with clients, on top of
[Socket.IO](http://socket.io/) (later was refactored to use
[Engine.IO](https://github.com/Automattic/engine.io) instead).
That software relied on a similar way WebSocket API, where you could listen on
a channel and an event.

Everything was great until our first structure problems appeared, we had a way
to send individual messages for all user's devices or target only one of them,
and some other interesting features, but a bigger one was missing: we relied on
**client/event** and we have to refactor it anytime we wanted to add another
filter, and thats bad practice and also insane...

Thats when **realizehit** was born, a rewrite of our internal comm library with
support for:

* Custom filters
* Identification capabilities trought HTTP Headers
    * This allow us to identify static things per request, such as `user`,
      `device` and `zone`.
    * That enhances our security since we handle them on the `load-balancer`. If
      you want to use this feature, please make sure to implement it as we do in
      order to avoid HTTP Headers injection from BlackHats.



## Requirements

Since **realizehit** is a stateless service, we must have a `redis` server running
somewhere.

## Usage

#### (Not Implemented Yet) Run on command-line

```bash
npm install -g realizehit
realizehit
```

#### Run as NPM module

```bash
npm install --save realizehit
```

```javascript
var RealizehitServer = require( 'realizehit' )

var server = new RealizehitServer({
    httpPort: '8080',
    redis: 'redis://redis.ip.or.hostname:6379'
})
```

#### Run with Docker

```bash
docker run -d --name=redis redis
docker run -d \
    --name=realizehit-server \
    -p 8080:8080 \
    -e REDIS_URI="redis://redis:6379" \
    --link redis:redis \
    realizehit/realizehit
```


## Other repositories directly related with this

### Servers

#### [server-api](https://github.com/realizehit/server-api) [![Build Status](https://travis-ci.org/realizehit/server-api.svg?branch=master)](https://travis-ci.org/realizehit/server-api)
#### [server-ws](https://github.com/realizehit/server-ws) [![Build Status](https://travis-ci.org/realizehit/server-ws.svg?branch=master)](https://travis-ci.org/realizehit/server-ws)

### Javascript Clients

#### [client-api.js](https://github.com/realizehit/client-api.js) [![Build Status](https://travis-ci.org/realizehit/client-api.js.svg?branch=master)](https://travis-ci.org/realizehit/client-api.js)
#### [client-socket.js](https://github.com/realizehit/client-socket.js) [![Build Status](https://travis-ci.org/realizehit/client-socket.js.svg?branch=master)](https://travis-ci.org/realizehit/client-socket.js)

### Others

Have you ported a client into another language? PR us and we will publish them
here! :)
