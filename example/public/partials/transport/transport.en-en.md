
#bbc.transport

- - -

Baboon uses a single API for transport via socket or http/https, whereas the socket is default. If the socket gets disabled or disconnected the requests are switched automatically to http/https. In the config socket can be set to disabled, so all transport is done over http/https.

For more Details please check out our <a href="/doc#/api/bbc.transport.$bbcTransport" target="_self">api reference</a>.

###Methods of the transport service

 * emit: Fires an event to socket or post request to the server
 * forward: Forwards an event to a scope
 * on: Register an event on the socket
 * addListener: Adds a listener on the socket
 * removeListener: Removes a listener from the socket

- - -

###Example: