var xmlHttp = null;
try {
    xmlHttp = new XMLHttpRequest();
} catch(e) {
    // Fehlerbehandlung, wenn die Schnittstelle vom Browser nicht unterstützt wird.
}
if (xmlHttp) {
    xmlHttp.open('GET', 'arsnova.eu/api/statistics', true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            alert(xmlHttp.responseText);
        }
    };
    xmlHttp.send(null);
}
