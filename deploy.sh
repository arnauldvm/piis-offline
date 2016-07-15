#!/bin/sh

srcDir="src/app"
tgtDir="//services.intranext.smals.be/PREST_SOC/ServiceReleaseLibrary/PrimaWeb/PIIS/offline/app"

rm -rf "$tgtDir"
find "$srcDir" -type d -printf '%P\n' | while read d; do echo "$d/"; mkdir "$tgtDir/$d"; done
find "$srcDir" -type f \! -name '.*.swp' -printf '%P\n' | while read f; do echo "$f"; cp "$srcDir/$f" "$tgtDir/$f"; done
