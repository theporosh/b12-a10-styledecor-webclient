import React from 'react';
import HeroSection from '../Hero/HeroSection';
import TopDecorators from '../TopDecorators/TopDecorators';
import Services from '../DecorationServices/Services';
import WhyStyleDecor from '../WhyStyleDecor/WhyStyleDecor';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <WhyStyleDecor></WhyStyleDecor>
            <TopDecorators></TopDecorators>
            <Services></Services>
        </div>
    );
};

export default Home;