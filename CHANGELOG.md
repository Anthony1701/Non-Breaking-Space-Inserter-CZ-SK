# Change Log

All notable changes to this project will be documented in this file.

## [1.0.1] - 2026-09-04

### Added
- Extension icon

### Changed
- Added a `LICENSE` file (MIT) that was previously only declared in `package.json`
- Removed the deprecated `activationEvents` entries — VS Code generates them from
  `contributes.commands` since 1.74

## [1.0.0] - 2025-08-22

### Added
- **Complete typographic rules implementation** for Czech and Slovak languages
- **Single-letter prepositions and conjunctions**: k, s, v, z, o, u, i, a
- **Numbers with units**: kg, g, mg, t, l, ml, dl, m, cm, mm, km, °C, °F, %, str., s., obr., min, h, hod
- **Currency formatting**: Kč, €, USD, CZK, EUR, $ (including symbol before number: $ 100)
- **Academic and professional titles**: PhDr., Mgr., Ing., MUDr., JUDr., RNDr., ThDr., doc., prof., Dr., PhD
- **Military and functional titles**: plk., mjr., kpt., npor., por., ředitel, náměstek, vedoucí
- **Initials**: J. Novák, A. Svoboda, M. Dvořák
- **Enhanced date formatting**: 
  - Numeric dates: 1. 1. 2025, 15. 12. 2024
  - Czech months: 1. ledna 2025, 15. února 2024
  - Slovak months: 1. januára 2025, 15. februára 2024
- **Time expressions**: 10:30 hod, 14:15 h, 23:59 hod
- **Number ranges**: 10–15 kg, 1990–2000, 8:00–12:00 h
- **Phone numbers**: +420 123 456 789, 0903 123 456
- **Mathematical expressions**: 5 + 7 = 12, 10 × 5, 1 / 2
- **Legal references**: § 10, odst. 5
- **Roman numerals**: II. světová válka, XVIII. století
- **Numbered lists**: 1. položka, 2. položka
- **Extended abbreviations**: 
  - Czech: atd., apod., tzn., např., resp., tj., tzv., popř., aj.
  - Slovak: atď., napr., tzn., resp., tj., tzv., príp., aj.

### Technical Features
- **Advanced language detection** with extended indicators including diacritics and month names
- **Comprehensive regex patterns** covering all typographic scenarios
- **Modular architecture** with separate Czech and Slovak rule sets
- **TypeScript implementation** with full type safety
- **VS Code API integration** with three application modes
- **Configuration system** for rule customization
- **Extensive test coverage** with comprehensive test file

### User Interface
- **Three commands**: apply to selection, entire document, or current line
- **Keyboard shortcut**: Ctrl+Shift+Space (Cmd+Shift+Space on Mac)
- **Command Palette integration**: Easy access to all commands
- **Configuration options**: Enable/disable Czech/Slovak rules, auto-detection

### Documentation
- **Complete English documentation** ready for GitHub publication
- **Comprehensive test file** covering all typographic rules
- **Professional README** with examples and installation instructions
- **Detailed changelog** with technical specifications

### Supported File Formats
- All text-based files (HTML, Latte templates, Markdown, plain text, etc.)
- Universal compatibility with any text content in VS Code
