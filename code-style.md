# Afspraken
Om ervoor te zorgen dat de gemaakte code van hoge kwaliteit is is het belangrijk om bepaalde afspraken te maken over wat wel en wat vooral niet goede code is. Door deze regels te volgen zal de code ook steeds meer volgens eenzelfde structuur zijn wat het werken en aanpassen van andermans code vermakkelijkt.

## Modules
### checklist
### onderbouwing
#### Altijd const bij require
Omdat er enge dingen kunnen gebeuren wanneer de gerequirede module aangepast kan worden door andere modules is het van belang dat alle requires als `const` worden aangemaakt. Dit voorkomt dat deze per ongeluk aangepast kunnen worden.
``` javascript
// BAD
var MyModule = require('./my-module.js');

// GOOD
const MyModule = require('./my-module.js');
```
#### Correct hoofdlettergebruik require
Instanties die geimporteerd worden moeten altijd beginnen met een kleine letter om aan te tonen dat het om een instantie gaat. Klassen die nog geinstantieerd moeten worden beginnen met een hoofdletter.
``` javascript
// BAD
const myModule = require('./my-module.js');
const MySingleton = require('./my-singleton.js');

// GOOD
const MyModule = require('./my-module.js'); 
const mySingleton = require('./my-singleton.js').getInstance();
```
#### Geen instance export
Wanneer module de klas als instantie exporteerd krijg je een soort van singleton maar net niet helemaal. Dit werkt natuurlijk verwarrend wanneer een class de ene keer een instantie van iets is en de andere keer een daadwerkelijke class die nog geinstantieerd moet worden.
``` javascript
// BAD
class MyClass {
	// Code ...
}

module.exports = new MyClass();

// GOOD
class MyClass {
	// Code ...
}

module.exports = MyClass;

// ALSO GOOD
class MyClass {
	// Code ...
}

var _instance = null;
module.exports = {
	getInstance() {
		if (_instance === null) {
			_instance = new MyClass();
		}

		return _instance
	}
}
```

## Classes
Elke module zou 1 class moeten exporteren of een functie om de instantie op te halen (in het geval van een singleton). Daarnaast dient er bovenaan de class een beschrijving te staan waar de class verantwoordelijk voor is en wat het dus globaal doet.
### checklist
### onderbouwing
#### documenatie
Een class heeft altijd documentatie. Op deze manier kan snel gekeken worden wat een klasprecies doet en daarnaast of bepaalde eigenschappen/side effects zijn waar rekening mee gehouden moet worden.
``` javascript
/**
 * MyClass is my first class which does awesome things. It can be used for 
 * "Hello world" programs.
 */
class MyClass {
	// Code ...
}
```
## Functions 
### checklist
### onderbouwing
## Variabele
### checklist
### onderbouwing

