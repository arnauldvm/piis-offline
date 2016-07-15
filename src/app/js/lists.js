function addDataList(id, values) {
  var list = document.createElement("datalist");
  list.id = id;
  values.forEach(v => {
    option = document.createElement("option");
    option.value = v;
    list.appendChild(option);
  });
  document.head.appendChild(list);
}
