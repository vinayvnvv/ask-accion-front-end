import * as React from 'react';
import './LinkType.css';

interface IProps {
    links: string[],
    type: 'url' | 'phone-number'
}

export class LinkType extends React.Component<IProps, any> {
    render() {
        return(
            <div className={"LinkType"}>
                {this.props.links.map((item, index) =>
                    <div key={index}>
                        {this.props.type === 'url' && (
                            <a target="_blank" key={index} href={item} className="_item">
                                <i className="material-icons">exit_to_app</i>
                                <span>{item}</span>
                            </a>
                        )}

                        {this.props.type === 'phone-number' && (
                            <a target="_blank" key={index} href={"tel:" + item} className="_item">
                                <i className="material-icons">local_phone</i>
                                <span>{item}</span>
                            </a>
                        )}
                    </div>
                    
                )}
            </div>  
        );
    }
}