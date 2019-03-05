import * as React from 'react';
import './index.css';
import { IMsgs, IMenu } from './../../../models';

interface IProps {
    msg: IMsgs;
    onSendText?: any
}

export class Menu extends React.Component<IProps, any> {

    onSendText = (item: IMenu) => {
        if(this.props.onSendText) this.props.onSendText("Help me with " + item.name);
    }

    render() {
        return(
            <div className="MsgTypeMenu">
                {this.props.msg.menu && this.props.msg.menu.map((item, index) =>
                    <div className="_items" key={index} onClick={this.onSendText.bind(this, item)}>
                        <div className="_left">
                            <i className="material-icons">{item.icon ? item.icon : 'help'}</i>
                        </div>
                        <div className="_right">
                            <div className="_name">{item.name}</div>
                            {item.desc && <div className="_desc">{item.desc}</div>}
                        </div>
                    </div>
                )}
            </div>
        );
    }

}
