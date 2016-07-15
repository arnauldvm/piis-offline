function addDynamicGenreDerivedField(modelFieldIdGenre, suffix, valueM, valueF) {
  addDynamicField(modelFieldIdGenre + suffix, [modelFieldIdGenre],
    data => {
      switch (data[modelFieldIdGenre]) {
        case "M": return valueM;
        case "F": return valueF;
        default: return "";
      }
    }
  );
}
addDynamicGenreDerivedField("-beneficiary+genre", "-title", "M.", "Mme");
addDynamicGenreDerivedField("-beneficiary+genre", "-born", "né", "née");
addDynamicGenreDerivedField("-beneficiary+genre", "-called", "dénommé", "dénommée");
addDynamicGenreDerivedField("-center+president+genre", "-title", "M.", "Mme");
addDynamicGenreDerivedField("-center+president+genre", "-function", "Président", "Présidente");
addDynamicGenreDerivedField("-center+director+genre", "-title", "M.", "Mme");
addDynamicGenreDerivedField("-center+director+genre", "-function", "Directeur général", "Directrice générale");

function emptyIfUndef(value) {
  if (typeof value != 'undefined' && value) return value;
  return  "";
}
function addDynamicAddressField(modelFieldIdAddressPrefix) {
  addDynamicField(modelFieldIdAddressPrefix,
    [modelFieldIdAddressPrefix+"+streetnumber", modelFieldIdAddressPrefix+"+street",
     modelFieldIdAddressPrefix+"+zip", modelFieldIdAddressPrefix+"+locality"],
    data => {
      var streetnumber = emptyIfUndef(data[modelFieldIdAddressPrefix+"+streetnumber"]);
      var street = emptyIfUndef(data[modelFieldIdAddressPrefix+"+street"]);
      var zip = emptyIfUndef(data[modelFieldIdAddressPrefix+"+zip"]);
      var locality = emptyIfUndef(data[modelFieldIdAddressPrefix+"+locality"]);
      return `${streetnumber} ${street}, ${zip} ${locality}`;
    }
  );
}
addDynamicAddressField("-center+address");
addDynamicAddressField("-beneficiary+address");
