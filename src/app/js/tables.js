function addrow(tableId) {
  var table = document.getElementById(tableId);
  var numCols = table.tHead.rows[0].childElementCount;
  var tbody = table.tBodies[0];
  var tr = document.createElement("tr");
  for (var i = 0; i<numCols; i++) {
    tr.appendChild(document.createElement("td"));
  }
  tr.lastElementChild.textContent = "-";
  tbody.appendChild(tr);
}
