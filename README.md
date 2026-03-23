# FamCal – Familjekalendern

Offline PWA-kalender för familjen. Ladda upp dessa filer till GitHub och aktivera GitHub Pages.

## Setup på GitHub

1. Skapa ett nytt repo, t.ex. `famcal`
2. Ladda upp **alla 5 filer** till repo-roten:
   - `index.html`
   - `sw.js`
   - `manifest.json`
   - `icon-192.svg`
   - `icon-512.svg`
3. Gå till **Settings → Pages**
4. Under *Build and deployment*: välj branch `main`, mapp `/root`
5. Klicka **Save** — vänta ~1 minut
6. Din app finns på: `https://DITT-NAMN.github.io/famcal/`

## Installera som app

**iPhone/iPad (Safari):**  
Dela-knappen → *Lägg till på hemskärmen*

**Android (Chrome):**  
Meny → *Installera app* eller *Lägg till på hemskärmen*

## All data lagras lokalt

Data lagras i IndexedDB på varje enhet separat.  
För att synka: Inställningar → Data → Exportera → skicka JSON-filen till annan enhet → Importera.
