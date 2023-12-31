import { Fragment } from "react";
import { Route } from "react-router";
import Header from "./Layout/Header/Header";
import FooterVer2 from "./Layout/Footer/FooterVer2";



export const HomeTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;


    

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Header isHomePage={true} {...propsRoute}/>

            <Component {...propsRoute} />

            
            <FooterVer2 />
           
        </Fragment>
    }} />

}