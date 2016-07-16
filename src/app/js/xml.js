"use strict";

function initXmlDoc(rootElement) {
  const xmlString = `<${rootElement}></${rootElement}>`;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml"); //important to use "text/xml"
  return xmlDoc;
}

function nodeToString(xmlNode) {
   return (new XMLSerializer()).serializeToString(xmlNode);
}

function toXmlString() {
  const xmlDoc = initXmlDoc("piis");

  function x(eltName, ...children) { // after http://stackoverflow.com/a/3191559
    const node = xmlDoc.createElement(eltName);

    for (const child of children) {
        if (child === undefined || child === null) continue;
        if(typeof child == 'string') {
            child = xmlDoc.createTextNode(child);
        }
        node.appendChild(child);
    }

    return node;
  }

  function f(modelFieldId) {
    return getModelField(modelFieldId).value;
  }

  xmlDoc.documentElement.appendChild(
      x('beneficiary',
        x('lastname', f('-beneficiary+lastname')),
        x('firstname', f('-beneficiary+firstname')),
        x('genre', f('-beneficiary+genre')),
        x('nrn', f('-beneficiary+nrn')),
        x('birthdate', f('-beneficiary+birthdate')),
        x('address',
          x('street', f('-beneficiary+address+street')),
          x('streetnumber', f('-beneficiary+address+streetnumber')),
          x('zip', f('-beneficiary+address+zip')),
          x('locality', f('-beneficiary+address+locality'))
         )
       )
  );
  xmlDoc.documentElement.appendChild(
      x('center',
        x('municipality', f('-center+municipality')),
        x('inscode', f('-center.inscode')),
        x('president',
          x('name', f('-center+president+name')),
          x('genre', f('-center+president+genre'))
         ),
        x('director',
          x('name', f('-center+director+name')),
          x('genre', f('-center+director+genre'))
         ),
        x('address',
          x('street', f('-center+address+street')),
          x('streetnumber', f('-center+address+streetnumber')),
          x('zip', f('-center+address+zip')),
          x('locality', f('-center+address+locality'))
         )
       )
  );

  return "<?xml version='1.0' ?>\n" + nodeToString(xmlDoc);
}

function viewXml() {
  const xmlString = toXmlString();
  const xmlWindow = window.open('data:text/xml;charset=utf-8,' + escape(xmlString));
  //xmlWindow.focus();
}

function saveXmlFile(link) {
  const xmlString = toXmlString();
  link.href = 'data:text/xml;charset=utf-8,' + escape(xmlString);
}

function readFile(file, callback) { // after http://stackoverflow.com/a/26298948
  const reader = new FileReader();
  reader.onload = evt => callback(evt.target.result);
  reader.readAsText(file);
}

function parseXml(str) {
  return (new DOMParser()).parseFromString(str, "text/xml");
}

function fromXml(xmlString) {
  const xmlDoc = parseXml(xmlString);

  function p(node, map) {
    for (const tag in map) {
      const FUN = map[tag];
      for (const child of node.getElementsByTagName(tag)) {
        console.debug(`Parsing ${tag}`);
        FUN(child);
      }
    }
  }

  function s(node, modelFieldId) {
    const value = node.textContent;
    if (value === undefined || value === null) return;
    console.debug(`Set ${value} to ${modelFieldId}`);
    const inputElement = document.getElementById(modelFieldId);
    inputElement.value = value;
    inputElement.dispatchEvent(new Event("change"));
  }
  function sr(node, modelFieldId) {
    const value = node.textContent;
    if (value === undefined || value === null) return;
    console.debug(`Set ${value} to radio ${modelFieldId}`);
    const inputElements = Array.from(document.getElementsByName(modelFieldId));
    for (const e of inputElements) {
      e.checked = (e.value === value);
      if (e.checked) e.dispatchEvent(new Event("change"));
    }
  }

  p(xmlDoc, {
    'center': n => p(n, {
      'municipality': n => s(n, '-center+municipality'),
      'inscode': n => s(n, '-center+inscode'),
      'president': n => p(n, {
        'name': n => s(n, '-center+president+name'),
        'genre': n => sr(n, '-center+president+genre')
      }),
      'director':  n => p(n, {
        'name': n => s(n, '-center+director+name'),
        'genre': n => sr(n, '-center+director+genre')
      }),
      'address': n => p(n, {
        'street': n => s(n, '-center+address+street'),
        'streetnumber': n => s(n, '-center+address+streetnumber'),
        'zip': n => s(n, '-center+address+zip'),
        'locality': n => s(n, '-center+address+locality')
      }),
    }),
    'beneficiary': n => p(n, {
      'lastname': n => s(n, '-beneficiary+lastname'),
      'firstname': n => s(n, '-beneficiary+firstname'),
      'genre': n => sr(n, '-beneficiary+genre'),
      'nrn': n => s(n, '-beneficiary+nrn'),
      'birthdate': n => s(n, '-beneficiary+birthdate'),
      'address': n => p(n, {
        'street': n => s(n, '-beneficiary+address+street'),
        'streetnumber': n => s(n, '-beneficiary+address+streetnumber'),
        'zip': n => s(n, '-beneficiary+address+zip'),
        'locality': n => s(n, '-beneficiary+address+locality')
      })
    })
  })
}

function loadXmlFile(input) {
  const file = input.files[0];
  if (!file) return;
  readFile(file, result => fromXml(result));
}
