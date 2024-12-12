import React from 'react';
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import File from './File';

const Folder = ({
    folder,
    isExpanded,
    focusedItem,
    onExpand,
    onEdit,
    onFocus,
    editing,
    editValue,
    setEditing,
    setEditValue,
    saveEdit,
}) => {
    const handleDoubleClick = () => {
        setEditing({ type: 'folder', id: folder.id });
        setEditValue(folder.name);
    };

    const handleBlurOrEnter = (e) => {
        if (e.type === 'blur' || e.key === 'Enter') {
            saveEdit();
        }
    };

    return (
        <div className="px-4">
            {/* Folder Header */}
            <div
                onClick={() => {
                    onExpand(folder.id);
                    onFocus(folder.id);
                }}
                onDoubleClick={handleDoubleClick}
                className={`flex items-center p-1 hover:bg-gray-700 hover:text-white cursor-pointer 
                    ${focusedItem === folder.id ? 'bg-gray-600' : ''}`}
            >
                {/* Expand/Collapse Icon */}
                <span className="cursor-pointer">
                    {isExpanded ? <FaAngleDown size={20} /> : <FaAngleRight size={20} />}
                </span>

                {/* Folder Name or Editable Input */}
                {editing?.type === 'folder' && editing.id === folder.id ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleBlurOrEnter}
                        onKeyDown={handleBlurOrEnter}
                        autoFocus
                        className="ml-2 text-black px-1"
                    />
                ) : (
                    <h1 className="uppercase px-2">{folder.name}</h1>
                )}
            </div>

            {/* Render Folder Contents */}
            {isExpanded &&
                folder.files.map((file, index) =>
                    typeof file === 'object' && file.type === 'folder' ? (
                        // Recursive Folder Component for Nested Folders
                        <Folder
                            key={file.id}
                            folder={file}
                            isExpanded={isExpanded}
                            focusedItem={focusedItem}
                            onExpand={onExpand}
                            onEdit={onEdit}
                            onFocus={onFocus}
                            editing={editing}
                            editValue={editValue}
                            setEditing={setEditing}
                            setEditValue={setEditValue}
                            saveEdit={saveEdit}
                        />
                    ) : (
                        // File Component for Files
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
                    )
                )}
        </div>
    );
};

export default Folder;
