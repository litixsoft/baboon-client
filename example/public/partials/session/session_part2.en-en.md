
###setData: Store data in the Session Container

You can save on the session service from the client data in the server session. Baboon used to store the container in the session data. All data from the client are stored within the container session.data and can be read and deleted only from this. Is the Key in the session already exists, the old value is overwritten.

###getData: Read data from the session container

You can read out data from the server session using the session service by the client. Use the key with which you have the data stored. You can import data that are outside of the container, do not read.

If you do not enter a key, you the entire session container object is returned.

###deleteData: Delete data from the Session Container

The session service can delete from the client data from the server session. Use the key under which you have saved the data. You can import data that are outside of the container, do not delete.

If you do not enter a key, the entire session container object is deleted.

###Example: