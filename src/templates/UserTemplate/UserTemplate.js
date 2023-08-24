import { Fragment, useEffect } from "react";
import { Route } from "react-router";


import './UserTemplate.css'


export const UserTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;
    useEffect(() => {
        window.scrollTo(0, 0);

    })

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <div className="templateLog">
               <Component {...propsRoute} />
            </div>


        </Fragment>
    }} />

}