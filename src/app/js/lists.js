"use strict";

function addDataList(id, values) {
  const list = document.createElement("datalist");
  list.id = id;
  for (const v of values) {
    const option = document.createElement("option");
    option.value = v;
    list.appendChild(option);
  }
  document.head.appendChild(list);
}
