import React, { useState } from "react";
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

    // state to store the folder data
    const [data, setData] = useState(fileData);

    // fuction to toggle folder
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

        setData((prevData) => {
            return prevData.map((item) => {
                if (editing.type === "folder" && item.id === editing.id) {
                    // Edit folder name
                    return { ...item, name: editValue };
                } else if (editing.type === "file" && item.files) {
                    // Edit file name inside a folder
                    item.files = item.files.map((file, index) => {
                        const fileId = `${item.id}-${index}`;
                        return fileId === editing.id ? editValue : file;
                    });
                }
                return item;
            });
        });

        // Clear editing state
        setEditing(null);
        setEditValue("");
    };

    // fuction to save data when the mose is not on the folder div
    const handleFocus = (id) => {
        setFocusedItem(id);
    };

    //  fuction ro add folder
    const addFolder = (folderId) => {
        const folderName = prompt("Enter new folder name:");
        if (!folderName) return; // Exit if no folder name is provided

        // Recursive function to add folder inside selected folder
        const addFolderToSelectedFolder = (folders, folderId) => {
            return folders.map((folder) => {
                if (folder.id === folderId && folder.type === "folder") {
                    return {
                        ...folder,
                        files: [
                            ...folder.files,
                            {
                                name: folderName,
                                type: "folder",
                                files: [], // New folder with no files initially
                            },
                        ],
                    };
                }

                // If the folder has nested folders, recurse through them
                if (folder.type === "folder" && Array.isArray(folder.files)) {
                    return {
                        ...folder,
                        files: addFolderToSelectedFolder(folder.files, folderId),
                    };
                }

                return folder;
            });
        };

        setData((prevData) => {
            if (!folderId) {
                // If no folder is selected, add at the root level
                return [
                    ...prevData,
                    { id: Date.now().toString(), name: folderName, type: "folder", files: [] },
                ];
            } else {
                // Add folder inside the selected folder
                return addFolderToSelectedFolder(prevData, folderId);
            }
        });
    };

    // function to delete data file
    const deleteFile = (itemId) => {
        setData((prevData) => {
            // Check if the item is a folder
            if (prevData.some((item) => item.id === itemId)) {
                // Remove the folder
                return prevData.filter((item) => item.id !== itemId);
            }
    // const deleteItemRecursively = (items) => {
    //     return items.filter((item) => {
    //         // If the item is the one to delete, return false (remove it)
    //         if (item.id === itemId) {
    //             return false;
    //         }

    //         // If the item is a folder, check if it contains nested files or folders
    //         if (item.files && Array.isArray(item.files)) {
    //             item.files = deleteItemRecursively(item.files); // Recursively delete nested files/folders
    //         }

    //         return true; // Keep the item if it doesn't match the itemId
    //     });
    // };

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
    



    // function to add file to folder

    const addFile = (folderId) => {

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
                {/* div for delete,file amd folder icons */}
                <div className="flex">
                    <span
                        className="cursor-pointer"
                        title="Delete"
                        onClick={() => deleteFile(focusedItem)} // Pass the focusedItem to the delete function
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
                        onClick={() => addFolder(focusedItem)}
                    >
                        <CgFolderAdd size={25} />
                    </span>
                </div>
            </div>
            {/* div to dispaly data gotten from used state */}
            <div className="border-t-[1px] border-l-[1px] w-full h-screen border-gray-500">
                {data &&
                    data.map((folder) => (
                        // pass props to folder component
                        <Folder
                            key={folder.id}
                            folder={folder}
                            isExpanded={expandedFolders.includes(folder.id)}
                            focusedItem={focusedItem}
                            onExpand={toggleExpand}
                            onEdit={() => { }}
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
