import React, { useEffect, useState } from "react";
import { FiFilePlus } from "react-icons/fi";
import { CgFolderAdd } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import Folder from "./Folder";
import { fileData } from "../FileData/fileData";

const Evaluation = () => {
    const [expandedFolders, setExpandedFolders] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [focusedItem, setFocusedItem] = useState(null);

    // Initial State
    const [data, setData] = useState(fileData);

    const toggleExpand = (id) => {
        setExpandedFolders((prev) =>
            prev.includes(id)
                ? prev.filter((folderId) => folderId !== id)
                : [...prev, id]
        );
    };

    
    // function to save edited data
    const saveEdit = () => {
        // Ensure there's an item being edited
        if (!editing || !editValue) return; 


        // change the data state
        setData((prevData) =>
            prevData.map((item) => {
                if (editing.type === 'folder' && item.id === editing.id) {
                    // Edit the folder name
                    return { ...item, name: editValue };
                } else if (editing.type === 'file') {
                    // Edit a file name inside the folder
                    return {
                        ...item,
                        files: item.files.map((file, index) => {
                            const fileId = `${item.id}-${index}`;
                            return fileId === editing.id ? editValue : file;
                        }),
                    };
                }
                return item; // Return the unchanged item
            })
        );
    
        // Clear editing state
        setEditing(null);
        setEditValue("");
    };
    

    const handleFocus = (id) => {
        setFocusedItem(id);
    };

    const addFolder = () => {
        const folderName = prompt("Enter new folder name:");
        if (folderName) {
            setData((prevData) => [
                ...prevData,
                { id: Date.now().toString(), name: folderName, type: "folder", files: [] },
            ]);
        }
    };

    const deleteFile = (itemId) => {
        setData((prevData) => {
            // Check if the item is a folder
            if (prevData.some((item) => item.id === itemId)) {
                // Remove the folder
                return prevData.filter((item) => item.id !== itemId);
            }
    
            // Otherwise, check if it's a file within a folder
            return prevData.map((folder) => {
                if (folder.files.some((_, index) => `${folder.id}-${index}` === itemId)) {
                    // Remove the file from the files array
                    return {
                        ...folder,
                        files: folder.files.filter((_, index) => `${folder.id}-${index}` !== itemId),
                    };
                }
                return folder;
            });
        });
    
        // Clear focus if the deleted item was focused
        if (focusedItem === itemId) {
            setFocusedItem(null);
        }
    };
    

    // const deleteFile = ()=>{}

    const addFile = (folderId) => {
        // if (!folderId) {
        //     alert("Please select a folder to add the file.");
        //     return;
        // }

        const folder = data.find((item) => item.id === folderId);

        if (folder && folder.type === "folder") {
            
            const fileName = prompt("Enter new file name:");
            if (fileName) {
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === folderId
                            ? { ...item, files: [...item.files, fileName] }
                            : item
                    )
                );
            }
        } else {
            alert("Please select a valid folder to add the file.");
        }
    };

    return (
        <div className="bg-gray-800 text-gray-200 p-4 w-full h-screen">
            <div className="flex justify-between items-center p-2">
                <div className="flex items-center">
                    <h1 className="uppercase px-2">Evaluation</h1>
                </div>
                <div className="flex">
                <span
                        className=" cursor-pointer"
                        title="Add File"
                        onClick={() => deleteFile(focusedItem)}
                    >
                        <MdDeleteOutline size={25} />
                    </span>
                    <span
                        className="px-2 cursor-pointer"
                        title="Add File"
                        onClick={() => addFile(focusedItem)}
                    >
                        <FiFilePlus size={25} />
                    </span>

                    <span
                        className="cursor-pointer"
                        title="Add Folder"
                        onClick={addFolder}
                    >
                        <CgFolderAdd size={25} />
                    </span>
                </div>
            </div>
            <div className="border-t-[1px] border-l-[1px] w-full h-screen border-gray-500">
                {data &&
                    data.map((folder) => (
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
