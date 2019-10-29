const paisesDet = require('../../data/Paises_Detail.json')
const ciudadesDet = require('../../data/Ciudades.json')
// module.exports = exports = {}

function cleanstring(value) {
    
    let remplaza=(value)=>{
        return value.replace(/[\/\\^$*+?&,"()|[\]{}:“”]/g, '').replace(/'/g, '`');
    }
    
    return `'${remplaza(`${value}`)}'`;

}

var listapaises = [];
var listacurrencies = [];
var listapaiscurrencies = [];
var listalanguages = [];
var listapaisLanguages = [];
var listatranslations = [];
var listapaises2 = [];
var geoblocksFormatted=[];
var counterLang = 0;
var counterCurr = 0;
paisesDet.map(({ name, flag, nativeName,capital,region,subregion, alpha2Code, latlng, timezones, numericCode, currencies, languages, translations }, index) => {
    index++
    [lat, lng] = latlng || [0, 0];
    listapaises.push( { 'Id': index,"GeoBlockTypeId":1, name,capital,region,subregion, flag, nativeName, alpha2Code, lat, lng, timezones: JSON.stringify(timezones), numericCode });
    listapaises2[alpha2Code]= { 'Id': index, "GeoBlockTypeId":1,name,capital,region,subregion, flag, nativeName, alpha2Code, lat, lng, timezones: JSON.stringify(timezones), numericCode };
    geoblocksFormatted.push( { 'Id': index,"GeoBlockTypeId":1, "LongName" : cleanstring(name) ,"ShortName": `'${alpha2Code}'`, "Latitude": lat,"Longitude": lng, "formattedaddress":cleanstring(name),"North":0,
    "South":0,"East":0,"West":0,"ParentId":null,"CreatedAt":"2019-10-14","UpdatedAt":"2019-10-14"});
    let nuevatranslations = Object.entries(translations).map(([key, value]) => {
        return { 'countryId': index, key: `'${key}'`,'value' : cleanstring(value) };
    });
    listatranslations = [...listatranslations, ...nuevatranslations]

    currencies.map(({ code, name, symbol }) => {
        let k = listacurrencies.find(c => c.code == cleanstring(code));
        if (!k) {
            counterCurr++;
            listacurrencies.push({ Id: counterCurr,'code':cleanstring(code), 'name':cleanstring(name),'symbol':cleanstring(symbol),'valid':1 });
            listapaiscurrencies.push({ 'countryId': index, currencyId: counterCurr,"CreatedAt": cleanstring("2019-10-14"),"UpdatedAt":cleanstring("2019-10-14") })
        } else {
            listapaiscurrencies.push({ 'countryId': index, currencyId: k.Id,"CreatedAt": cleanstring("2019-10-14"),"UpdatedAt":cleanstring("2019-10-14") })
        }

    })

    languages.map(({ iso639_1, iso639_2,name,nativeName }) => {
        let k = listalanguages.find(lang => lang.iso639_1 == iso639_1);
        if (!k) {
            counterLang++;
            listalanguages.push({ Id: counterLang,'alpha2code': cleanstring(iso639_1), 'name':cleanstring(name),'nativeName': cleanstring(nativeName) });
            listapaisLanguages.push({ languageId: counterLang ,'countryId': index });
        } else {
            listapaisLanguages.push({ languageId: k.Id, 'countryId': index });
        }

    })
})

listaciudades = ciudadesDet.map(({ CIUDAD, alpha2Code }) => (listapaises2[alpha2Code] ? {
    countryId: listapaises2[alpha2Code].Id,
    name: cleanstring(CIUDAD),
    alpha2Code:cleanstring(alpha2Code),
    lat: listapaises2[alpha2Code].lat,
    lng: listapaises2[alpha2Code].lng,
} : {}));




exports.listapaises = geoblocksFormatted;
exports.listacurrencies = listacurrencies;
exports.listapaiscurrencies = listapaiscurrencies;
exports.listalanguages = listalanguages;
exports.listapaisLanguages = listapaisLanguages;
exports.listatranslations  = listatranslations ;
exports.listaciudades = listaciudades;

