import React from 'react'
import Image from 'next/image'

const Logo = () => (
  <div className="logo">
    <Image src="/media/logo.svg" alt="Logo" width={100} height={100} />
  </div>
)

export default Logo