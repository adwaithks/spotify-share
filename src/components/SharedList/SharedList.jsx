import React from 'react';
import TrackCard from '../TrackCard/TrackCard';
import './SharedList.scss'

function SharedList() {
  return (
    <div className='sharedlist'>
        <TrackCard 
        imageUrl={'https://i.scdn.co/image/ab67616d0000b273c90fa69efea26b2932a616cf'} 
        title='Manavaalan Thug - From "Thallumaala"'
        description="Dabzee · Song · 2022"
        />
        <TrackCard 
        imageUrl={'https://i.scdn.co/image/ab67616d0000b273c90fa69efea26b2932a616cf'} 
        title='Manavaalan Thug - From "Thallumaala"'
        description="Dabzee · Song · 2022"
        />
        <TrackCard 
        imageUrl={'https://i.scdn.co/image/ab67616d0000b273c90fa69efea26b2932a616cf'} 
        title='Manavaalan Thug - From "Thallumaala"'
        description="Dabzee · Song · 2022"
        />

    </div>
  )
}

export default SharedList