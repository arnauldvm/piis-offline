"use strict";

function addComputedGenreDerivedField(modelFieldIdGenre, suffix, valueM, valueF) {
  addComputedField(modelFieldIdGenre + suffix, [modelFieldIdGenre],
    data => {
      switch (data[modelFieldIdGenre]) {
        case "M": return valueM;
        case "F": return valueF;
        default: return "";
      }
    }
  );
}
addComputedGenreDerivedField("-beneficiary+genre", "-title", "M.", "Mme");
addComputedGenreDerivedField("-beneficiary+genre", "-born", "né", "née");
addComputedGenreDerivedField("-beneficiary+genre", "-called", "dénommé", "dénommée");
addComputedGenreDerivedField("-center+president+genre", "-title", "M.", "Mme");
addComputedGenreDerivedField("-center+president+genre", "-function", "Président", "Présidente");
addComputedGenreDerivedField("-center+director+genre", "-title", "M.", "Mme");
addComputedGenreDerivedField("-center+director+genre", "-function", "Directeur général", "Directrice générale");

function emptyIfUndef(value) {
  if (typeof value != 'undefined' && value) return value;
  return  "";
}
function addComputedAddressField(modelFieldIdAddressPrefix) {
  addComputedField(modelFieldIdAddressPrefix,
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
addComputedAddressField("-center+address");
addComputedAddressField("-beneficiary+address");
