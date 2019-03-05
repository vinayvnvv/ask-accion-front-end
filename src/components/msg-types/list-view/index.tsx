import * as React from 'react';
import './index.css';
import { IMsgs, IListView } from '../../../models';

interface IProps {
    msg: IMsgs;
    onSendText?: any
}

export class ListView extends React.Component<IProps, any> {

    onSendText = (item: string) => {
        if(this.props.onSendText) this.props.onSendText(item);
    }

    render() {
        return(
            <div className="MsgTypeListView">
                {this.props.msg.listView && this.props.msg.listView.map((item: IListView, index) =>
                    <div className={"_items" + (item.disableClick ? ' disabled ' : '')} 
                        key={index} 
                        onClick={this.onSendText.bind(this, item)}>
                        <div className="_title">{item.title}</div>
                        {item.desc && <div className="_desc">{item.desc}</div>}
                    </div>
                )}
            </div>
        );
    }

}
