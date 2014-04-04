#bbc.form

- - -

Das Modul bbc.form beinhaltet einen Service, welcher das Arbeiten mit Formularen vereinfacht. Dieser Service bietet Funktionalitäten für das Caching, Behandeln von Serverfehlern Prüfen von Änderungen und Zurücksetzen des Models.

Für weitere Details besuchen Sie bitte unsere <a href="/doc#/api/bbc.form.$bbcForm" target="_self">API Referenz</a>.

###Methoden des Formservice

 * setModel: Setzen des Models
 * hasLoadedModelFromCache: Model aus Cache laden
 * isUnchanged: Model auf Änderungen prüfen
 * populateValidation: Servervalidierung auf Formular mappen
 * reset: Model zurücksetzen

###Initialisieren von $bbcModal

Der Modalservice wird mit mit dem Modelnamen und einem Key, welcher eine Eigenschaft der Models ist, initialisiert. Ist der Key angegeben, wird dessen Wert als Schlüssel für den Cache gentuzt, andernfalls wird der Modelname genutzt.