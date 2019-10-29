var writeFile = require('./src/writeFile')
const objectToCSV = require('./src/objectToCSV');
const {listapaises,
       listacurrencies,
       listapaiscurrencies,
       listalanguages,
       listapaisLanguages,
       listatranslations,
       listaciudades} = require('./src/parser');

       writeFile.writeFile('./Files/paises.csv',objectToCSV.objectToCSV(listapaises));
       writeFile.writeFile('./Files/currencies.csv',objectToCSV.objectToCSV(listacurrencies));
       writeFile.writeFile('./Files/paiscurrencies.csv',objectToCSV.objectToCSV(listapaiscurrencies));
       writeFile.writeFile('./Files/languages.csv',objectToCSV.objectToCSV(listalanguages));
       writeFile.writeFile('./Files/paisLanguages.csv',objectToCSV.objectToCSV(listapaisLanguages));
       writeFile.writeFile('./Files/translations.csv',objectToCSV.objectToCSV(listatranslations));
       writeFile.writeFile('./Files/ciudades.csv',objectToCSV.objectToCSV(listaciudades));


    //  Show data 
// let filtercode = 'BO';
// let pais = listapaises[filtercode];
// console.table(listaciudades.filter(city => city.alpha2Code == filtercode))
// console.table(pais); 
// console.table(listacurrencies.filter(currency =>currency.countryId == pais.Id))
// console.table(listalanguages.filter(language => language.countryId == pais.Id));
// console.table(listalanguages);
// console.table(listapaisLanguages)
// console.table(listatranslations.filter(translation => translation.countryId == pais.Id));
// console.table(listacurrencies);
 
// fetch('http://tucomunidadvirtual.com/')
//     .then(res => res.text())
//     .then(body => console.log(body));


var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;
 
var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});