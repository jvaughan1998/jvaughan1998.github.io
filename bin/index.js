function showModal(element) {
    document.getElementById("img-modal").style.display = "block";
    document.getElementById("img").src = element.src;
    document.getElementById("caption").innerHTML = element.alt;
}

function hideModal() {
    document.getElementById("img-modal").style.display = "none";
    document.getElementById("img").src = "";
    document.getElementById("caption").innerHTML = "";
}

function copy(id) {
    var url = document.getElementById(id);
    url.select();
    document.execCommand("Copy");
}
