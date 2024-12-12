import React, { useState } from 'react';
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { FiFilePlus } from "react-icons/fi";
import { CgFolderAdd } from "react-icons/cg";

const Evaluation = () => {
    const [expandedFolders, setExpandedFolders] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState("");

    const toggleExpand = (id) => {
        setExpandedFolders((prev) =>
            prev.includes(id) ? prev.filter((folderId) => folderId !== id) : [...prev, id]
        );
    };

    const startEditing = (type, id, name) => {
        setEditing({ type, id });
        setEditValue(name);
    };

    const saveEdit = () => {
        if (editing) {
            console.log(`Saving ${editing.type} ${editing.id} with new name: ${editValue}`);
            setEditing(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    };

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
                    <span><FaAngleDown /></span>
                    <h1 className='uppercase px-2'>Evaluation</h1>
                </div>
                <div className='flex'>
                    <span className='px-2 cursor-pointer' title='Add File'><FiFilePlus size={25} /></span>
                    <span className='cursor-pointer' title='Add Folder'><CgFolderAdd size={25} /></span>
                </div>
            </div>
            <div className='border-t-[1px] border-l-[1px] w-full h-screen border-gray-500'>
                {data.map((folder) => (
                    <div key={folder.id} className='px-4'>
                        <div 
                            onDoubleClick={() => startEditing('folder', folder.id, folder.name)} 
                            onClick={() => toggleExpand(folder.id)} 
                            className='flex items-center p-1 hover:bg-gray-700 hover:text-white cursor-pointer'>
                            <span className="cursor-pointer">
                                {expandedFolders.includes(folder.id) ? <FaAngleDown size={20} /> : <FaAngleRight size={20} />}
                            </span>
                            {editing?.type === 'folder' && editing.id === folder.id ? (
                                <input 
                                    type='text' 
                                    value={editValue} 
                                    onChange={(e) => setEditValue(e.target.value)} 
                                    onBlur={saveEdit} 
                                    onKeyDown={handleKeyDown} 
                                    autoFocus
                                    className='ml-2 text-black px-1' 
                                />
                            ) : (
                                <h1 className='uppercase px-2'>{folder.name}</h1>
                            )}
                        </div>
                        {expandedFolders.includes(folder.id) &&
                            folder.files.map((file, index) => (
                                <div 
                                    key={index} 
                                    className="ml-6" 
                                    onDoubleClick={() => startEditing('file', `${folder.id}-${index}`, file)}>
                                    {editing?.type === 'file' && editing.id === `${folder.id}-${index}` ? (
                                        <input 
                                            type='text' 
                                            value={editValue} 
                                            onChange={(e) => setEditValue(e.target.value)} 
                                            onBlur={saveEdit} 
                                            onKeyDown={handleKeyDown} 
                                            autoFocus
                                            className='ml-2 text-black px-1' 
                                        />
                                    ) : (
                                        <p className='w-full py-1 px-2 hover:bg-gray-700 hover:text-white'>{file}</p>
                                    )}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Evaluation;
