import * as React from 'react';
import './index.css';
import { IMsgs } from './../../../models';

interface IProps {
    msg: IMsgs;
    onSendText?: any
}

export class List extends React.Component<IProps, any> {

    onSendText = (item: string) => {
        if(this.props.onSendText) this.props.onSendText(item);
    }

    render() {
        return(
            <div className="MsgTypeList">
                {this.props.msg.list && this.props.msg.list.map((item, index) =>
                    <div className="_items" key={index} onClick={this.onSendText.bind(this, item)}>
                        {item}
                    </div>
                )}
            </div>
        );
    }

}
