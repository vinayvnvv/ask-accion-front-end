import * as React from 'react';
import './ChatSuggestion.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ChatSuggestion.css';

interface IProps {
    suggestions: string[];
    onItemClick: any;
}

const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false
};


export class ChatSuggestion extends React.Component<IProps, any> {

    onItemClick = (item) => {
        this.props.onItemClick(item);
    }

    render() {
        return(
                <Slider {...settings} className="ChatSuggestion">
                    {this.props.suggestions.map((item, index) =>
                        <div className="_item" key={index}>
                            <div className="_text" onClick={this.onItemClick.bind(this, item)}>{item}</div>
                        </div> 
                    )}
                </Slider>
        );
    }
}