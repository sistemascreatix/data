var fs = require("fs");
exports.writeFile = function(filename="temp.txt", data="File Content"){
    fs.writeFile(filename, data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
}