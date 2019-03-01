import * as React from 'react';
import { IMsgs } from './../../../../models';
import { ICard } from './../../../../services';

interface IProps {
    msg: IMsgs;
}
export class CardType1 extends React.Component<IProps, any> {
    render() {
        const data: ICard = this.props.msg.card || {};
        return(
            <div className={"chat-holder " + this.props.msg.from}>
                <div className={"chat-msg-item"}>
                    <div className="card-template-1 card">
                        {data.title && (
                            <div className="card-title">{data.title === '' ? 'Card Title' : data.title}</div>
                        )}
                        {data.content&& (
                            <div className="card-content">{data.content === '' ? "Card Content" : data.content}</div>
                        )}
                        {(data.actions && data.actions.length > 0) && (
                            <div className="card-actions">
                                {data.actions[0] && (
                                    <div className="card-action-item">{data.actions[0].label}</div>
                                )}
                                {data.actions[1] && (
                                    <div className="card-action-item">{data.actions[1].label}</div>
                                )}
                            </div>
                        )}
                     </div>
                </div>
            </div>
        );
    }
} 