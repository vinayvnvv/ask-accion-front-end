export interface IMsgParser {
    text?: string;
    links?: string[];
}
class ParserClass {
    parseText(text: string) {
        const parsed: IMsgParser = {};
        const parsedUrls = this.parseUrls(text);
        text = parsedUrls.text;
        if(parsedUrls.links.length > 0) parsed.links = parsedUrls.links;
        
        parsed.text = text;
        return parsed;
    }

    parseUrls(text: string) {
        const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        const regex = new RegExp(expression);
        const links: string[] = [];
        text = text.replace(regex, ($1: string) => {
            links.push($1);
            return "<a href='" + $1 + "' target='_blank'>" + $1 + "</a>";
        });
        return {text, links};
    }
}
export const Parser = new ParserClass();