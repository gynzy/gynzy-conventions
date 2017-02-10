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
### Gedocumenteerd
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
### class variabele
Sinds Node 6 worden `getters` en `setters` ondersteund. Dit maakt het mogelijk om heel selectief bepaalde waarde te exposen van je klas. Dit zorgt er ook voor dat het mogelijk is om validatie toe te passen op de waardes die gezet worden alsook het voorkomen van het setten van bepaalde variabele. Een bijkomend effect van het gebruik van getters en setters is dat alle variabele van je klasse per definitie private zijn.
#### pros
* Zelf documenterend. De properties die een implementerende klasse kan gebruiken zijn gelijk zichtbaar.
* Read-only properties zijn mogelijk door geen `set` te maken.
* Validatie van de properties is mogelijk bij een `set`.
* Properties kunnen makkelijk en overzichtelijk gedocumenteerd worden qua type.
* Het exposen van properties is een bewuste keuze en voorkomt dat properties aangepast worden die stiekem toch private waren.
* Ondersteund static properties. `static get foo() { return 'bar' }`
#### cons
* Meer code om te schrijven.
``` javascript
class MyClass {
	// BAD
	constructor() {
		this.foo = 'bar';
	}

	// GOOD
	get foo() {
		return this._foo;
	}

	set foo(value) {
		this._foo = value;
	}
	constructor() {
		this._foo = 'bar';
	}
}
```
### Volgorde data
Om zo veel mogelijk zelf documenterend te zijn is het van belang dat alles gestructureerd staat. Op deze manier is het voor een programmeur altijd makkelijk om te achterhalen welke functionaliteit een bepaalde klasse bied. Vandaar de afspraak om altijd eerst de properties van een klas te tonen, daarna de constructor, daarna de functies gevolgd door de private functies.
``` javascript
// BAD
class MyClass {
	foo() {
		// ...
	}

	get bar() {}

	constructor() {
		// ...
	}

	set bar() {}
}

// GOOD
class MyClass {
	get bar() {}
	set bar() {}

	constructor() {
		// ...
	}

	foo() {
		// ...
	}

	_foo() {
		// ...
	}
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
### let, const, var
`var` Niet gebruiken. Het verschil tussen `const` en `let` is wat subtieler. `const` Suggereert namelijk dat het om een constante waarde gaat echter geeft dit alleen aan dat er geen nieuwe waarde aan deze property toegekend kan worden. Nu is het wel belangrijk om constante waardes te hebben en vandaar de afspraak dat `const` properties niet aangepast mogen worden. `let` Wordt voor alle andere properties gebruikt.
``` javascript
// BAD
var foo = 'bar';

// BAD
const foo = {};
foo.bar = 'bar';

// GOOD
let foo = 'bar';
foo = 'foobar';

// GOOD
let foo = {};
foo.bar = 'bar';
```
### Naamgeving geeft type aan
Om snel te weten welk type een waarde heeft is het handig om de variabele naam zo te maken dat het type makkelijk te raden is. Denk aan bijvoorbeeld `students` wat een lijst van `student` modellen is.
``` javascript
// BAD suggest the list contains microgoal objects
var microgoals = [1, 2, 3];
// GOOD 
var microgoalIds = [1, 2, 3];
```
### private bevat _ aan het begin
Javascript ondersteund geen private waardes. Vandaar dat de afspraak is dat private properties altijd met een `_` beginnen. Deze properties mogen dus niet vanuit een andere klasse aangeroepen worden (met uitzondering van tests).
``` javascript
// BAD
let foo_NIET_AANKOMEN = 'private tekst';

// GOOD
let _foo = 'private tekst';
```
