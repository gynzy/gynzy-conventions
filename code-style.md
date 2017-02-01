# Afspraken
Om ervoor te zorgen dat de gemaakte code van hoge kwaliteit is is het belangrijk om bepaalde afspraken te maken over wat wel en wat vooral niet goede code is. Door deze regels te volgen zal de code ook steeds meer volgens eenzelfde structuur zijn wat het werken en aanpassen van andermans code vermakkelijkt.

## Checklist
### Modules
- [ ] De require variabele zijn constant (gebruik van `const`)
- [ ] Instanties bij een require beginnen met een kleine letter
- [ ] Classes bij een require beginnen met een hoofdletter
- [ ] Er worden geen instanties geexporteerd
### Classes
- [ ] Documentatie is aanwezig
### Functions
- [ ] Documentatie is aanwezig (in ieder geval voor de parameters/return waarde)
- [ ] Functie naam detoneerd een actie (bevat een werkwoord)
- [ ] Asynchrone functienaam eindigt in "Async"
- [ ] Alle optionele params staan in een object
- [ ] Niet meer dan 50 regels
- [ ] Functie checkt input waardes en faalt waar nodig
- [ ] Functie bevat goede foutmelding, waarom en waar

## Modules
### Altijd const bij require
Omdat er enge dingen kunnen gebeuren wanneer de gerequirede module aangepast kan worden door andere modules is het van belang dat alle requires als `const` worden aangemaakt. Dit voorkomt dat deze per ongeluk aangepast kunnen worden.
``` javascript
// BAD
var MyModule = require('./my-module.js');

// GOOD
const MyModule = require('./my-module.js');
```
### Correct hoofdletter gebruik require
Instanties die geimporteerd worden moeten altijd beginnen met een kleine letter om aan te tonen dat het om een instantie gaat. Klassen die nog geinstantieerd moeten worden beginnen met een hoofdletter.
``` javascript
// BAD
const myModule = require('./my-module.js');
const MySingleton = require('./my-singleton.js');

// GOOD
const MyModule = require('./my-module.js');
const mySingleton = require('./my-singleton.js').getInstance();
```
### Geen instance export
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
### documenatie
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
### Gedocumenteerd
Javascript zelf heeft geen duidelijke types. Vandaar dat functies niet alleen documentatie nodig hebben voor wat er gebeurt. Ook belangrijk is welke data er aan een functie meegegeven wordt en wat voor object er terug komt.
``` javascript
// BAD
function foo(a, b) {
	// Code ...
}

// GOOD
/**
 * Adds a and b and caches the value. Will return whether the result was
 * successfull or not.
 *
 * @param {number} a - The first number used in the calculation.
 * @param {number} b - The second number used in the calculation.
 * @returns {boolean} - True when all went well, false otherwise.
 */
function foo(a, b) {
	// Code ...
}
```
### Naam denoteerd een actie
Een functie voert altijd een bepaalde actie uit. De naam van de functie zou dit moeten reflecteren zodat altijd duidelijk is om wat voor actie het gaat en dus ook wat de mogelijke bij-effecten zijn. Kort gezegd zal een functienaam altijd een werkwoord bevatten.
``` javascript
// BAD (staat zo in unicorn-base)
function routeDefenition() {
	// Code ...
}

// GOOD
function createRouteDefinition() {
	// Code ...
}
```
### Duidelijk of het async is of niet
Naast dat de naam een actie denoteerd is het ook handig om te weten of een functie nou iets asynchroon doet of niet. Mooi om deze eigenschap ook gelijk mee te nemen in de naam zodat zonder de code te zien duidelijk is dat het om een promise gaat.
``` javascript
// BAD
function doStuff() {
	return Promise.resolve();
}

// GOOD
function doStuffAsync() {
	return Promise.resolve();
}
```
### optionele params in object
Het is vrij makkelijk om optionele parameters te maken binnen javascript. Het probleem is wanneer een functie uitgebreid wordt met een extra param, omdat die nodig is. De aanroep heel veel `null` waardes bevat. Dit maakt het geheel minder leesbaar en daarnaast lastig te begrijpen. Vandaar dat het belangrijk is om optionele parameters altijd in een object te plaatsen.
``` javascript
// BAD
function doStuff(a, b = 'b', c = 3, d = {}, e = []) {
	// Code ...
}
doStuff('a', null, null, null, null, [1, 2, 3]);

// GOOD
function doStuff(a, { b = 'b', c = 3, d = {}, e = [] } ) {
	// Code ...
}
doStuff('a', {
	e: [1, 2, 3]
});
```
### Niet meer dan 50 regels
Het is heel makkelijk om een `doEverything` functie te maken maar leesbaar en aanpasbaar is het niet. Vandaar dat een harde limiet van maximaal 50 regels effectieve code per functie is. Hier vallen niet whitespaces, comments en documentatie onder.
### Fail fast
`Cannot call .foo of undefined` Foutmeldingen zijn naar. Helemaal naar is het wanneer er gezocht moet worden waar het precies misgaat en zeker met de "flexibiliteit" van Javascript kan dat een eindje verderop zijn. Vandaar dat het belangrijk is dat een functie snel faalt. 

Denk hierbij aan checks of de meegegven data plausibel is maar wees ook niet bang om keihard errors te gooien wanneer er iets niet klopt. De melding `foo is undefined, probally because the wrong id's are passed` is duidelijker dan `Cannot call id of undefined`.
``` javascript
// BAD
function doStuff(a) {
	let b = a + 3;
	this.doOtherStuff(b);
}
// Fails with "NaN is not a number" in `doOtherStuff` method
doStuff();

// GOOD
function doStuff(a) {
	if (typeof a !== 'number') {
		throw new Error('`a` Should be a number in `doStuff`. Was: ' + typeof a); 	
	}

	let b = a + 3;
	this.doOtherStuff(b);
}
// Fails with "`a` Should be a number in `doStuff`. Was: undefined"
doStuff();
```
## Variabele

