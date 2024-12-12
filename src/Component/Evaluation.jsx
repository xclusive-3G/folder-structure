import React, { useEffect, useState } from "react";
import { FiFilePlus } from "react-icons/fi";
import { CgFolderAdd } from "react-icons/cg";
import Folder from "./Folder";

const Evaluation = () => {
    const [expandedFolders, setExpandedFolders] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [focusedItem, setFocusedItem] = useState(null);

    // Initial State
    const [data, setData] = useState([
        {
            id: "1",
            name: "Documents",
            type: "folder",
            files: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
        },
        {
            id: "2",
            name: "Desktop",
            type: "folder",
            files: ["Screenshot1.jpg", "videopal.mp4"],
        },
        {
            id: "3",
            name: "Downloads",
            type: "folder",
            files: [
                {
                    id: "4",
                    name: "Drivers",
                    type: "folder",
                    files: ["Printerdriver.dmg", "cameradriver.dmg"],
                },
                "chromedriver.dmg",
            ],
        },
        {
            id: "5",
            name: "Applications",
            type: "folder",
            files: [
                "Webstorm.dmg",
                "Pycharm.dmg",
                "FileZila.dmg",
                "Mattermost.dmg",
            ],
        },
    ]);

    const toggleExpand = (id) => {
        setExpandedFolders((prev) =>
            prev.includes(id)
                ? prev.filter((folderId) => folderId !== id)
                : [...prev, id]
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

    const addFolder = () => {
        const folderName = prompt("Enter new folder name:");
        if (folderName) {
            setData((prevData) => [
                ...prevData,
                { id: Date.now().toString(), name: folderName, type: "folder", files: [] },
            ]);
        }
    };

    const addFile = (folderId) => {
        if (!folderId) {
            alert("Please select a folder to add the file.");
            return;
        }

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
