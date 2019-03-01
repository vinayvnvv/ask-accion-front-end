import * as React from 'react';
import './index.css';
import { IMsgs } from './../../../models';

interface IProps {
    msg: IMsgs
    onSendText?: any
}

export class PeopleList extends React.Component<IProps, any> {

    onSendText = (email: string) => {
        if(this.props.onSendText) this.props.onSendText(email);
    }

    render() {
        return(
            <div className={"chat-holder PeopleList " + this.props.msg.from}>
                {this.props.msg.peopleList && this.props.msg.peopleList.map((poeple, index) => 
                    <div className="_list" key={index} onClick={this.onSendText.bind(this, poeple.EmailID)}>
                        <div className="_left">
                            <img src={poeple.Photo} alt="avtar"/>
                        </div>
                        <div className="_right">
                            <div className="_nm">{poeple.FirstName} {poeple.LastName}</div>
                            <div className="_mail">{poeple.EmailID}</div>
                        </div>
                    </div>
                )}
            </div>  
        );
    }
}