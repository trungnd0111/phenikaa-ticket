import React, { useState } from 'react'
import { newsSaleData } from '../../dummyData'
import './News.css'
import { history } from '../../App'
export default function News() {
    const [items, setItem] = useState(newsSaleData)

    const renderNewsSale = () => items.slice(1).map((sale, index) => {
        return <div onClick={() => {
            history.push(`news/${sale.id}`);
            handleScrollTop();
        }} key={index} className="row-span-1 sm:col-span-1 col-span-2 newsale_righChild">
            <img src={sale.cover} alt={index} />
            <div className='righChildContent'>
                <h4>{sale.name}</h4>
                <p>{sale.desc}</p>
            </div>
            <p className='newsale_readmore'>Xem thêm <i className="fa fa-chevron-right"></i></p>
        </div>
    })
    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 newSale">
                <div className="lg:col-span-1 col-span-2 newsale_left" onClick={() => {
                    history.push(`news/${items[0].id}`);
                    handleScrollTop();
                }}>
                    <img src={items[0].cover} alt='1' />
                    <div className='newsale_leftContent'>
                        <h4>{items[0].name}</h4>
                        <p> {items[0].desc}</p>
                    </div>
                    <p className='newsale_readmore'>Xem thêm <i className="fa fa-chevron-right"></i></p>
                </div>
                <div className="lg:col-span-1 col-span-2 newsale_right">
                    <div className="grid grid-rows-2 grid-cols-2 gap-4">
                        {renderNewsSale()}
                    </div>
                </div>
            </div>
        </div>
    )
}
