import React, { useState } from 'react'
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { FiFilePlus } from "react-icons/fi";
import { CgFolderAdd } from "react-icons/cg";
const Evaluation = () => {

    const [expandFolder, setExpandFolder] = useState(null)

    const toggleExpand = (id) => (
        setExpandFolder(expandFolder === id ? null : id)
    )

    return (
        <div className='bg-gray-800 text-gray-200 p-4 w-full h-screen'>
            <div className='flex justify-between items-center p-2'>
                <div className='flex items-center'>
                    <span><FaAngleDown /></span>
                    <h1 className='uppercase px-2'>Evaluation</h1>
                </div>
                <div className='flex'><span className='px-2 cursor-pointer' title='Add File'><FiFilePlus size={25} /></span>
                    <span className='cursor-pointer' title='Add Folder'><CgFolderAdd size={25} /></span>
                </div>
            </div>
            <div className='border-t-[1px] border-l-[1px] w-full h-screen border-gray-500'>
                <div className='flex items-center p-4'>
                    <span><FaAngleRight size={20} /></span>
                    <h1 className='uppercase px-2'>Document</h1>
                </div>
                <div className='px-4'>
                    <div className='flex items-center'>
                        <span><FaAngleDown size={20} /></span>
                        <h1 className='uppercase px-2'>Desktop</h1>
                    </div>
                    <div className='mx-6 my-2'>
                        <p className='w-full py-3 px-2 hover:bg-gray-700 hover:text-white'>screenshot.png</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Evaluation

