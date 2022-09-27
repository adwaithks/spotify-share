import React from 'react'

function Tag({Icon, name, bgColor, borderColor}) {
  return (
    <span className='tag'>
        <Icon />
        <h2>{name}</h2>
    </span>
  )
}

export default Tag