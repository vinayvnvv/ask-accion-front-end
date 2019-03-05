import { ICard } from './services';
export interface IMsgs {
    type: 'text' | 'menu' | 'card' | 'people-list' | 'list';
    msg: string;
    from: 'bot' | 'user';
    links?: string[];
    intent?: string;
    suggestions?: string[];
    card?: ICard;
    peopleList?: any[];
    resetSession?: boolean;
    phoneNumber?: string[];
    menu?: IMenu[];
    list?: string[];
}

export interface IMenu {
    icon?: string;
    name: string;
    desc?: string;
}