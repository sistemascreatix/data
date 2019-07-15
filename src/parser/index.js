const paisesDet = require('../../data/Paises_Detail.json')
const ciudadesDet = require('../../data/Ciudades.json')
// module.exports = exports = {}
var listapaises = [];
var listacurrencies = [];
var listapaiscurrencies = [];
var listalanguages = [];
var listapaisLanguages = [];
var listatranslations = [];
var listapaises2 = [];
var counterLang = 0;
var counterCurr = 0;
paisesDet.map(({ name, flag, nativeName, alpha2Code, latlng, timezones, numericCode, currencies, languages, translations }, index) => {
    index++
    [lat, lng] = latlng || [0, 0];
    listapaises.push( { 'Id': index, name, flag, nativeName, alpha2Code, lat, lng, timezones: JSON.stringify(timezones), numericCode });
    listapaises2[alpha2Code]= { 'Id': index, name, flag, nativeName, alpha2Code, lat, lng, timezones: JSON.stringify(timezones), numericCode };

    let nuevatranslations = Object.entries(translations).map(([key, value]) => {
        return { 'countryId': index, key, value };
    });
    listatranslations = [...listatranslations, ...nuevatranslations]

    currencies.map(({ code, name, symbol }) => {
        let k = listacurrencies.find(c => c.code == code);
        if (!k) {
            counterCurr++;
            listacurrencies.push({ Id: counterCurr, code, name, symbol });
            listapaiscurrencies.push({ 'countryId': index, currencyId: counterCurr })
        } else {
            listapaiscurrencies.push({ 'countryId': index, currencyId: k.Id })
        }

    })

    languages.map(({ iso639_1, iso639_2, name, nativeName }) => {
        let k = listalanguages.find(lang => lang.iso639_1 == iso639_1);
        if (!k) {
            counterLang++;
            listalanguages.push({ Id: counterLang, iso639_1, iso639_2, name, nativeName });
            listapaisLanguages.push({ 'countryId': index, languageId: counterLang });
        } else {
            listapaisLanguages.push({ 'countryId': index, languageId: k.Id });
        }

    })
})

listaciudades = ciudadesDet.map(({ CIUDAD, alpha2Code }) => (listapaises2[alpha2Code] ? {
    countryId: listapaises2[alpha2Code].Id,
    name: CIUDAD,
    alpha2Code,
    lat: listapaises2[alpha2Code].lat,
    lng: listapaises2[alpha2Code].lng,
} : {}));


exports.listapaises = listapaises;
exports.listacurrencies = listacurrencies;
exports.listapaiscurrencies = listapaiscurrencies;
exports.listalanguages = listalanguages;
exports.listapaisLanguages = listapaisLanguages;
exports.listatranslations  = listatranslations ;
exports.listaciudades = listaciudades;

