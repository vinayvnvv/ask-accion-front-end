import * as React from 'react';
const uuidv4 = require('uuid/v4');
import { ChatContainer } from './chat-container/ChatContainer';
import { IMsgs } from './../models';
import SpeechToText from 'speech-to-text';
import { Socket } from './../socket';
import { Parser, IMsgParser } from './../services';
import { ChatSuggestion } from './chat-suggestion/ChatSuggestion';
const uuid = uuidv4();
interface IState {
    msgs: IMsgs[];
    inputText: string;
    scrollPos: number;
    isToolbar: boolean;
    isVoiceListening: boolean;
    voiceOnSaidMsg: any;
    voiceMsg: string;
    suggestions: string[];
}

export class ChatApp extends React.Component<any, IState> {
    state: IState = {
        msgs: [],
        inputText: '',
        scrollPos: 0,
        isToolbar: true,
        isVoiceListening: false,
        voiceOnSaidMsg: null,
        voiceMsg: '',
        suggestions: []
    };
    scroller = React.createRef<HTMLDivElement>();
    scrollPos: number = 0;
    speechListener: any;
	speechListenerTimeout: any = {
		max: 4,
		count: 0
	}
	speechListenerIntervalInstance: any;

    componentDidMount() {
        if(this.scroller && this.scroller.current) this.scroller.current.addEventListener('scroll', this.onContainerScroll);
        this.listenSockets();
    }

    listenSockets() {
        Socket.onMessage((msg: IMsgs) => {
            this.pushMsgs(msg);
        });
    }

    sendMsg(data: any) {
        Socket.emitMessage(data);
    }

    componentWillUnmount() {
        clearInterval(this.speechListenerIntervalInstance);
    }
    onContainerScroll = (e) => {
        const scrolled = e.target.scrollTop;
        if(scrolled < 52) {
            this.scrollPos = scrolled;
            this.setState({
                scrollPos: scrolled
            })
            return;
        };
        if(this.scrollPos < scrolled) this.setState({
           isToolbar: false,
           scrollPos: scrolled 
        })
        else this.setState({
            isToolbar: true,
            scrollPos: scrolled 
         })
        this.scrollPos = scrolled;
    }
    pushUserMsgs = () => {
        const msg: IMsgs = {
            type: 'text', msg: this.state.inputText, from: 'user'
        };
        this.pushMsgs(msg);
        this.setState({
            inputText: ''
        })
    }
    onInputTextChange = (e) => {
        this.setState({
            inputText: e.target.value
        });
    }
    onInputKeyDown = (e: any) => {
        if(e.key === 'Enter') {
            if(this.state.inputText !== '')
                this.pushUserMsgs();
        }
    }
    pushMsgs = (msg: IMsgs) => {
        msg = this.parseMsg(msg);
        this.setState({
            msgs: [...this.state.msgs, msg],
            suggestions: []
        }, () => {
            this.scrollToBottom();
            if(msg.from === 'user') {
                this.sendMsg(
                    {msg: msg.msg, uuid}
                );
            }
            if(msg.from === 'bot') {
                if(msg.suggestions && msg.suggestions.length > 0) {
                    this.setState({suggestions: msg.suggestions});
                    setTimeout(() => { this.scrollToBottom(); }, 100);
                }
            }
        });
    }

    parseMsg = (msg: IMsgs) => {
        const parsedText: IMsgParser = Parser.parseText(msg.msg);
        console.log('parsed text', parsedText)
        msg.msg = parsedText.text ? parsedText.text : '';
        msg.links = parsedText.links;
        return msg;
    }

    scrollToBottom = () => {
        if(this.scroller && this.scroller.current) {
            this.scroller.current.scrollTo(0, this.scroller.current.scrollHeight);
        }
    }

    onSuggestionItemClick = (item: string) => {
        const msg: IMsgs = {
            type: 'text', msg: item, from: 'user'
        };
        this.pushMsgs(msg);
    }

    onSpeechFinalised = (text: any) => {
		console.log('onSpeechFinalised', text, this.speechListener);
		this.setState({
            voiceOnSaidMsg: null,
            voiceMsg: this.state.voiceMsg + text
        });
    }
    
    onSpeechEndEvent = () => {
        console.log('end');
        console.log('speech status:', this.speechListenerTimeout, this.speechListener);
        this.stopListening();
    }

	onSpeechAnythingSaid = (text: any) => {
		console.log('onSpeechAnythingSaid', text);
		this.speechListenerTimeout.count = 0;
		this.setState({voiceOnSaidMsg: text});
	}

	handleSpeechListenerInterval = () => {
		console.log('speech status:', this.speechListenerTimeout, this.speechListener);
		this.speechListenerTimeout.count += 1;
		if(this.speechListenerTimeout.count > this.speechListenerTimeout.max) {
			// this.speechListenerTimeout.count = 0;
			// this.setState({isVoiceListening: false});
			// console.log('stopping speech listen')
			// clearInterval(this.speechListenerIntervalInstance);
			// this.speechListener.stopListening();
			this.stopListening();
		}
	}

	stopListening = () => {
        this.speechListenerTimeout.count = -1;
        const vMsg = this.state.voiceMsg;
		this.setState({isVoiceListening: false, voiceMsg: ''});
		console.log('stopping speech listen', this.state.voiceMsg)
		clearInterval(this.speechListenerIntervalInstance);
        if(this.speechListener) this.speechListener.stopListening();
        if(vMsg === '') return;
        const msg: IMsgs = {
            type: 'text', msg: vMsg, from: 'user'
        };
        this.pushMsgs(msg);
        this.stopListening();
	}

    listenVoice = () => {
		if(this.state.isVoiceListening) this.stopListening();
        console.log('listen voixe...', this.speechListener);
        this.speechListenerTimeout.count = 0;
		if (!('webkitSpeechRecognition' in window)) {
		  alert("This browser doesn't support speech recognition. Try Google Chrome.");
		  throw new Error("This browser doesn't support speech recognition. Try Google Chrome.");
		  return;
		}
		try {
			if(!this.speechListener) {
				this.speechListener = new SpeechToText(this.onSpeechFinalised, this.onSpeechEndEvent, this.onSpeechAnythingSaid);
				this.speechListener.startListening();
				this.setState({isVoiceListening: true});
			} else {
				console.log('restarting...');
				this.speechListener.startListening();
				this.setState({
					isVoiceListening: true,
					voiceOnSaidMsg: null
				});
			}
			this.speechListenerIntervalInstance = setInterval(this.handleSpeechListenerInterval, 1000)
		} catch(err) {
			console.log(err);
			clearInterval(this.speechListenerIntervalInstance);
		}
	}
    render() {
        return(
            <div className="ChatApp">
                <div className={"app-content" + (this.state.isToolbar ? " show-app-toolbar " : '')}>
                    <div className="app-toolbar">
                        <div className="logo">
                            <img src={require('./../assets/img/logo.png')} />
                        </div>
                        <div className="app-title">Ask Accion</div>
                    </div>
                    <div className={"chat-container" + (this.state.scrollPos > 40 ? ' adjust-to-header ' : '')}
                        ref={this.scroller}>
                        <ChatContainer msgs={this.state.msgs} />
                        {((this.state.msgs.length === 0) || (this.state.msgs[this.state.msgs.length-1].from === 'user')) && (
                            <div className="typing-anim">
                                <div className="bounce1"/>
                                <div className="bounce2"/>
                                <div className="bounce3"/>
                            </div>
                        )}
                    </div>
                    {this.state.suggestions.length > 0 && (
                        <div className="chat-suggestion">
                            <ChatSuggestion suggestions={this.state.suggestions}  onItemClick={this.onSuggestionItemClick} />
                        </div>
                    )}
                    <div 
                        className={"chat-footer" + 
                                    (this.state.isVoiceListening ? '  voice-listening ' : '') +
                                    (this.state.suggestions.length > 0 ? ' is-suggestion ' : '')
                                  }>
                        <input 
                            placeholder="Ask Accion...." 
                            value={this.state.inputText}
                            onChange={this.onInputTextChange}
                            onKeyDown={this.onInputKeyDown}
                            className="text-input"/>
                        {this.state.inputText === '' ? (
                            <button className="icon-button primary" onClick={this.listenVoice}>
                                <i className="material-icons">keyboard_voice</i>
                            </button>
                        ) : (
                            <button className="icon-button primary" onClick={this.pushUserMsgs}>
                                <i className="material-icons">send</i>
                            </button>
                        )}
                        {this.state.isVoiceListening && this.state.voiceOnSaidMsg && (
                            <div className="voice-said">
                                <div className="_text">{this.state.voiceOnSaidMsg}</div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        );
    }
}