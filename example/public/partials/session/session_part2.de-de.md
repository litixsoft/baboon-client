
###setData: Daten im Session-Container speichern

Sie können über den Session-Service vom Client aus Daten in der Serversession speichern. Baboon verwendet zum speichern in der Session den Container data. Alle Daten vom Client werden innerhalb des Containers session.data abgelegt und können auch nur aus diesem gelesen und gelöscht werden. Speichern außerhalb des Containers ist nicht möglich. Ist der Key in der Session bereits vergeben, wird der Wert mit dem neuen Wert überschrieben. Beachten Sie daher den Aufbau Ihrer Namen für Keys und verwenden Sie wenn möglich einen Namespace.

###getData: Daten aus dem Session-Container lesen

Sie können über den Session-Service vom Client aus Daten aus der Serversession auslesen. Verwenden Sie dazu den Key unter welchem Sie die Daten gespeichert haben. Sie können Daten, die außerhalb des Containers liegen, nicht abfragen.

Wenn Sie keinen Key angeben, wird Ihnen das gesamte Session Container Objekt zurück geliefert.

###deleteData: Daten aus dem Session-Container löschen

Sie können über den Session-Service vom Client aus Daten aus der Serversession löschen. Verwenden Sie dazu den Key unter welchem Sie die Daten gespeichert haben. Sie können Daten, die außerhalb des Containers liegen, nicht löschen.

Wenn Sie keinen Key angeben, wird das gesamte Session Container Objekt gelöscht.

###Beispiel: