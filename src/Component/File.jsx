
import React from 'react';

const File = ({ file, folderId, index, focusedItem, editing, editValue, setEditing, setEditValue, saveEdit, onFocus }) => {
    const fileId = `${folderId}-${index}`;
    return (
        <div
            className={`ml-6 py-1 px-2 hover:bg-gray-700 cursor-pointer 
                        ${focusedItem === fileId ? 'bg-gray-700' : ''}`}
            onClick={() => onFocus(fileId)}
            onDoubleClick={() => {
                setEditing({ type: 'file', id: fileId });
                setEditValue(file);
            }}
        >
            {editing?.type === 'file' && editing.id === fileId ? (
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
                <p>{file}</p>
            )}
        </div>
    );
};

export default File;
