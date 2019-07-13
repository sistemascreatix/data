const paisesDet = require('./data/Paises_Detail.json')
const ciudadesDet = require('./data/Ciudades.json')
const fetch = require('node-fetch');

var listapaises = [];
var listacurrencies = [];
var listalanguages = [];
var listatranslations = []
var Paises = paisesDet.map(({ name, flag, nativeName, alpha2Code, latlng, timezones, numericCode, currencies, languages, translations }, index) => {

    [lat, lng] = latlng || [0, 0];
    listapaises[alpha2Code] = { 'Id': index, name, flag, nativeName, alpha2Code, lat, lng, timezones: JSON.stringify(timezones), numericCode };

    Object.entries(translations).map(([key, value]) => {
        listatranslations.push({ 'countryId': index, key, value })
    })

    currencies.map(({ code, name, symbol }) => {
        listacurrencies[code] = { 'countryId': index, code, name, symbol }
    })

    languages.map(({ iso639_1, iso639_2, name, nativeName }) => {
        listalanguages[iso639_1] = { 'countryId': index, iso639_1, iso639_2, name, nativeName }
    })

})

listaciudades = ciudadesDet.map(({ CIUDAD, alpha2Code }) => ({
    countryId: listapaises[alpha2Code] ? listapaises[alpha2Code].Id : 0,
    name: CIUDAD,
    alpha2Code,
    lat: listapaises[alpha2Code] ? listapaises[alpha2Code].lat : 0,
    lng: listapaises[alpha2Code] ? listapaises[alpha2Code].lng : 0,
}));

// let arraypaises = Object.entries(listapaises);
// console.log(arraypaises);
//console.log(listaciudades.filter(x => x.alpha2Code == "BO"))
//console.log(listacurrencies)
//console.log(listalanguages);
//console.log(listatranslations.filter(x=>x.countryId == 26));
// fetch('http://tucomunidadvirtual.com/')
//     .then(res => res.text())
//     .then(body => console.log(body));