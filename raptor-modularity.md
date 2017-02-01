*Developers should build a program out of simple parts connected by well defined interfaces, so problems are local, and parts of the program can be replaced in future versions to support new features.*

# Algemeen
Nodejs heeft een systeem waarbij verschillende modules ingeladen kunnen worden `module.exports = function() {}`. Wat interessant hieraan is is dat modules maar 1 keer geladen worden waarna altijd de gecachde waarde terugkomt.

Over het algemeen praat je direct tegen een bestand aan maar het is ook mogelijk om een folder als module in te laden (waarom dit belangrijk is komt later). Dit kan door in de folder een `package.json` aan te maken die niet meer doet dan aangeven waar het initializatie bestand staat.

``` json
{ "name": "MyFolderModule", "main": "./main.js" }
```

## Waarom
Door verschillende functionaliteit te abstraheren en achter een globale interface te zetten is het makkelijk om de code van de module aan te passen zonder dat we de aanroepende code stuk maken. Daarnaast is het gebruiken van een module makkelijker omdat er maar naar 1 interface gekeken hoeft te worden om te weten wat je moet aanroepen en met welke data.

## Data
Uiteindelijk zullen modules data teruggeven die relevant is om te gebruiken in andere modules. Nu kan er gekozen worden voor standaard javascript objecten maar het probleem is dat dan op een gegeven moment niet duidelijk is wat een object nou wel of niet bevat. Daarnaast kan het zijn dat de data aangepast moet worden voordat een andere module het begrijpt.

Hiervoor kunnen er modules *wat anders* aangemaakt worden met als enige taak data vast te houden. Hierdoor hebben we ook gedocumenteerd welke data er terug komt. Ook kunnen deze data objecten dan gebruikt worden in andere modules. Wanneer de data dan wijzigt dan is gelijk duidelijk wat er allemaal op de achtergrond stuk is gegaan zonder daar pas op een later tijdstip achter te komen.

## third party
Third parties hebben over het algemeen een eigen interface waar tegen gepraat wordt. Omdat dit verschilt tussen libraries die hetzelfde kunnen doen is het handig om een eigen interface te schrijven die gebruikt wordt om tegen de third party te praten. Hierdoor kan op een later tijdstip makkelijk de library vervangen worden voor een andere library zonder al teveel code te moeten refactoren.

Een ander groot voordeel van een eigen interface is dat er ES6 technieken gebruikt kunnen worden die mogelijk niet in de library zitten. Denk bijvoorbeeld aan correct gebruik van `class`.

## testen Doordat een module maar een beperkt aantal entrypunten heeft is het makkelijk om
het geheel te testen. Immers er zijn maar een paar entries die getest moeten worden en zoals hierboven te lezen is bij wijzigingen hoeft de test niet aangepast te worden.

# Algemene structuur package
modules Om verwarring te voorkomen bij het gebruik maken van modules is het belangrijk dat er bepaalde conventies gevolgd worden qua naamgeving maar ook qua opbouw van een module.

``` javascript
// GOOD
class MyModule {
	constructor() {
		// initialization...
	}

	foo() {
		// code...
	}
}

module.exports = MyModule;

// BAD
module.exports = {
	init: function() {
		// initialization...
	},

	foo() {
		// code...
	}
}
```
Modules dienen altijd opgebouwd te worden met es6 classes. Daarnaast is het belangrijk om niet een geinstantieerde waarde van de class te maken in de module zelf. Het instantieren is namelijk verantwoordelijkheid van de module die deze class gebruikt. Door altijd deze verplichting te hebben hoeft niet gegokt te worden of iets een instantie is of een klas.

## singletons
Omdat er geen private/public in javascript is kan er niet op de standaard manier een singleton aangemaakt worden. Wat wel kan is niet de class exporteren maar een object met een functie om de instantie aan te maken.

``` javascript
class MySingleton {
	constructor() {
		// initialization...
	}
}

var _instance = null;
module.exports = {
	getInstance() {
		if (_instance === null) {
			_instance = new MySingleton();
		}

		return _instance;
	}
}
```
Op deze manier wordt de instantie pas aangemaakt wanneer iemand de code aanroept. In de code is het daarnaast duidelijk dat het om een singleton gaat omdat je telkens `.getInstance()` aanroept.
