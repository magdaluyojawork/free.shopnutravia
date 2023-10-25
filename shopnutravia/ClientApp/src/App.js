import React, { Component } from 'react';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';
import 'react-chatbot-kit/build/main.css'
import './App.css';

export default class App extends Component {
    static displayName = App.name;
    componentDidMount() {
        var height = window.innerHeight;
        var margin = (height - 600) / 2;
        
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)) {
            var container = document.getElementsByClassName('react-chatbot-kit-chat-inner-container');
            if (container.length > 0)
                container[0].style.margin = margin + 'px 0px 0px 0px'
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
                </header>
            </div>
        );
    }
}
