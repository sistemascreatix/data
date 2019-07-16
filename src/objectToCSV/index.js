exports.objectToCSV = function(data){
    var csvRows = [];
    // get the headers 
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','))

    // loop over the rows
    const values = data.map((row)=> {
       return headers.map(header => `"${`${row[header]}`.replace(/"/g,'')}"`).join(',')
    });
    csvRows = [...csvRows,...values]
    return csvRows.join('\r\n');
}