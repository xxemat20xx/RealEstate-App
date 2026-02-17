import React from 'react'

const MapView = ({ url }) => {
  return (
    <iframe src={url} className='w-full h-full rounded-2xl' style={{border:0}} allowFullScreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  )
}

export default MapView;