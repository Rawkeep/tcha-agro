# TCHA AGRO Business Center — Website & digitale Visitenkarte

Mehrsprachige (DE / EN / FR) Website samt digitaler Visitenkarte für die
**TCHA AGRO Business Center** (Togo): eigene Agrarproduktion auf über
11 Hektar (Hühnerfarm, Eier, Gemüse, Tierfutter) **und** internationaler
Handelsagent mit Door-to-Door-Abwicklung zwischen Europa, Afrika und Asien.

Reine statische Seite — **kein Build-Schritt nötig**, läuft sofort.

---

## 📂 Aufbau

```
index.html            → Hauptseite (Hero, Über uns, Produktion,
                         Global Sourcing, Ablauf, Sektoren, Kontakt)
visitenkarte.html     → Digitale Visitenkarte (+ vCard-Download)
assets/css/styles.css → Design-System (individuelle Palette)
assets/js/i18n.js     → Alle Texte in DE / EN / FR
assets/js/main.js     → Sprache, Navigation, Animationen, Formular
assets/img/           → Logo, Favicon, Social-Bild (alles SVG)
assets/tcha-agro.vcf  → vCard zum Speichern des Kontakts
```

---

## ✏️ Platzhalter ersetzen (wichtig!)

Alle noch einzutragenden Daten sind als `[…]` markiert und auf der Seite
**farblich hervorgehoben**. Bitte an folgenden Stellen ersetzen:

| Platzhalter | Dateien |
|---|---|
| `[Telefonnummer]` | `index.html`, `visitenkarte.html`, `assets/tcha-agro.vcf` |
| `[E-Mail-Adresse]` / `[E-Mail]` | `index.html`, `visitenkarte.html`, `assets/tcha-agro.vcf` |
| `[Straße & Nr.]` | `assets/js/i18n.js` (Schlüssel `contact.addressval`), `assets/tcha-agro.vcf` |
| `[SNIF-Nummer]` | `index.html`, `visitenkarte.html`, `assets/tcha-agro.vcf` |

**Tipp:** In `index.html` ist die E-Mail im Kontaktformular über das Attribut
`data-email="[E-Mail]"` (am `<form id="inquiry-form">`) gesetzt — dort die
echte Adresse eintragen, damit das Formular korrekt per E-Mail versendet.

Suchen-und-ersetzen über alle Dateien erledigt es in Sekunden, z. B.:
```bash
grep -rl '\[E-Mail\]' . | xargs sed -i 's/\[E-Mail\]/info@beispiel.tg/g'
```

---

## 🚀 Deployment (deploy-fertig)

Die Seite ist für **drei Wege** vorbereitet — einer genügt:

### Option A — GitHub Pages (empfohlen, schon eingerichtet)
1. Repo-Einstellungen → **Settings → Pages**
2. Bei **Build and deployment → Source**: **GitHub Actions** wählen.
3. Fertig. Der Workflow `.github/workflows/deploy.yml` veröffentlicht bei
   jedem Push automatisch. URL danach:
   `https://rawkeep.github.io/tcha-agro/`

   *Alternativ* (ohne Actions): Source auf *Deploy from a branch* →
   Branch `claude/tcha-agro-website-8gtoc9` / `/ (root)`. Die Datei
   `.nojekyll` ist bereits enthalten.

### Option B — Netlify
Repo verbinden → keine Build-Einstellungen nötig (`netlify.toml` liegt bei).
Veröffentlichung erfolgt sofort.

### Option C — Vercel
Repo importieren → Framework *Other* → `vercel.json` regelt den Rest.

---

## 🎨 Design

Bewusst **keine** Standard-Agrar-Grüntöne. Die Palette ist eigenständig:

- **Terrakotta** `#c0532f` — Erde, Westafrika
- **Tiefes Petrol** `#0f5c54` — Vertrauen, globale Weite
- **Ocker-Gold** `#d8a33c` — Ernte, Sonne
- **Pflaume** `#5b2a45` — Akzent & Tiefe
- auf warmem **Bone** `#f6efe3`

Schriften: *Fraunces* (charaktervolle Display-Serife) + *Space Grotesk*
(klare, moderne Grotesk). Feine Korn-Textur, organische Formen,
Routen-/Globus-Motive und sanfte Scroll-Animationen.

---

## 🌍 Sprachen

Umschaltung über **DE / EN / FR** oben rechts. Die Auswahl wird im Browser
gespeichert; zusätzlich wird die Browsersprache automatisch erkannt.
Neue Texte ausschließlich in `assets/js/i18n.js` pflegen (drei Blöcke).

---

> **Hinweis zur Marke:** Es gibt nur **eine** Marke — **TCHA AGRO Business
> Center** (Geflügelzucht & -verkauf, *Elevage et vente de volaille*). Die
> internationale Vermittlung ist kein eigener Untername, sondern wird als
> Tätigkeit „als Business Center" dargestellt: weltweit anfragen, Angebote
> einholen und Door-to-Door abwickeln — von Togo in alle Welt und aus
> aller Welt nach Togo/Westafrika. Alle Texte zentral in
> `assets/js/i18n.js` anpassbar.
