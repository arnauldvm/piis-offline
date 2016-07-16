"use strict";

function addrow(tableId) {
  const table = document.getElementById(tableId);
  const numCols = table.tHead.rows[0].childElementCount;
  const tbody = table.tBodies[0];
  const tr = document.createElement("tr");
  for (let i = 0; i<numCols; i++) {
    tr.appendChild(document.createElement("td"));
  }
  tr.lastElementChild.textContent = "-";
  tbody.appendChild(tr);
}
