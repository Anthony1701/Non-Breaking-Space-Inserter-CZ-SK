# Non-Breaking Space Inserter CZ/SK

A VS Code extension that automatically inserts non-breaking spaces (&nbsp;) according to Czech and Slovak typographic rules.

## Features

The extension automatically inserts `&nbsp;` in the correct places in text according to typographic rules:

### Czech Rules
- **Single-letter prepositions**: k, s, v, z, o, u, i, a
- **Numbers with units**: 5 kg → 5&nbsp;kg, 100 Kč → 100&nbsp;Kč
- **Czech abbreviations**: atd., apod., např., tzn., resp., tj., tzv., popř.
- **Time expressions**: 10 h → 10&nbsp;h, 30 min → 30&nbsp;min
- **Dates**: 1. 1. 2024 → 1.&nbsp;1.&nbsp;2024

### Slovak Rules
- **Single-letter prepositions**: k, s, v, z, o, u, i, a
- **Numbers with units**: 5 kg → 5&nbsp;kg, 100 € → 100&nbsp;€
- **Slovak abbreviations**: atď., napr., tzn., resp., tj., tzv., príp.
- **Time expressions**: 10 h → 10&nbsp;h, 30 min → 30&nbsp;min
- **Dates**: 1. 1. 2024 → 1.&nbsp;1.&nbsp;2024

## Usage

### Commands
- **Insert &nbsp; in Selection** - Applies rules to selected text
- **Insert &nbsp; in Entire Document** - Applies rules to the entire document
- **Insert &nbsp; in Current Line** - Applies rules to the current line

### Keyboard Shortcuts
- `Ctrl+Shift+Space` (Windows/Linux) or `Cmd+Shift+Space` (Mac) - Applies rules to selected text

### Command Palette
1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "NBSP" and select the desired command

## Configuration

The extension can be configured in VS Code settings:

```json
{
  "nbspInserter.enableCzechRules": true,
  "nbspInserter.enableSlovakRules": true,
  "nbspInserter.autoDetectLanguage": true
}
```

### Settings
- `enableCzechRules` - Enable Czech typographic rules (default: true)
- `enableSlovakRules` - Enable Slovak typographic rules (default: true)
- `autoDetectLanguage` - Automatically detect language and apply appropriate rules (default: true)

## Examples

### Before applying
```
Jdu k obchodu a koupím si 5 kg jablek. Bude to stát asi 100 Kč.
Setkáme se v 15 h na náměstí atd.
```

### After applying
```
Jdu k&nbsp;obchodu a&nbsp;koupím si 5&nbsp;kg jablek. Bude to stát asi 100&nbsp;Kč.
Setkáme se v&nbsp;15&nbsp;h na náměstí&nbsp;atd.
```

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Non-Breaking Space Inserter"
4. Click Install

### Manual Installation
1. Download the `.vsix` file from releases
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X)
4. Click on the "..." menu and select "Install from VSIX..."
5. Select the downloaded `.vsix` file

## Development

### Requirements
- Node.js
- npm
- VS Code

### Building
```bash
npm install
npm run compile
```

### Testing
1. Open the project in VS Code
2. Press F5 to launch Extension Development Host
3. Test the extension in the new VS Code window

### Packaging
```bash
npm install -g vsce
vsce package
```

## Supported File Types

The extension works with all text-based files including:
- HTML
- Latte templates
- Markdown
- Plain text
- And any other text files

## Language Detection

The extension can automatically detect whether the text is Czech or Slovak based on specific language indicators and apply the appropriate rules. This can be disabled in settings if you prefer to apply both rule sets.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Author

Created for easy compliance with Czech and Slovak typographic rules in VS Code.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.
