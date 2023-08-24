import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import loadingImage from '../../assets/imgLoading/loading.gif';

export default function Loading(props) {

    const { isLoading } = useSelector(state => state.LoadingReducer);
    return (
        <Fragment>
            {isLoading ?
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, background:'white' }}>
                    <img src={loadingImage} alt='loading' />
                </div>
                : ''
            }
        </Fragment>
    )
}
