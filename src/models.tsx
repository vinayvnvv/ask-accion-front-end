import { ICard } from './services';
export interface IMsgs {
    type: 'text' | 'menu' | 'card' | 'people-list';
    msg: string;
    from: 'bot' | 'user';
    links?: string[];
    intent?: string;
    suggestions?: string[];
    card?: ICard;
    peopleList?: any[];
    resetSession?: boolean;
}