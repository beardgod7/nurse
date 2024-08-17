import React from 'react'
import google from '../../assets/Google__G__logo.svg.png'
const Auth0 = () => {
  return (
    <div className='flex flex-col m-5'>
        <div className="flex items-center">
  <div className="h-px bg-gray-300 flex-grow"></div>
  <h6 className="px-4 text-blue-800">Or</h6>
  <div className="h-px bg-gray-300 flex-grow"></div>
</div>
<div className="mt-3 flex items-center justify-center gap-10">
  <img src={google} alt="logo" className='max-w-6' />
  <img src={google} alt="logo" className='max-w-6' />
</div>
    </div>
  )
}

export default Auth0