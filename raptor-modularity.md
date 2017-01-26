# Modules
Nodejs heeft een systeem waarbij verschillende modules ingeladen kunnen worden `module.exports = function() {}`. Wat interessant hieraan is is dat modules maar 1 keer geladen worden waarna altijd de gecachde waarde terugkomt. 

Over het algemeen praat je direct tegen een bestand aan maar het is ook mogelijk om een folder als module in te laden (waarom dit belangrijk is komt later). Dit kan door in de folder een `package.json` aan te maken die niet meer doet dan aangeven waar het initializatie bestand staat.
``` json
{
  "name": "MyFolderModule",
  "main": "./main.js"
}
```
## privacy


# Do's

# Dont's
