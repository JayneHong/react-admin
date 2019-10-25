import React, { Component } from 'react';
import { Carousel } from 'antd';
import './home.less'

const imgs = [
    'https://raw.githubusercontent.com/z-9527/image-store/master/react-admin-master/slide1.jpg',
    'https://raw.githubusercontent.com/z-9527/image-store/master/react-admin-master/slide2.jpg',
    'https://raw.githubusercontent.com/z-9527/image-store/master/react-admin-master/slide3.jpg',
    'https://raw.githubusercontent.com/z-9527/image-store/master/react-admin-master/slide4.jpg',
];

export default class Home extends Component {
    render() {
        return (
            <div className='home'>
                <Carousel autoplay effect='fade' className='size'>
                    {imgs.map(item => <div key={item}><div className='size' style={{ backgroundImage: `url(${item})` }} /></div>)}
                </Carousel>
            </div>
        );
    }
}



