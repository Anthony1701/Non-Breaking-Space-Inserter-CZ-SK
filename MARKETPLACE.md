# Non-Breaking Space Inserter CZ/SK

Insert non-breaking spaces (`&nbsp;`) automatically, following Czech and Slovak
typographic rules — so single-letter prepositions never end up dangling at the end
of a line.

Select some text, press `Ctrl+Shift+Space` (`Cmd+Shift+Space` on Mac), and the
whole selection is fixed at once.

## What it does

**Before**

```
Jdu k obchodu a koupím si 5 kg jablek. Bude to stát asi 100 Kč.
Setkáme se v 15 h na náměstí atd.
```

**After**

```
Jdu k&nbsp;obchodu a&nbsp;koupím si 5&nbsp;kg jablek. Bude to stát asi 100&nbsp;Kč.
Setkáme se v&nbsp;15&nbsp;h na náměstí&nbsp;atd.
```

## Rules

Both languages are covered, and the extension detects which one you are writing.

| | Czech | Slovak |
|---|---|---|
| Single-letter prepositions | k, s, v, z, o, u, i, a | k, s, v, z, o, u, i, a |
| Numbers with units | 5 kg → 5&nbsp;kg | 5 kg → 5&nbsp;kg |
| Currency | 100 Kč → 100&nbsp;Kč | 100 € → 100&nbsp;€ |
| Abbreviations | atd., apod., např., tzn., resp., tj., tzv., popř. | atď., napr., tzn., resp., tj., tzv., príp. |
| Time | 10 h, 30 min, 14:15 h | 10 h, 30 min, 14:15 h |
| Dates | 1. 1. 2025, 1. ledna 2025 | 1. 1. 2025, 1. januára 2025 |
| Titles and initials | Mgr., Ing., doc., prof., J. Novák | Mgr., Ing., doc., prof., J. Novák |
| Number ranges | 10–15 kg, 1990–2000 | 10–15 kg, 1990–2000 |

## Commands

Open the Command Palette (`Ctrl+Shift+P`) and type **NBSP**:

| Command | Scope |
|---|---|
| Insert &nbsp; in Selection | Selected text — also bound to `Ctrl+Shift+Space` / `Cmd+Shift+Space` |
| Insert &nbsp; in Current Line | The line the cursor is on |
| Insert &nbsp; in Entire Document | The whole file |

## Settings

| Setting | Default | Description |
|---|---|---|
| `nbspInserter.enableCzechRules` | `true` | Apply Czech typographic rules |
| `nbspInserter.enableSlovakRules` | `true` | Apply Slovak typographic rules |
| `nbspInserter.autoDetectLanguage` | `true` | Detect the language and apply the matching rule set |

With `autoDetectLanguage` turned off, both enabled rule sets are applied to every
piece of text.

## Where it works

Any text-based file — HTML, Latte templates, Markdown, plain text, and anything else
you open in the editor.

## Feedback

Bug reports and ideas are welcome on
[GitHub](https://github.com/Anthony1701/Non-Breaking-Space-Inserter-CZ-SK/issues).

Licensed under the MIT License.
