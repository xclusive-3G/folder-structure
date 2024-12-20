import React from 'react';
import { FaReact, FaJs, FaPlayCircle, FaFilePdf, FaFileAudio, FaFileAlt } from 'react-icons/fa';
import { BsFiletypeHtml } from "react-icons/bs";
import { FaImage } from "react-icons/fa6";
import { CiTextAlignLeft } from "react-icons/ci";

// Function to get the file extension
const getFileExtension = (fileName) => {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

// Function to return the corresponding icon based on file extension
const getFileIcon = (fileName) => {
    const ext = getFileExtension(fileName);
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            return <FaImage size={20} color="dodgerblue" />;
        case 'mp4':
            return <FaPlayCircle size={20} color="red" />;
        case 'pdf':
            return <FaFilePdf size={20} color="red" />;
        case 'mp3':
        case 'wav':
            return <FaFileAudio size={20} color="mediumseagreen" />;
        case 'txt':
        case 'doc':
        case 'docx':
            return <FaFileAlt size={20} color="gray" />;
        case 'jsx':
            return <FaReact />;
        case 'js':
            return <FaJs />;
        case 'html':
            return <BsFiletypeHtml />
        default:
            return <CiTextAlignLeft size={20} color="white" />; // Default file icon to vlack
    }
};

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
            {/* Display Icon based on file extension */}
            <div className="inline-block mr-2">{getFileIcon(file)}</div>

            {/* Editable file name */}
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
                <p className="inline-block">{file}</p>
            )}
        </div>
    );
};

export default File;
