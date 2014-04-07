#bbc.navigation

- - -

Die Navigationsdirektive in Baboon dient zur Darstellung der Navigation. Dabei kann die Ausrichtung horizontal oder vertical erfolgen.

Der Navigationsservice in Baboon liefert die Navigationselemente der Haupt- oder einer Unternavigation als Liste oder Baum zurück. Durch Parameter können die Navigationselemente gefiltert werden.

Für weitere Details besuchen Sie bitte unsere <a href="/doc#/api/bbc.navigation.directive:bbcNavigation" target="_self">API Referenz</a>.

###Methoden des Navigationsservices

 * getApp: Liefert die aktuelle Applikation (app) zurück
 * getRoute: Liefert die aktuelle Route der Applikation zurück
 * getTree: Liefert die aktuelle Navigation als Baum
 * getList: Liefert die aktuelle Navigation als Liste
 * getTopList: Liefert die Toplevels der Navigation
 * getSubTree: Liefert alle Unterlinks als Baum einer Toplevel
 * getSubList: Liefert alle Unterlinks als Liste einer Toplevel

- - -

###Beispiel: