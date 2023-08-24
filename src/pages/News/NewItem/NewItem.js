import React, { useEffect, useState } from 'react'
import { newsSaleData } from '../../../dummyData'
import './NewItem.css'
export default function NewItem(props) {

  const [idEvent, setIdEvent] = useState(0)
  const { id } = props.match.params
  useState(() => {
    setIdEvent(id);
  }, [id]);

  const selectNewItem = newsSaleData.find((item) => item.id === parseInt(id));

  return (
    <div style={{background:'#f9f6ec'}}>
      <div className='event'>
        <h2>{selectNewItem.name}</h2>
        <div>
          <p className='mb-0 text-center'><img src={selectNewItem.cover} alt='item' /></p>
        </div>
        <div className='event_release'>
          <p>{selectNewItem.desc}</p>
        </div>
      </div>
    </div>
  )
}
