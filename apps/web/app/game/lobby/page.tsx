"use client";
import ReadyButton from "../room-setting/ReadyButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import file_img from "./file-1453.svg";

const LobbyPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex flex-row justify-center">
          <div className="flex flex-row gap-10">
            <div>hi</div>
            <div>
              <FileUpload />
            </div>
          </div>
        </div>
        <ReadyButton label="Ready" onClick={() => {}}></ReadyButton>
      </div>
    </>
  );
};

export default LobbyPage;

const FileUpload = () => {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    console.log(files);
  });

  const handleUpload = async () => {
    setFiles([...files, uploadFile]);
  };
  const [uploadFile, setUploadFile] = useState<any>(null);
  return (
    <div className="card w-96 shadow-xl bg-white items-center">
      <div className="p-28 border-dashed border h-full w-80 m-5 border-black items-center text-center">
        {files.map((file: any) => {
          return (
            <div key={file.name}>
              <Image src={file_img} alt="file" />
              {file.name}
            </div>
          );
        })}
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Files!</h2>
        <p>Upload Documentation</p>
        <div className="card-actions">
          <input
            type="file"
            onChange={(e: any) => {
              setUploadFile(e.target.files[0]);
            }}
            className="file-input file-input-bordered file-input-info w-full max-w-xs bg-white"
          />
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

// <div class="flex items-center justify-center w-full">
//     <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//         <div class="flex flex-col items-center justify-center pt-5 pb-6">
//             <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//             </svg>
//             <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
//             <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//         </div>
//         <input id="dropzone-file" type="file" class="hidden" />
//     </label>
// </div>
