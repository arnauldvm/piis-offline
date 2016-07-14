var model = {};

function getModelField(modelFieldId) {
  if (modelFieldId in model) {
    return model[modelFieldId];
  }
  var field = { value: undefined, callbacks: [] };
  model[modelFieldId] = field;
  return field;
}

function sync(evt) {
  var inputElement = evt.target;
  var modelFieldId = inputElement.id;
  var field = getModelField(modelFieldId);
  field.value = inputElement.value;
  notifyAll(modelFieldId);
}

function notifyAll(modelFieldId) {
  var field = getModelField(modelFieldId);
  model[modelFieldId].callbacks.forEach(function(callback) {
    callback(field.value);
  });
}

function registerAllOutputs(tagName) {
  var elements = Array.from(document.getElementsByTagName(tagName));
    // getElementsByTagName is HTMLCollection, not Array!
  elements.forEach(function(element) {
    if (!element.hasAttribute("idref")) return;
    var modelFieldId = element.getAttribute("idref");
    console.info(`output: ${modelFieldId}`);
    getModelField(modelFieldId).callbacks.push(function(fieldValue) {
      element.value = fieldValue;
    });
  });
}

function registerAllInputs(tagName) {
  var elements = Array.from(document.getElementsByTagName(tagName));
    // getElementsByTagName is HTMLCollection, not Array!
  elements.forEach(function(element) {
    if (!element.hasAttribute("id")) return;
    console.info("input: " + element.id);
    element.addEventListener("change", sync);
  });
}

function addDynamicField(modelFieldId, inputFieldsIds, compute) {
  outputElement = document.getElementById(modelFieldId);
  outputElement.data = {};
  dynamicField = getModelField(modelFieldId);
  inputFieldsIds.forEach(function(inputFieldId) {
    getModelField(inputFieldId).callbacks.push(function(fieldValue) {
      outputElement.data[inputFieldId] = fieldValue;
      outputElement.value = compute(outputElement.data);
      outputElement.dispatchEvent(new Event("change"));
    });
  });
}

