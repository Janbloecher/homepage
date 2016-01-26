var parsen;
function loadXML(){
  var xmlHttp = null;
try {
    xmlHttp = new XMLHttpRequest();
} catch(e) {
    // Fehlerbehandlung, wenn die Schnittstelle vom Browser nicht unterstützt wird.
}
if (xmlHttp) {

    xmlHttp.open("GET", "https://arsnova.eu/api/statistics", true);

    xmlHttp.onreadystatechange = function () {

        if (xmlHttp.readyState == 4) {
          parsen=JSON.parse(xmlHttp.responseText);
          drawChart();
        }
    };
    xmlHttp.send(null);
}
}
loadXML();
setInterval(loadXML(), 30000);

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Fragenart', 'Anzahl der Fragen'],
    ['Vorlesungsfragen', parsen.lectureQuestions],
    ['Vorbereitungsfragen', parsen.preparationQuestions],
    ['Zwischenfragen',  parsen.interposedQuestions],
    ['Konzeptfragen', parsen.conceptQuestions],
  ]);

  var options = {
    title: 'Fragenübersicht',
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);

  var data2 = google.visualization.arrayToDataTable([
    ["User", "Anzahl"],
    ["Aktive User", parsen.activeUsers],
    ["Aktive Studenten", parsen.activeStudents],
    ["Eingeloggte User", parsen.loggedinUsers],
    ["Dozenten", parsen.creators]
  ]);


  var options2 = {
    title: 'User Statistik',
    PieHole: 0.4,
  };

  var chart2 = new google.visualization.PieChart(document.getElementById('donutchart2'));
  chart2.draw(data2, options2);

  var data3 = google.visualization.arrayToDataTable([
    ["Sessionart","Anzahl"],
    ["Offene Session",parsen.openSessions],
    ["Geschlossene Session",parsen.closedSessions]
  ]);

  var options3 = {
    title: 'Session Statistik',
    pieHole: 0.4,
  };

  var chart3 = new google.visualization.PieChart(document.getElementById('donutchart3'));
  chart3.draw(data3, options3);


  var data4 = google.visualization.arrayToDataTable([
    ["Art","Anzahl"],
    ["Antworten",parsen.answers],
    ["Fragen",parsen.questions],
    ["Sessions",parsen.sessions]
  ]);

  var options4 = {
    title: 'Inhalt',
    pieHole: 0.4,
  };

  var chart4 = new google.visualization.PieChart(document.getElementById('donutchart4'));
  chart4.draw(data4, options4);

}
