"use strict";

function resetRowsIndex(tbody) {
  for (let i = 0; i<tbody.rows.length; i++) {
    tbody.rows[i].firstElementChild.textContent = i+1;
  }
}

function addrow(tableId) {
  const table = document.getElementById(tableId);
  const numCols = table.tHead.rows[0].childElementCount;
  const tbody = table.tBodies[0];
  const tr = document.createElement("tr");
  for (let i = 0; i<numCols; i++) {
    tr.appendChild(document.createElement("td"));
  }
  {
    tr.firstElementChild.className = "first-column";
    tr.lastElementChild.className = "last-column";
  }  // because not all styling properties are supported by col element
  tr.lastElementChild.textContent = "-";
  tr.lastElementChild.onclick = evt => removerow(tr);
  tbody.appendChild(tr);
  resetRowsIndex(tbody);
}

function removerow(tr) {
  const table = tr.parentNode.parentNode;
  table.deleteRow(tr.rowIndex);
  resetRowsIndex(table.tBodies[0]);
}
