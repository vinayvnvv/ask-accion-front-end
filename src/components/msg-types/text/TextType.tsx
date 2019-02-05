import * as React from 'react';
import './TextType.css';
import { IMsgs } from './../../../models';
import { LinkType } from './../link/LinkType';

interface IProps {
    msg: IMsgs
}

export class TextType extends React.Component<IProps, any> {
    render() {
        return(
            <div className={"TextType " + this.props.msg.from + (this.props.msg.links && this.props.msg.links.length>0 ? ' has-footer ' : '')}>
                <div className="_text">
                    <div dangerouslySetInnerHTML={{__html: this.props.msg.msg}} />
                    {this.props.msg.links && this.props.msg.links.length>0 && (
                        <LinkType links={this.props.msg.links} />
                    )}
                </div>
            </div>  
        );
    }
}