<a href="http://github.com/realizehit/realizehit">
    <img src="https://raw.githubusercontent.com/realizehit/presskit/master/logo/icons/512x512/icon_g.png" alt="realizehit logo" align="left" width=96px />
</a>

# realizehit [![Build Status](https://travis-ci.org/realizehit/realizehit.svg?branch=master)](https://travis-ci.org/realizehit/realizehit)

**an enhanced and scalable uni-directional websocket system for your project**

```
+--------+    +--------+    +--------+    +--------+    +--------+
| API    | -> | API    | -> | Redis  | -> | WS     | -> | WS     |
| Client |    | Server |    | Server |    | Server |    | Client |
+--------+    +--------+    +--------+    +--------+    +--------+
+Scallable    +Scallable    +Scallable    +Scallable    +Scallable

// Pub/Sub example case under the hood, since the first connecting stage:

1. API Client from within your app connects with one of the available API servers;
2. WS Client on your frontend connects with one of the available WS servers;
3. WS Client asks WS Server to subscribe into `{ "foo": "bar" }`;
4. WS Server creates a Subscription based on pattern { foo:bar } and sets it as
   active, which will also make WS Server to subscribe to `Redis`;
5. WS Server responds to WS Client confirming it would now receive payloads
   from the requested subscription;
6. Your app needs to send a payload to `{ "foo": "bar" }` because `foo`
   went to a `bar`, using API Client, it sends the payload `drunk`;
7. API Server handles the request and publishes it to Redis Server;
8. WS Server receives payload **BECAUSE IT HAS A CLIENT NEEDING IT**, which means
   other servers on the network won't even receive the message if they don't have
   clients that need it. It handles the payload directly to the respective
   subscription, and it will route the payload to their clients.
9. WS Client receives the payload and routes it to respective Subscription.
```

## Current development status: Help Wanted!

This project is currently on a developing stage, watch and rate this repo for future
acknowledge.

**We need your help to write clients on other languages!!**

* [x] [Websocket Server](https://github.com/realizehit/server-ws)
* [x] [API Server](https://github.com/realizehit/server-api)
* [x] [JS API Client](https://github.com/realizehit/client-api.js)
* [x] [JS Websocket Client](https://github.com/realizehit/client-ws.js)
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

### Shared libraries

#### [pattern-to-id](https://github.com/realizehit/pattern-to-id) [![Build Status](https://travis-ci.org/realizehit/pattern-to-id.svg?branch=master)](https://travis-ci.org/realizehit/pattern-to-id)
Handles different pattern definition conversion into an unique hash-based id.

#### [subscription](https://github.com/realizehit/subscription) [![Build Status](https://travis-ci.org/realizehit/subscription.svg?branch=master)](https://travis-ci.org/realizehit/subscription)
Subscription Class definition, it has been used as a parent Subscription
class on other repos.

#### [publisher](https://github.com/realizehit/publisher) [![Build Status](https://travis-ci.org/realizehit/publisher.svg?branch=master)](https://travis-ci.org/realizehit/publisher)
Publishes payloads directly into a **redis** server. It should be only used
when you don't want/need to deploy an API server. It doesn't have the same
naming pattern as clients do because we don't plan to make it available on
other languages, since probably its more secure to make them pass over
the API server.

### Servers

#### [server-api](https://github.com/realizehit/server-api) [![Build Status](https://travis-ci.org/realizehit/server-api.svg?branch=master)](https://travis-ci.org/realizehit/server-api)
Handles payloads publishment and in a near future it would also be used to
fetch metrics from other services.

Basically it is the bridge between Api Clients and Redis.

#### [server-ws](https://github.com/realizehit/server-ws) [![Build Status](https://travis-ci.org/realizehit/server-ws.svg?branch=master)](https://travis-ci.org/realizehit/server-ws)
Handles clients connections, client & subscription relation management,
redis sub based on active subscriptions and so on.

Basically it is the bridge between Redis and WebSocket clients.

### Javascript Clients

#### [client-api.js](https://github.com/realizehit/client-api.js) [![Build Status](https://travis-ci.org/realizehit/client-api.js.svg?branch=master)](https://travis-ci.org/realizehit/client-api.js)
#### [client-socket.js](https://github.com/realizehit/client-ws.js) [![Build Status](https://travis-ci.org/realizehit/client-ws.js.svg?branch=master)](https://travis-ci.org/realizehit/client-ws.js)

### Others

Have you ported a client into another language? PR us and we will publish them
here! :)
