import { ICard } from './services';
export interface IMsgs {
    type: 'text' | 'menu' | 'card' | 'people-list' | 'list' | 'listView' | 'peopleListCard';
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
    listView?: IListView[];
    isCall?: boolean;
    peopleListCard?: IPeopleListCard[];
}

export interface IMenu {
    icon?: string;
    name: string;
    desc?: string;
}

export interface IListView {
    title: string;
    disableClick?: boolean;
    desc?: string; 
}

export interface IPeopleListCard {
    name: string;
    email: string;
    onClickText: string;
    photo?: string;
    desc?: string[];
}