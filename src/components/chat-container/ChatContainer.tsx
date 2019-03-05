import * as React from 'react';
import './ChatContainer.css';
import { IMsgs } from './../../models';
import { TextType } from './../msg-types';
import { CardType1 } from './../msg-types/cards/card-1/CardType1';
import { PeopleList } from './../msg-types/poeple-list';
import { Menu } from './../msg-types/menu';
import { List } from './../msg-types/list';


interface IProps {
    msgs: IMsgs[];
    onSendText?: any;
}


export class ChatContainer extends React.Component<IProps, any> {

    render() {
        return(
            <div className="ChatContainer">
                    {this.props.msgs.map((msg: IMsgs, index) =>
                        <div className="ChatMsgContainer" key={index}>
                            {msg.msg && msg.type !== 'text' && <TextType msg={msg} />}
                            {msg.type == 'text' && <TextType msg={msg} />}
                            {msg.type == 'card' && <CardType1 msg={msg} />}
                            {msg.type == 'people-list' && <PeopleList msg={msg} onSendText={this.props.onSendText}/>}
                            {msg.type == 'menu' && <Menu msg={msg} onSendText={this.props.onSendText}/>}
                            {msg.type == 'list' && <List msg={msg} onSendText={this.props.onSendText}/>}
                        </div>
                    )}
            </div>  
        );
    }
}