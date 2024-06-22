// deps
import { v2 } from "@google-cloud/translate";
import config from "./config.json" with { type: "json" };

const translate = new v2.Translate({
    projectId: config.translateProject,
    key: config.translateAPIKey,
});

async function translateFunc({ text, tl }) {
    const [translation] = await translate.translate(text, tl.toLowerCase());
    console.log(`Translation module was called.
Text: ${text}
Target language: ${tl}
Translation: ${translation}`);
    return `"${text}" in ${target} is: ${tl}`;
}

export default {
    title: "translate",
    function: translateFunc,
    description:
        "Uses Google Translate to translate a text to a target language.",
    args: {
        text: "The text to translate.",
        tl: "The target language, as a two-letter language code.",
    },
};
