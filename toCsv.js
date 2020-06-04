const json2csv = require("json2csv");
const fs = require("fs");
// const jsonfile = require("jsonfile");


module.exports = function saveToLocal(jsonArr, fields, filename) {

    let result = json2csv({
        data: jsonArr,
        fields: fields
    });

    // let result = jsonArr

    fs.writeFile(
        "./saves/" + filename,
        result,
        { flag: "wx" },
        function (err) {
            if (err) {
                console.log("File not saved: ", err);
            } else {
                console.log(
                    "File saved: " + filename + ""
                );
            }
        }
    );

}

// module.exports = saveToLocal()