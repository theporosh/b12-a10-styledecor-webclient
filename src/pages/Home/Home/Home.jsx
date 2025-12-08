import React from 'react';
import HeroSection from '../Hero/HeroSection';
import TopDecorators from '../TopDecorators/TopDecorators';
import Services from '../DecorationServices/Services';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <TopDecorators></TopDecorators>
            <Services></Services>
        </div>
    );
};

export default Home;