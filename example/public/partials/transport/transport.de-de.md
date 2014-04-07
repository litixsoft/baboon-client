#bbc.transport

- - -

Baboon verwendet für den Transport eine einheitliche Schnittstelle die sowohl HTTP/HTTPS als auch Sockets bedient, wobei die Socketverbindungen als default verwendet werden. Beim deaktivieren der Sockets werden die Anfragen automatisch auf HTTP/HTTPS umgeschaltet.

Für weitere Details besuchen Sie bitte unsere <a href="/doc#/api/bbc.transport.$bbcTransport" target="_self">API Referenz</a>.

###Methoden des Transportservices

 * emit: Löst eine Anfrage über Socket oder HTTP/HTTPS an den Server aus
 * forward: Leitet Socket-Events zum Scope weiter
 * on: Wartet auf ein Socket-Event vom Server
 * addListener: Fügt einen Listener zum Socket hinzu
 * removeListener: Löscht einen Listener vom Socket

- - -

###Beispiel: