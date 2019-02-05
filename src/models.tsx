export interface IMsgs {
    type: 'text' | 'menu';
    msg: string;
    from: 'bot' | 'user';
    links?: string[];
    intent?: string;
    suggestions?: string[];
}