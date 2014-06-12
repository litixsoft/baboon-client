
#bbc.session

- - -

Sessions are produced in Baboon from the server and managed with the parameters from the config.js. The module bbc.session includes a service that can interact on the server with the session. Which can be used to report to the server activity and to store data from the client in the session.

For more Details please check out our  <a href="/doc#/api/bbc.session.$bbcSession" target="_self">api reference</a>.

###Methods of the Session Services

 * setActivity: Report activity session
 * getLastActivity: Check Recent Activity
 * setData: Store data in the session
 * getData: Load data from the session
 * deleteData: Delete data from the session

###setActivity: Reports new activity to the server

Report activity on the server. The server checks the session on inactivity and maximum service life. If one of these times are exceeded, the server sends the client in the callback an error. If the session ok, the server uses the current server time and stores it as the last activity.

###getLastActivity: Check Latest activity session

The last activity of the session to query. The session will not be checked again and set no new activity. It is returned a formatted in ISO date string.

###Example: