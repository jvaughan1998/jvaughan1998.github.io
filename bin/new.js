function submit() {
    var inputTitle = document.getElementById("input-title");
    var inputDesc = document.getElementById("input-desc");
    var inputUrl = document.getElementById("input-url");
    var inputImg = document.getElementById("input-file");
    var inputStandard = document.getElementById("input-standard");
    var inputGrade = document.getElementById("input-grade");
    var inputUnit = document.getElementById("input-unit");
    var inputNotes = document.getElementById("input-notes");
    if(isValid(inputTitle) && isValid(inputDesc) && isValid(inputUrl)) {
        hideError();
        var grade = isValid(inputGrade) ? inputGrade.value : "Not given";
        var standard = isValid(inputStandard) ? inputStandard.value : "Not given";
        var unit = isValid(inputUnit) ? inputUnit.value : "Not given";
        var notes = isValid(inputNotes) ? inputNotes.value : "None";
        if(inputImg.value != "") {
            getBase64(inputImg.files[0], inputTitle.value,
                inputDesc.value, inputUrl.value, standard, grade, unit, notes);
        } else {
            download(inputTitle.value, inputDesc.value, inputUrl.value,
                standard, grade, unit, notes, "placeholder");
        }
    } else {
        showError();
    }
}

function sanitize(str) {
    return str.replace(/\W/g, "");
}

function isValid(obj) {
    return (sanitize(obj.value) != "");
}

function showError() {
    document.getElementById("validation-error").classList.remove("error-hidden");
    document.getElementById("validation-error").classList.add("error");
    document.getElementById("validation-error").innerHTML =
        "Please fill out all required fields.";
}

function hideError() {
    document.getElementById("validation-error").classList.remove("error");
    document.getElementById("validation-error").classList.add("error-hidden");
    document.getElementById("validation-error").innerHTML = "<br>";
}

function getBase64(file, title, desc, url, standard, grade, unit, notes) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        download(title, desc, url, standard, grade, unit, notes, reader.result);
    }
    reader.onerror = function(error) {
        console.log('Error: ', error);
    };
}

function download(title, desc, url, standard, grade, unit, notes, img) {
    var time = new Date().getTime();
    var filename = sanitize(title) + "_" + time + ".txt";
    var file = new Blob([title + "\n" + desc + "\n" + url + "\n" + standard
        + "\n" + grade + "\n" + unit + "\n" + notes + "\n" + time + "\n" + img],
        {type: "text/plain;charset=utf-8"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
