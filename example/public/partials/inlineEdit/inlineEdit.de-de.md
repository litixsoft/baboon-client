
#bbc.inline.edit

- - -

Baboon bietet den Service $bbcInlineEdit, welcher es ermöglicht Objekte nach Änderungen zurückzusetzen. Die Objekte können mit Validierungsfehlern erweitert werden.

Der Service hält die Daten im model. Beim Anlegen des models werden die model-Daten im master gespeichert. Das ermöglicht es das model wieder auf seine Ausgangsdaten zurückzusetzen und Änderungen am model nachzuvollziehen.

Für weitere Details besuchen Sie bitte unsere <a href="/doc#/api/bbc.inline.edit.$bbcInlineEdit" target="_self">API Referenz</a>.

###Methoden

 * isChanged: Prüft ob am model Änderungen stattgefunden haben.
 * populateValidation: Ergänzt das form um Servervalidierungsfehler.
 * reset: Setzt das model auf seinen Initialwert zurück.
 * setModel: Erstellt ein neues model und setzt den master.

- - -

###Beispiel