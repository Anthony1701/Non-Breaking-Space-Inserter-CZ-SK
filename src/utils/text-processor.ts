import * as vscode from 'vscode';

export class TextProcessor {
    constructor() {}

    public processText(text: string): string {
        const config = vscode.workspace.getConfiguration('nbspInserter');
        const enableCzech = config.get<boolean>('enableCzechRules', true);
        const enableSlovak = config.get<boolean>('enableSlovakRules', true);
        const autoDetect = config.get<boolean>('autoDetectLanguage', true);

        let processedText = text;

        if (autoDetect) {
            const language = this.detectLanguage(text);
            if (language === 'czech' && enableCzech) {
                processedText = this.applyCzechRules(processedText);
            } else if (language === 'slovak' && enableSlovak) {
                processedText = this.applySlovakRules(processedText);
            } else {
                // Apply both if language cannot be determined
                if (enableCzech) {
                    processedText = this.applyCzechRules(processedText);
                }
                if (enableSlovak) {
                    processedText = this.applySlovakRules(processedText);
                }
            }
        } else {
            if (enableCzech) {
                processedText = this.applyCzechRules(processedText);
            }
            if (enableSlovak) {
                processedText = this.applySlovakRules(processedText);
            }
        }

        return processedText;
    }

    private applyCzechRules(text: string): string {
        let result = text;

        // 1. Jednopísmenné předložky a spojky
        result = result.replace(/\b([ksvzouia])\s+(?=\w)/gi, '$1&nbsp;');

        // 2. Číslovky a jednotky
        result = result.replace(/(\d+(?:[.,]\d+)?)\s+(kg|g|mg|t|l|ml|dl|m|cm|mm|km|°C|°F|%|Kč|€|USD|CZK|EUR|str|s|obr|min|h|hod)/gi, '$1&nbsp;$2');
        
        // Měny se symbolem před číslem
        result = result.replace(/(\$)\s+(\d+)/gi, '$1&nbsp;$2');

        // 3. Tituly a iniciály
        // Akademické tituly
        result = result.replace(/\b(PhDr|Mgr|Ing|MUDr|JUDr|RNDr|ThDr|doc|prof|Dr|PhD)\.\s+([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-záčďéěíňóřšťúůýž]+)/g, '$1.&nbsp;$2');
        
        // Vojenské a funkční tituly
        result = result.replace(/\b(plk|mjr|kpt|npor|por|ředitel|náměstek|vedoucí)\.\s+([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])/g, '$1.&nbsp;$2');
        
        // Iniciály
        result = result.replace(/\b([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])\.\s+([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-záčďéěíňóřšťúůýž]+)/g, '$1.&nbsp;$2');

        // 4. Data a čas
        // Datum s tečkami
        result = result.replace(/(\d{1,2})\.\s+(\d{1,2})\.\s+(\d{4})/g, '$1.&nbsp;$2.&nbsp;$3');
        
        // Datum s měsíci
        result = result.replace(/(\d{1,2})\.\s+(ledna|února|března|dubna|května|června|července|srpna|září|října|listopadu|prosince)\s+(\d{4})/gi, '$1.&nbsp;$2&nbsp;$3');
        
        // Čas s dvojtečkou
        result = result.replace(/(\d{1,2}):(\d{2})\s+(hod|h)/gi, '$1:$2&nbsp;$3');
        
        // Číselné rozsahy s jednotkami
        result = result.replace(/(\d+)–(\d+)\s+(kg|g|m|cm|h|hod|%|Kč|€)/gi, '$1–$2&nbsp;$3');

        // 5. České zkratky
        result = result.replace(/\s+(atd|apod|tzn|např|resp|tj|tzv|popř|aj)\./gi, '&nbsp;$1.');

        // 6. Telefonní čísla
        result = result.replace(/(\+\d{3})\s+(\d{3})\s+(\d{3})\s+(\d{3})/g, '$1&nbsp;$2&nbsp;$3&nbsp;$4');
        result = result.replace(/(\d{4})\s+(\d{3})\s+(\d{3})/g, '$1&nbsp;$2&nbsp;$3');

        // 7. Matematické zápisy
        result = result.replace(/(\d+)\s+([+\-×÷=])\s+(\d+)/g, '$1&nbsp;$2&nbsp;$3');
        result = result.replace(/(\d+)\s+\/\s+(\d+)/g, '$1&nbsp;/&nbsp;$2');

        // 8. Speciální případy
        // Paragrafy
        result = result.replace(/(§)\s+(\d+)/g, '$1&nbsp;$2');
        result = result.replace(/\b(odst)\.\s+(\d+)/gi, '$1.&nbsp;$2');
        
        // Římské číslice
        result = result.replace(/\b([IVX]+)\.\s+(světová|století)/gi, '$1.&nbsp;$2');
        
        // Číslované seznamy
        result = result.replace(/^(\d+)\.\s+/gm, '$1.&nbsp;');

        return result;
    }

    private applySlovakRules(text: string): string {
        let result = text;

        // 1. Jednopísmenné předložky a spojky (stejné jako čeština)
        result = result.replace(/\b([ksvzouia])\s+(?=\w)/gi, '$1&nbsp;');

        // 2. Číslovky a jednotky
        result = result.replace(/(\d+(?:[.,]\d+)?)\s+(kg|g|mg|t|l|ml|dl|m|cm|mm|km|°C|°F|%|€|USD|EUR|str|s|obr|min|h|hod)/gi, '$1&nbsp;$2');
        
        // Měny se symbolem před číslem
        result = result.replace(/(\$)\s+(\d+)/gi, '$1&nbsp;$2');

        // 3. Tituly a iniciály
        // Akademické tituly
        result = result.replace(/\b(PhDr|Mgr|Ing|MUDr|JUDr|RNDr|ThDr|doc|prof|Dr|PhD)\.\s+([A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ][a-záäčďéíĺľňóôŕšťúýž]+)/g, '$1.&nbsp;$2');
        
        // Vojenské a funkční tituly
        result = result.replace(/\b(plk|mjr|kpt|npor|por|riaditeľ|námestník|vedúci)\.\s+([A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ])/g, '$1.&nbsp;$2');
        
        // Iniciály
        result = result.replace(/\b([A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ])\.\s+([A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ][a-záäčďéíĺľňóôŕšťúýž]+)/g, '$1.&nbsp;$2');

        // 4. Data a čas
        // Datum s tečkami
        result = result.replace(/(\d{1,2})\.\s+(\d{1,2})\.\s+(\d{4})/g, '$1.&nbsp;$2.&nbsp;$3');
        
        // Datum s měsíci
        result = result.replace(/(\d{1,2})\.\s+(januára|februára|marca|apríla|mája|júna|júla|augusta|septembra|októbra|novembra|decembra)\s+(\d{4})/gi, '$1.&nbsp;$2&nbsp;$3');
        
        // Čas s dvojtečkou
        result = result.replace(/(\d{1,2}):(\d{2})\s+(hod|h)/gi, '$1:$2&nbsp;$3');
        
        // Číselné rozsahy s jednotkami
        result = result.replace(/(\d+)–(\d+)\s+(kg|g|m|cm|h|hod|%|€)/gi, '$1–$2&nbsp;$3');

        // 5. Slovenské zkratky
        result = result.replace(/\s+(atď|napr|tzn|resp|tj|tzv|príp|aj)\./gi, '&nbsp;$1.');

        // 6. Telefonní čísla
        result = result.replace(/(\+\d{3})\s+(\d{3})\s+(\d{3})\s+(\d{3})/g, '$1&nbsp;$2&nbsp;$3&nbsp;$4');
        result = result.replace(/(\d{4})\s+(\d{3})\s+(\d{3})/g, '$1&nbsp;$2&nbsp;$3');

        // 7. Matematické zápisy
        result = result.replace(/(\d+)\s+([+\-×÷=])\s+(\d+)/g, '$1&nbsp;$2&nbsp;$3');
        result = result.replace(/(\d+)\s+\/\s+(\d+)/g, '$1&nbsp;/&nbsp;$2');

        // 8. Speciální případy
        // Paragrafy
        result = result.replace(/(§)\s+(\d+)/g, '$1&nbsp;$2');
        result = result.replace(/\b(odst)\.\s+(\d+)/gi, '$1.&nbsp;$2');
        
        // Římské číslice
        result = result.replace(/\b([IVX]+)\.\s+(svetová|storočie)/gi, '$1.&nbsp;$2');
        
        // Číslované seznamy
        result = result.replace(/^(\d+)\.\s+/gm, '$1.&nbsp;');

        return result;
    }

    private detectLanguage(text: string): 'czech' | 'slovak' | 'unknown' {
        // Rozšířená detekce jazyka
        const czechIndicators = [
            'např', 'apod', 'Kč', 'že', 'který', 'která', 'které', 'ř', 'ů', 'ě',
            'ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
        ];
        const slovakIndicators = [
            'napr', 'atď', '€', 'že', 'ktorý', 'ktorá', 'ktoré', 'ľ', 'ô', 'ä',
            'januára', 'februára', 'marca', 'apríla', 'mája', 'júna', 'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra'
        ];

        let czechScore = 0;
        let slovakScore = 0;

        for (const indicator of czechIndicators) {
            const matches = text.match(new RegExp(`\\b${indicator}\\b`, 'gi'));
            if (matches) {
                czechScore += matches.length;
            }
        }

        for (const indicator of slovakIndicators) {
            const matches = text.match(new RegExp(`\\b${indicator}\\b`, 'gi'));
            if (matches) {
                slovakScore += matches.length;
            }
        }

        if (czechScore > slovakScore) {
            return 'czech';
        } else if (slovakScore > czechScore) {
            return 'slovak';
        } else {
            return 'unknown';
        }
    }
}
