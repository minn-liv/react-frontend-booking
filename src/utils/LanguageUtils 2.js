import messages_vi from "../translation/vi.json";
import messages_en from "../translation/en.json";

const flattenMessages = (nestedMessages, prefix = "") => {
    if (nestedMessages == null) {
        return {};
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "string") {
            Object.assign(messages, { [prefixedKey]: value });
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
};

const messages = {
    vi: flattenMessages(messages_vi),
    en: flattenMessages(messages_en),
};

export default class LanguageUtils {
    static getFlattenedMessages() {
        return messages;
    }
}
