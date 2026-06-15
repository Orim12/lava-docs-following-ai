import Image from 'next/image'
import React from 'react'

const Icon = () => (
  <div className="icon">
    <Image src="/media/icon.svg" alt="Icon" width={24} height={24} />
  </div>
)

export default Icon