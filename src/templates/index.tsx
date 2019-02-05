import * as React from 'react';
import './index.css';

interface ICard1 {
    title: string;
    content: string;
    actions: string[];
}

interface IState {
    card1: ICard1;
}

export class Templates extends React.Component<any, IState> {
    state: IState = {
        card1: {title: 'Card Title', content: 'Card Content', actions: ['view', 'open']}
    }

    onInputValueChange = (card: string, field: string, e: any) =>  {
        const temp = this.state[card];
        const match = field.match(/([a-zA-Z0-9_]+)\[(.*)\]/);
        if(match) {
            temp[match[1]][match[2]] = e.target.value;
        } else {
            temp[field] = e.target.value;
        }
        this.setState({card1: temp});
    }
    render() {
        return (
            <div className="Templates">
                <div className="_toolbar">
                    <div className="_ttl">Templates</div>
                </div>
                <div className="_container">
                    <div className="_section">
                        <div className="_ttl">
                            Card 1
                        </div>
                        <div className="_editor">
                            <div className="_inputs">
                                <div className="_ttl">Inputs</div>
                                <div className="_content">
                                    <div className="input-section">
                                        <label>Title</label>
                                        <input 
                                            placeholder="Enter Title" 
                                            onChange={this.onInputValueChange.bind(this, 'card1', 'title')} 
                                            value={this.state.card1.title} />
                                    </div>
                                    <div className="input-section">
                                        <label>Content</label>
                                        <textarea 
                                            onChange={this.onInputValueChange.bind(this, 'card1', 'content')}
                                            value={this.state.card1.content}
                                            placeholder="Enter Content" 
                                            rows={3} />
                                    </div>
                                    <div className="input-section">
                                        <label>Actions</label>
                                        <div>
                                            <input 
                                                placeholder="Action 1"
                                                onChange={this.onInputValueChange.bind(this, 'card1', 'actions[0]')} 
                                                value={this.state.card1.actions[0]}
                                                style={{width: "100px"}} /><br/>
                                            <input 
                                                placeholder="Action 2" 
                                                onChange={this.onInputValueChange.bind(this, 'card1', 'actions[1]')}
                                                value={this.state.card1.actions[1]}
                                                style={{marginTop: '3px', width: "100px"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="_preview">
                                <div className="_ttl">Preview</div>
                                <div className="_content">
                                    <div className="card-template-1 card">
                                        {this.state.card1.title !== '' && (
                                            <div className="card-title">{this.state.card1.title === '' ? 'Card Title' : this.state.card1.title}</div>
                                        )}
                                        {this.state.card1.content !== '' && (
                                            <div className="card-content">{this.state.card1.content === '' ? "Card Content" : this.state.card1.content}</div>
                                        )}
                                        {!(this.state.card1.actions[0] === '' && this.state.card1.actions[1] === '') && (
                                            <div className="card-actions">
                                                {this.state.card1.actions[0] !== '' && (
                                                    <div className="card-action-item">{this.state.card1.actions[0] === '' ? 'Action 1' : this.state.card1.actions[0]}</div>
                                                )}
                                                {this.state.card1.actions[1] !== '' && (
                                                    <div className="card-action-item">{this.state.card1.actions[1] === '' ? 'Action 2' : this.state.card1.actions[1]}</div>
                                                )}
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="_output">
                                <div className="_ttl">Output</div>
                                <div className="_content">Content</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}