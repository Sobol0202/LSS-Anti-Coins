// ==UserScript==
// @name         LSS Anti Coins
// @namespace    www.leitstellenspiel.de
// @version      1.1
// @description  Versteckt in der Wache die Menschenhandelelemente und die Coins-Buttons im Fahrzeugmarkt
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/buildings/*/hire
// @match        https://www.leitstellenspiel.de/buildings/*/vehicles/new
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Schalter für die einzelnen Funktionen
    const hideHumanTraffickingElements = true; // Funktion zum Verstecken der Menschenhandelelemente aktivieren/deaktivieren
    const hideCoinButtons = true //Funktion zum Verstecken der Coins-Buttons im Fahrzeugmarkt aktivieren/deaktivieren

    // Funktion zum Extrahieren der Gebäude-ID aus der URL
    function getBuildingIDFromURL() {
        const urlParts = window.location.href.split('/');
        return urlParts[urlParts.length - 2];
    }

    // Funktion zum Ausblenden der Menschenhandelelemente
    function hideHumanTraffickingElementsFunction() {
        // Replace BuildingID with a placeholder
        const placeholder = getBuildingIDFromURL();

        // Selector für den Direkteinstellen Button
        const firstElementSelector = `a[href="/buildings/${placeholder}/hire_do/coins"]`;

        // Selector für den Multi-Direkteinstellen Button
        const secondElementSelector = `a[href="/buildings/${placeholder}/hire_do/coins_multiple"]`;

        // Selector für das Ausgebildete Modul
        const thirdElementSelector = 'div:has(h2:contains("Ausgebildetes Personal"))';

        // Elemente ausblenden
        const firstElement = document.querySelector(firstElementSelector);
        const secondElement = document.querySelector(secondElementSelector);
        const thirdElement = findElementByTextContent('Ausgebildetes Personal');
        const fourthElement = findElementByInfoText('Du kannst eine begrenzte Anzahl von Leuten verschieben.');

        if (firstElement) firstElement.style.display = 'none';
        if (secondElement) secondElement.style.display = 'none';
        if (thirdElement) thirdElement.style.display = 'none';
        if (fourthElement) fourthElement.style.display = 'none';
    }

    // Funktion zum Finden eines Elements nach Textinhalt
    function findElementByTextContent(text) {
        const elements = document.querySelectorAll('h2');
        for (const element of elements) {
            if (element.textContent.includes(text)) {
                return element.closest('div');
            }
        }
        return null;
    }

    // Funktion zum Finden eines Elements nach dem Info-Text
    function findElementByInfoText(text) {
        const elements = document.querySelectorAll('div.alert.alert-info');
        for (const element of elements) {
            if (element.textContent.includes(text)) {
                return element;
            }
        }
        return null;
    }

    // Funktion zum Ausblenden der Coins-Buttons im Fahrzeugmarkt
    function hideCoinButtonsFunction() {
        // Alle Links auf der Seite auswählen
        var links = document.querySelectorAll('a');

        // Durch jede Verlinkung iterieren
        links.forEach(function(link) {
            // Überprüfen, ob der Link das Wort "Coins" enthält
            if (link.innerText.includes("Coins")) {
                // Verlinkung ausblenden
                link.style.display = "none";
            }
        });
    }

    // Skript sofort nach dem Laden der DOM-Elemente ausführen
    if (hideHumanTraffickingElements) {
        hideHumanTraffickingElementsFunction();
    }

    // Skript sofort nach dem Laden der DOM-Elemente ausführen
    if (hideCoinButtons) {
        hideCoinButtonsFunction();
    }

})();