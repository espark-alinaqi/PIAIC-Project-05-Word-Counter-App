import inquirer from 'inquirer';

interface WordCountSummary {
    words: number;
    characters: number;
    lines: number;
}

export async function startWordCounterApp() {
    console.log('Welcome to the Enhanced Word Counter App!');

    while (true) {
        const { text } = await inquirer.prompt({
            type: 'editor',
            name: 'text',
            message: 'Enter the text to count words, characters, and lines:'
        });

        const wordCountSummary = countWordsCharactersLines(text);
        displaySummary(wordCountSummary);

        const { continueCounting } = await inquirer.prompt({
            type: 'confirm',
            name: 'continueCounting',
            message: 'Do you want to count in another text?',
            default: true
        });

        if (!continueCounting) {
            console.log('Thank you for using the Word Counter App. Goodbye!');
            process.exit(0);
        }
    }
}

function countWordsCharactersLines(text: string): WordCountSummary {
    const words = text.split(/\s+/).filter((word) => word !== '');
    const characters = text.length;
    const lines = text.split('\n').filter((line) => line.trim() !== '').length;

    return { words: words.length, characters, lines };
}

function displaySummary(summary: WordCountSummary): void {
    console.log('\n--- Word Count Summary ---');
    console.log(`Words: ${summary.words}`);
    console.log(`Characters: ${summary.characters}`);
    console.log(`Lines: ${summary.lines}`);
    console.log('-------------------------\n');
}
