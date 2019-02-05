import * as React from 'react';
import './LinkType.css';

interface IProps {
    links: string[]
}

export class LinkType extends React.Component<IProps, any> {
    render() {
        return(
            <div className={"LinkType"}>
                {this.props.links.map((item, index) =>
                    <a target="_blank" key={index} href={item} className="_item">
                        <i className="material-icons">exit_to_app</i>
                        <span>{item}</span>
                    </a>
                )}
            </div>  
        );
    }
}