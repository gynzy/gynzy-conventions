*Developers should build a program out of simple parts connected by well defined interfaces, so problems are local, and parts of the program can be replaced in future versions to support new features.*

# Algemeen
Nodejs heeft een systeem waarbij verschillende modules ingeladen kunnen worden `module.exports = function() {}`. Wat interessant hieraan is is dat modules maar 1 keer geladen worden waarna altijd de gecachde waarde terugkomt. 

Over het algemeen praat je direct tegen een bestand aan maar het is ook mogelijk om een folder als module in te laden (waarom dit belangrijk is komt later). Dit kan door in de folder een `package.json` aan te maken die niet meer doet dan aangeven waar het initializatie bestand staat.
``` json
{
  "name": "MyFolderModule",
  "main": "./main.js"
}
```
# Waarom
Door verschillende functionaliteit te abstraheren en achter een globale interface te zetten is het makkelijk om de code van de module aan te passen zonder dat we de aanroepende code stuk maken. Daarnaast is het gebruiken van een module makkelijker omdat er maar naar 1 interface gekeken hoeft te worden om te weten wat je moet aanroepen en met welke data.

## third party
Third parties hebben over het algemeen een eigen interface waar tegen gepraat wordt. Omdat dit verschilt tussen libraries die hetzelfde kunnen doen is het handig om een eigen interface te schrijven die gebruikt wordt om tegen de third party te praten. Hierdoor kan op een later tijdstip makkelijk de library vervangen worden voor een andere library zonder al teveel code te moeten refactoren.

Een ander groot voordeel van een eigen interface is dat er ES6 technieken gebruikt kunnen worden die mogelijk niet in de library zitten. Denk bijvoorbeeld aan correct gebruik van `class`.

## testen
Doordat een module maar een beperkt aantal entrypunten heeft is het makkelijk om het geheel te testen. Immers er zijn maar een paar entries die getest moeten worden en zoals hierboven te lezen is bij wijzigingen hoeft de test niet aangepast te worden.

# Data
Uiteindelijk zullen modules data teruggeven die relevant is om te gebruiken in andere modules. Nu kan er gekozen worden voor standaard javascript objecten maar het probleem is dat dan op een gegeven moment niet duidelijk is wat een object nou wel of niet bevat. Daarnaast kan het zijn dat de data aangepast moet worden voordat een andere module het begrijpt.

Hiervoor kunnen er modules *wat anders* aangemaakt worden met als enige taak data vast te houden. Hierdoor hebben we ook gedocumenteerd welke data er terug komt en zou het makkelijk zijn om deze data ook te integreren in andere modules.
