import React from 'react';
import NavBar from '../pages/Shared/NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import signImg from '../assets/signIn.webp';

const AuthLayout = () => {
    return (
        <div className="w-11/12 mx-auto">
            <NavBar></NavBar>
            <div className="flex items-center">

                <div className="flex-1">
                    <img className="rounded-2xl" src={signImg} alt="" />
                </div>

                <div className="flex-1">
                    <Outlet></Outlet>
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;