> Baboon-Client ist eine Client Bibliothek für das [baboon webtoolkit](https://github.com/litixsoft/baboon). Es besitzt außerdem verschiedene Directiven um Abläufe bei der clientseitigen Webentwicklung zu vereinfachen.

 * Website: [http://www.litixsoft.de/baboon-client](http://www.litixsoft.de/baboon-client)
 * API Dokumentation: [http://www.litixsoft.de/baboon-client/api](http://www.litixsoft.de/baboon-client/api)
 * Entwicklerhandbuch: [http://www.litixsoft.de/baboon-client/guide](http://www.litixsoft.de/baboon-client/guide)

#Installation

Die Installation von Baboon-Client ist sehr einfach. Es sind jedoch einige Vorarbeiten nötig.

###Globale Abhängigkeiten:

Linux / Mac:

    $ sudo npm install -g bower

Windows:

    $ npm install -g bower

###Erstellen und starten des Baboon-Client Projektes

Normale Standardinstallation von Baboon-Client über die Bower Registry:

    $ bower install baboon-client

[Mehr über die Benutzung von Bower lernen](https://github.com/bower/bower#usage)

#Mitwirken

Anstatt eines formalen Styleguide, halten Sie sich einfach an den existierenden Programmierstil. Bitte erstellen Sie beschreibende Commit-Nachrichten. Wir nutzen einen Git Hook zum validieren der Commit-Nachrichten gegen diese Regeln. Erweitern Sie einfach Baboon-Client mit Ihren eigenen Erweiterungen oder Änderungen der Funktionalität von Baboon-Client selbst. Benutzen Sie diesen Workflow:

 1. Schreibe Deine Funktionalität
 2. Schreibe Unit Tests für Deine Funktionalität
 3. Erstelle ein Beispiel Deiner Funktionalität im Guide
 4. Dokumentiere Deine Funktionalität im Dokumentationsbereich des Guide
 5. Alle Tests sollten erfolgreich sein
 6. Prüfe Deine Testabdeckung (90 - 100%)
 7. Mache einen Pull Request

Wir werden die Tests, das Beispiel und die Testabdeckung prüfen. Für den Fall, dass die Änderungen nützlich und gut getestet sind, werden wir den Pull Request mergen.

#Erstellen und Testen von Baboon-Client

Dieser Bereich beschreibt, wie Sie Ihre Entwicklungsumgebung einrichten um Baboon-Client mit dem Guide zu erstellen und zu testen.

###Global dependencies:

Linux / Mac:

    $ sudo npm install -g grunt-cli karma bower

Windows:

    $ npm install -g grunt-cli karma bower

###Klonen von Baboon-Client und dem Guide

Der Guide ist auch Referenzimplementierung für Baboon-Client. Klonen Sie das Baboon-Client Repository und installieren Sie die abhängigen Module mit npm and bower.

Klonen Sie das Baboon-Client Repository und installieren Sie die "dev dependencies" and "test suite deps". Testen Sie Baboon-Client mit Grunt.

    $ git clone https://github.com/litixsoft/baboon-client.git
    $ cd baboon-client
    $ npm install
    $ bower install

Alternativ können Sie das Update Skript nutzen:

    $ git clone https://github.com/litixsoft/baboon-client.git
    $ cd baboon-client
    $ ./update.sh // in windows use update.bat

###Ausführen der Tests

Sie können alle Unit-Tests für Baboon-Client ausführen mit:

    $ grunt test // directory baboon-client

###Ausführen der Coverage

Sie können einen Coverage Task für Baboon-Client ausführen mit:

    $ grunt cover // directory baboon-client

###Ausführen der Tests für CI Systeme

Sie können Unit Tests, jshint and Code Coverage für CI Systeme ausführen mit:

    $ grunt ci

###Dokumentation generieren

Sie können die Dokumentation für Baboon-Client generieren mit:

    $ grunt doc

###Ausführen des Guide und der Dokumentation

Sie können die Node Anwendung starten und denb Guide unter http://localhost:3000 ausführen.

    $ node server.js

#Autor

Litixsoft GmbH

#Lizenz

Copyright (C) 2013-2014 Litixsoft GmbH info@litixsoft.de Licensed under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. DEALINGS IN THE SOFTWARE.