import { IMsgs } from 'src/models';
import { Auth, IProfile } from './auth.service';


export interface IMsgParser {
    text?: string;
    links?: string[];
}

interface IKeyVal {
    label: string;
    key: string;
}
export interface ICard {
    actions?: IKeyVal[];
    content?: string;
    templateId?: number;
    texts?: string[];
    title?: string;
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
    parseCards(str: string) {
        const match = str.match(/^\[card-1\](.*)\[\/card-1\]$/);
        if(!match) return false;
        const obj: ICard = {};
        const texts: string[] = [];
        console.log('parsing card...');
        str.replace(/(\[card-title\](.*)\[\/card-title\])/, ($1, $2, $3) => {
            console.log("$1:", $1, "$2:", $2, $3);
            obj['title'] = $3;
            texts.push($3);
            return $1;
        });
        str.replace(/(\[card-content\](.*)\[\/card-content\])/, ($1, $2, $3) => {
            console.log("$1:", $1, "$2:", $2, $3);
            obj['content'] = $3;
            texts.push($3);
            return $1;
        });
        str.replace(/(\[card-actions\](.*)\[\/card-actions\])/, ($1, $2, $3) => {
            console.log("$1:", $1, "$2:", $2, $3);
            try {
                obj['actions'] = JSON.parse($3);
                if(obj.actions) {
                    obj.actions.forEach((item) => {
                        texts.push(item.label); 
                    });
                }
            } catch(err) {
                console.error('Error in actions JSON string...');
            }
            
            return $1;
        });
        obj['texts'] = texts;
        obj['templateId'] = 1;
        return obj;
    }

    parseVars(msg: IMsgs) {
        let str = JSON.stringify(msg);
        const auth: IProfile = Auth.getAuth();
        str = str.replace(/\[\[([A-Za-z0-9]+)\]\]/g, ($1, $2) => {
            if($2 === 'firstName') return auth.givenName;
            else return "";
        });
        return JSON.parse(str);
    }
}
export const Parser = new ParserClass();