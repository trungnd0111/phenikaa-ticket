import { Fragment } from "react";
import { Route } from "react-router";
import Header from "./Layout/Header/Header";
import FooterVer2 from "./Layout/Footer/FooterVer2";



export const HomeTemplateOther = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;




    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Header isHomePage={false} {...propsRoute} />

            <Component {...propsRoute} />


            <hr className="mt-5" />
            <FooterVer2 />

        </Fragment>
    }} />

}