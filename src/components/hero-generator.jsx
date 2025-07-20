import React from 'react'
import { Globe } from 'lucide-react';

const HeroGenerator = () => {
  return (
    <div>
      <div className="main_wrapper">
        <div className='grid grid-cols-3 bg-white p-4 rounded-lg gap-5'>
            <div className='flex flex-row gap-2 items-center bg-blue-100 p-4 rounded-lg'>
                <div className='p-2 border-gray-100 border-[0.5px] rounded-lg'>
                <Globe/>
                </div>
                <h3 className='text-lg font-serif'>Website</h3>
            </div>
            <div className='flex flex-row gap-2 items-center p-4 rounded-lg'>
                <div className='p-2 border-gray-300 border-[0.5px] rounded-lg'>
                <Globe/>
                </div>
                <h3 className='text-lg'>Text</h3>
            </div>
            <div className='flex flex-row gap-2 items-center p-4 rounded-lg'>
                <div className='p-2 border-gray-300 border-[0.5px] rounded-lg'>
                <Globe/>
                </div>
                <h3 className='text-lg'>PDF</h3>
            </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default HeroGenerator
