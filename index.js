const paisesDet = require('./data/Paises_Detail.json')
const ciudadesDet = require('./data/Ciudades.json')
const fetch = require('node-fetch');

var listapaises = [];
var listacurrencies = [];
var listalanguages = [];
var listatranslations = [];
paisesDet.map(({ name, flag, nativeName, alpha2Code, latlng, timezones, numericCode, currencies, languages, translations }, index) => {

    [lat, lng] = latlng || [0, 0];
    listapaises[alpha2Code] ={ 'Id': index, name, flag, nativeName, alpha2Code, lat, lng, timezones: JSON.stringify(timezones), numericCode };

    let nuevatranslations = Object.entries(translations).map(([key, value]) => {
        return { 'countryId': index, key, value };
    })
    listatranslations = [...listatranslations, ...nuevatranslations]

    currencies.map(({ code, name, symbol }) => {
        listacurrencies =[...listacurrencies, { 'countryId': index, code, name, symbol }]
    })

    languages.map(({ iso639_1, iso639_2, name, nativeName }) => {
        listalanguages =[...listalanguages,{ 'countryId': index, iso639_1, iso639_2, name, nativeName }]
    })
})

listaciudades = ciudadesDet.map(({ CIUDAD, alpha2Code }) => (listapaises[alpha2Code] ? {
    countryId: listapaises[alpha2Code].Id,
    name: CIUDAD,
    alpha2Code,
    lat: listapaises[alpha2Code].lat,
    lng: listapaises[alpha2Code].lng,
    } : {
        countryId: 0,
        name: CIUDAD,
        alpha2Code,
        lat: 0,
        lng: 0,
    }));

    //  Show data 
let filtercode = 'BO';
let pais = listapaises[filtercode];
console.table(listaciudades.filter(city => city.alpha2Code == filtercode))
console.table(pais);
console.table(listacurrencies.filter(currency =>currency.countryId == pais.Id))
console.table(listalanguages.filter(language => language.countryId == pais.Id));
console.table(listatranslations.filter(translation => translation.countryId == pais.Id));
// fetch('http://tucomunidadvirtual.com/')
//     .then(res => res.text())
//     .then(body => console.log(body));