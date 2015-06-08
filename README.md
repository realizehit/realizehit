# realizehit

a better realtime library for your apps

![Logo](https://raw.githubusercontent.com/realizehit/presskit/master/logo/icons/512x512/icon_g.png)

We believe that we should not being trapped on `channel/event` approach like
*Pusher* is, so we adopted for an **your app, your rules** approach.



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



## Installation

#### NPM
```bash
npm i -g realizehit
DEBUG=* realizehit

realizehit:WebSocketServer: listening on port 8080
realizehit:RestServer: listening on port 3000
```

#### Docker
```bash
docker build -t realizehit/realizehit .
docker run -d -p 80:8080 81:3000 realizehit/realizehit
```



## API Usage

* [api-js-client]
* [socket-js-client]



## Server Usage

* [api-server]
* [socket-server]
