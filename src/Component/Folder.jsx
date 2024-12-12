import React from 'react';
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import File from './File';

const Folder = ({ folder, isExpanded, focusedItem, onExpand, onEdit, onFocus, editing, editValue, setEditing, setEditValue, saveEdit }) => {
    return (
        <div className='px-4'>
            <div
                onClick={() => {
                    onExpand(folder.id);
                    onFocus(folder.id);
                }}
                onDoubleClick={() => {
                    setEditing({ type: 'folder', id: folder.id });
                    setEditValue(folder.name);
                }}
                className={`flex items-center p-1 hover:bg-gray-700 hover:text-white cursor-pointer 
                            ${focusedItem === folder.id ? 'bg-blue-600' : ''}`}
            >
                <span className="cursor-pointer">
                    {isExpanded ? <FaAngleDown size={20} /> : <FaAngleRight size={20} />}
                </span>
                {editing?.type === 'folder' && editing.id === folder.id ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                        className="ml-2 text-black px-1"
                    />
                ) : (
                    <h1 className='uppercase px-2'>{folder.name}</h1>
                )}
            </div>
            {isExpanded &&
                folder.files.map((file, index) => (
                    <File
                        key={index}
                        file={file}
                        folderId={folder.id}
                        index={index}
                        focusedItem={focusedItem}
                        onEdit={onEdit}
                        onFocus={onFocus}
                        editing={editing}
                        editValue={editValue}
                        setEditing={setEditing}
                        setEditValue={setEditValue}
                        saveEdit={saveEdit}
                    />
                ))}
        </div>
    );
};

export default Folder;
