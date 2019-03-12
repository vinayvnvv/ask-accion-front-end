import * as React from 'react';
import './index.css';
import { IMsgs, IPeopleListCard } from './../../../models';

interface IProps {
    msg: IMsgs
    onSendText?: any
}

export class PeopleListCard extends React.Component<IProps, any> {

    onSendText = (text: any) => {
        if(this.props.onSendText && text) this.props.onSendText(text);
    }

    render() {
        return(
            <div className={"chat-holder PeopleListCard " + this.props.msg.from}>
                {this.props.msg.peopleListCard && this.props.msg.peopleListCard.map((poeple: IPeopleListCard, index) => 
                    <div 
                        className={"_list " + (!poeple.onClickText ? ' disabled ' : '')}
                        key={index} 
                        onClick={this.onSendText.bind(this, poeple.onClickText)}>
                        <div className="_left">
                            <img src={poeple.photo} alt="avtar"/>
                        </div>
                        <div className="_right">
                            <div className="_nm">{poeple.name}</div>
                            <div className="_mail">{poeple.email}</div>

                            {poeple.desc &&  poeple.desc.length > 0 && (
                                <div className="_desc">
                                    {poeple.desc.map((item, index1) =>
                                        <div key={index1}>{item}</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>  
        );
    }
}