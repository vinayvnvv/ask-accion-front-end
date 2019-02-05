import * as React from 'react';
import './ChatContainer.css';
import { IMsgs } from './../../models';
import { TextType } from './../msg-types';


interface IProps {
    msgs: IMsgs[];
}


export class ChatContainer extends React.Component<IProps, any> {

    render() {
        return(
            <div className="ChatContainer">
                    {this.props.msgs.map((msg: IMsgs, index) =>
                        <div className="ChatMsgContainer" key={index}>
                            {msg.type == 'text' && <TextType msg={msg} />}
                        </div>
                    )}
            </div>  
        );
    }
}