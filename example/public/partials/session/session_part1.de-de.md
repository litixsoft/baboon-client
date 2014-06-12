
#bbc.session

- - -

Sessions werden in Baboon vom Server mit den Parametern aus der config.js erzeugt und verwaltet. Das Modul bbc.session beinhaltet einen Service, welcher mit der Serversession interagieren kann. Dies kann genutzt werden um den Server Aktivität zu melden und Daten vom Client aus in der Session zu speichern.

Für weitere Details besuchen Sie bitte unsere <a href="/doc#/api/bbc.session.$bbcSession" target="_self">API Referenz</a>.

###Methoden des Sessionservices

 * setActivity: Aktivität der Session melden
 * getLastActivity: Letzte Aktivität abfragen
 * setData: Daten in der Session speichern
 * getData: Daten aus der Session laden
 * deleteData: Daten aus der Session löschen

###setActivity: Meldet neue Aktivität an den Server

Aktivität an den Server melden. Der Server prüft die Session auf Inaktivität und Maximale Lebensdauer. Ist eine dieser Zeiten überschritten, sendet der Server dem Client im Callback einen Fehler. Ist die Session ok, verwendet der Server die aktuelle Serverzeit und speichert diese als letzte Aktivität.

###getLastActivity: Letzte Aktivität der Session abfragen

Die letzte Aktivität der Session abfragen. Dabei wird die Session nicht erneut überprüft und keine neue Aktivität gesetzt. Es wird ein in ISO formatierter Datumsstring zurück geliefert.

###Beispiel: