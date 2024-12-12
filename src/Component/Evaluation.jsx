// import React, { useState, useRef } from 'react';
// import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
// import { FiFilePlus } from "react-icons/fi";
// import { CgFolderAdd } from "react-icons/cg";

// const Evaluation = () => {
//     const [expandedFolders, setExpandedFolders] = useState([]);
//     const [editing, setEditing] = useState(null);
//     const [editValue, setEditValue] = useState("");
//     const [focusedItem, setFocusedItem] = useState(null); // Track focused item

//     const inputRefs = useRef({}); // Store references for the inputs

//     const toggleExpand = (id) => {
//         setExpandedFolders((prev) =>
//             prev.includes(id) ? prev.filter((folderId) => folderId !== id) : [...prev, id]
//         );
//     };

//     const startEditing = (type, id, name) => {
//         setEditing({ type, id });
//         setEditValue(name);
//     };

//     const saveEdit = () => {
//         if (editing) {
//             console.log(`Saving ${editing.type} ${editing.id} with new name: ${editValue}`);
//             setEditing(null);
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             saveEdit();
//         }
//     };

//     const handleFocus = (id) => {
//         setFocusedItem(id); // Set the clicked item as focused
//     };

//     const data = [
//         {
//             id: 1,
//             name: 'Desktop',
//             type: 'folder',
//             files: ['screenshot.png', 'document.docx']
//         },
//         {
//             id: 2,
//             name: 'Downloads',
//             type: 'folder',
//             files: ['image.jpg', 'video.mp4']
//         }
//     ];

//     return (
//         <div className='bg-gray-800 text-gray-200 p-4 w-full h-screen'>
//             <div className='flex justify-between items-center p-2'>
//                 <div className='flex items-center'>
//                     <span><FaAngleDown /></span>
//                     <h1 className='uppercase px-2'>Evaluation</h1>
//                 </div>
//                 <div className='flex'>
//                     <span className='px-2 cursor-pointer' title='Add File'><FiFilePlus size={25} /></span>
//                     <span className='cursor-pointer' title='Add Folder'><CgFolderAdd size={25} /></span>
//                 </div>
//             </div>
//             <div className='border-t-[1px] border-l-[1px] w-full h-screen border-gray-500'>
//                 {data.map((folder) => (
//                     <div key={folder.id} className='px-4'>
//                         <div 
//                             onClick={() => {
//                                 toggleExpand(folder.id);
//                                 handleFocus(folder.id); // Set focus to the clicked folder
//                             }} 
//                             onDoubleClick={() => startEditing('folder', folder.id, folder.name)} 
//                             className={`flex items-center p-1 hover:bg-gray-700 hover:text-white cursor-pointer 
//                                         ${focusedItem === folder.id ? 'bg-gray-500' : ''}`} // Apply focus style here
//                         >
//                             <span className="cursor-pointer">
//                                 {expandedFolders.includes(folder.id) ? <FaAngleDown size={20} /> : <FaAngleRight size={20} />}
//                             </span>
//                             {editing?.type === 'folder' && editing.id === folder.id ? (
//                                 <input 
//                                     ref={(el) => inputRefs.current[folder.id] = el} // Set reference for the folder input
//                                     type='text' 
//                                     value={editValue} 
//                                     onChange={(e) => setEditValue(e.target.value)} 
//                                     onBlur={saveEdit} 
//                                     onKeyDown={handleKeyDown} 
//                                     autoFocus
//                                     className='ml-2 text-black px-1' 
//                                 />
//                             ) : (
//                                 <h1 className='uppercase px-2'>{folder.name}</h1>
//                             )}
//                         </div>
//                         {expandedFolders.includes(folder.id) &&
//                             folder.files.map((file, index) => (
//                                 <div 
//                                     key={index} 
//                                     className={`ml-6 py-1 px-2 hover:bg-gray-700 cursor-pointer 
//                                                 ${focusedItem === `${folder.id}-${index}` ? 'bg-gray-500' : ''}`} // Apply focus style for file
//                                     onClick={() => {
//                                         handleFocus(`${folder.id}-${index}`); // Set focus to the clicked file
//                                     }}
//                                     onDoubleClick={() => startEditing('file', `${folder.id}-${index}`, file)}>
//                                     {editing?.type === 'file' && editing.id === `${folder.id}-${index}` ? (
//                                         <input 
//                                             ref={(el) => inputRefs.current[`${folder.id}-${index}`] = el} // Set reference for the file input
//                                             type='text' 
//                                             value={editValue} 
//                                             onChange={(e) => setEditValue(e.target.value)} 
//                                             onBlur={saveEdit} 
//                                             onKeyDown={handleKeyDown} 
//                                             autoFocus
//                                             className='ml-2 text-black px-1' 
//                                         />
//                                     ) : (
//                                         <p>{file}</p>
//                                     )}
//                                 </div>
//                             ))}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Evaluation;
import React, { useState } from 'react';
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
