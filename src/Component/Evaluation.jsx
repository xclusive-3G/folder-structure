import React, { useEffect, useState } from 'react';
import { FiFilePlus } from "react-icons/fi";
import { CgFolderAdd } from "react-icons/cg";
import Folder from './Folder';

const Evaluation = () => {
    const [expandedFolders, setExpandedFolders] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [focusedItem, setFocusedItem] = useState(null);

    const toggleExpand = (id) => {
        setExpandedFolders((prev) =>
            prev.includes(id) ? prev.filter((folderId) => folderId !== id) : [...prev, id]
        );
    };

    const saveEdit = () => {
        if (editing) {
            console.log(`Saving ${editing.type} ${editing.id} with new name: ${editValue}`);
            setEditing(null);
        }
    };

    const handleFocus = (id) => {
        setFocusedItem(id);
    };


    useEffect(()=>{
        console.log('use effect run')
    },[])
    const data = [
        {
            id: 1,
            name: 'Desktop',
            type: 'folder',
            files: ['screenshot.png', 'document.docx']
        },
        {
            id: 2,
            name: 'Downloads',
            type: 'folder',
            files: ['image.jpg', 'video.mp4']
        }
    ];

    return (
        <div className='bg-gray-800 text-gray-200 p-4 w-full h-screen'>
            <div className='flex justify-between items-center p-2'>
                <div className='flex items-center'>
                    <h1 className='uppercase px-2'>Evaluation</h1>
                </div>
                <div className='flex'>
                    <span className='px-2 cursor-pointer' title='Add File'><FiFilePlus size={25} /></span>
                    <span className='cursor-pointer' title='Add Folder'><CgFolderAdd size={25} /></span>
                </div>
            </div>
            <div className='border-t-[1px] border-l-[1px] w-full h-screen border-gray-500'>
                {data.map((folder) => (
                    <Folder
                        key={folder.id}
                        folder={folder}
                        isExpanded={expandedFolders.includes(folder.id)}
                        focusedItem={focusedItem}
                        onExpand={toggleExpand}
                        onEdit={() => {}}
                        onFocus={handleFocus}
                        editing={editing}
                        editValue={editValue}
                        setEditing={setEditing}
                        setEditValue={setEditValue}
                        saveEdit={saveEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default Evaluation;
