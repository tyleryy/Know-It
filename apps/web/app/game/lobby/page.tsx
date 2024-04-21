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
