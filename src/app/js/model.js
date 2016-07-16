"use strict";

const model = {};

function getModelField(modelFieldId) {
  if (modelFieldId in model) {
    return model[modelFieldId];
  }
  const field = { value: undefined, callbacks: [] };
  model[modelFieldId] = field;
  return field;
}

function getIdAttrName(eltType) {
  switch (eltType) {
    case "radio": return "name";
    default: return "id";
  }
}

function sync(evt) {
  const inputElement = evt.target;
  if (!inputElement.checkValidity()) {
    // Unfortunately the browser does not display the error message automatically (unless the form is submitted under Chrome)
    alert("Valeur incorrecte!\n(Valeurs autorisées : " + inputElement.title + ")");
  }
  const modelFieldId = inputElement.getAttribute(getIdAttrName(inputElement.type));
  const field = getModelField(modelFieldId);
  field.value = inputElement.value;
  notifyAll(modelFieldId);
}

function notifyAll(modelFieldId) {
  const field = getModelField(modelFieldId);
  for (const callback of model[modelFieldId].callbacks) {
    callback(field.value);
  }
}

function registerAllOutputs(tagName) {
  for (const element of document.getElementsByTagName(tagName)) {
    if (!element.hasAttribute("idref")) continue;
    const modelFieldId = element.getAttribute("idref");
    console.debug(`output: @idref=${modelFieldId}`);
    getModelField(modelFieldId).callbacks.push(function(fieldValue) {
      element.value = fieldValue;
    });
  }
}

function registerAllInputs(tagName) {
  for (const element of document.getElementsByTagName(tagName)) {
    const idAttrName = getIdAttrName(element.type);
    if (!element.hasAttribute(idAttrName)) continue;
    console.debug(`input: @${idAttrName}=${element.getAttribute(idAttrName)}, @value=${element.value}`);
    element.addEventListener("change", sync);
  }
}

function addComputedField(modelFieldId, inputFieldsIds, compute) {
  const outputElement = document.createElement("output");
  outputElement.id = modelFieldId;
  outputElement.className = "computed";
  outputElement.data = {};
  const dynamicField = getModelField(modelFieldId);
  for (const inputFieldId of inputFieldsIds) {
    getModelField(inputFieldId).callbacks.push(function(fieldValue) {
      outputElement.data[inputFieldId] = fieldValue;
      outputElement.value = compute(outputElement.data);
      outputElement.dispatchEvent(new Event("change"));
    });
  }
  document.body.appendChild(outputElement);
}
