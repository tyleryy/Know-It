"use client";
import ReadyButton from "../../../room-setting/[roomCode]/[displayName]/ReadyButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import file_img from "./file-1453.svg";

import dog from "../../../../../assets/avatars/dog.svg";
import frog from "../../../../../assets/avatars/frog.svg";
import penguin from "../../../../../assets/avatars/penguin.svg";
import chicken from "../../../../../assets/avatars/chicken.svg";
import React from "react";
import axios from "axios";
import { createClient } from "../../../../../utils/supabase/client";
interface PageProps {
  params: any;
}
const userConfig = [
  { name: "tyler" },
  { name: "nwin" },
  { name: "stevem" },
  { name: "katy" },
];

const avatarMap: any = [dog, frog, penguin, chicken];

const LobbyPage = ({ params }: PageProps) => {
  useEffect(() => {
    console.log(
      JSON.parse(
        '{"Candidates":[{"Index":0,"Content":{"Parts":["{\\n\\t\\"question1\\": {\\n\\t\\t\\"id\\": \\"123e4567-e89b-12d3-a456-426655440000\\",\\n\\t\\t\\"roomId\\": 23,\\n\\t\\t\\"prompt\\": \\"What does this course explore?\\",\\n\\t\\t\\"answer\\": \\"The course explores the significant philosophical implications of interdisciplinary approaches.\\",\\n\\t\\t\\"explanation\\": \\"The introduction states that the course \'explores...significant philosophical implications.\'\\"\\n\\t},\\n\\t\\"question2\\": {\\n\\t\\t\\"id\\": \\"123e4567-e89b-12d3-a456-426655440001\\",\\n\\t\\t\\"roomId\\": 23,\\n\\t\\t\\"prompt\\": \\"What is the key benefit of an interdisciplinary approach?\\",\\n\\t\\t\\"answer\\": \\"An interdisciplinary approach combines philosophy and other disciplines, which impacts our understanding of ethics and morality.\\",\\n\\t\\t\\"explanation\\": \\"Key takeaway 1 states that \'Combines philosophy...impacting our understanding of ethics and morality.\'\\"\\n\\t},\\n\\t\\"question3\\": {\\n\\t\\t\\"id\\": \\"123e4567-e89b-12d3-a456-426655440002\\",\\n\\t\\t\\"roomId\\": 23,\\n\\t\\t\\"prompt\\": \\"How does the course explore the question of \'what is real\'?\\",\\n\\t\\t\\"answer\\": \\"The course explores this question through different perspectives, such as the effects of interdisciplinary approaches.\\",\\n\\t\\t\\"explanation\\": \\"The introduction states that the course \'explores this question...effects of interdisciplinary approaches.\'\\"\\n\\t},\\n\\t\\"question4\\": {\\n\\t\\t\\"id\\": \\"123e4567-e89b-12d3-a456-426655440003\\",\\n\\t\\t\\"roomId\\": 23,\\n\\t\\t\\"prompt\\": \\"What are the limitations of an interdisciplinary approach?\\",\\n\\t\\t\\"answer\\": \\"An interdisciplinary approach can be limited by the lack of experts in each field, which can make it difficult to bridge the gap between disciplines.\\",\\n\\t\\t\\"explanation\\": \\"Key takeaway 2 states that \'Lack of experts...difficult to bridge the gap\'\\"\\n\\t},\\n\\t\\"question5\\": {\\n\\t\\t\\"id\\": \\"123e4567-e89b-12d3-a456-426655440004\\",\\n\\t\\t\\"roomId\\": 23,\\n\\t\\t\\"prompt\\": \\"How does the course explore the concept of \'truth\'?\\",\\n\\t\\t\\"answer\\": \\"The course explores this concept through the lens of different disciplines, such as philosophy and psychology.\\",\\n\\t\\t\\"explanation\\": \\"The introduction states that the course \'explores this concept...through the lens.\'\\"\\n\\t}\\n}"],"Role":"model"},"FinishReason":1,"SafetyRatings":[{"Category":9,"Probability":1,"Blocked":false},{"Category":8,"Probability":1,"Blocked":false},{"Category":7,"Probability":1,"Blocked":false},{"Category":10,"Probability":1,"Blocked":false}],"CitationMetadata":null,"TokenCount":0}],"PromptFeedback":null}'
      )
    );
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex flex-row justify-center">
          <div className="flex flex-row gap-10">
            <div>
              <AvatarStack users={userConfig} />
            </div>
            <div>
              <FileUpload params={params} />
            </div>
          </div>
        </div>
        <ReadyButton label="Ready" onClick={() => {}}></ReadyButton>
      </div>
    </>
  );
};

export default LobbyPage;

const AvatarStack = ({ users }: any) => {
  return (
    <>
      {users.map((user: any, index: number) => {
        return (
          <div key={user.name} className="relative -left-10">
            <Image
              src={avatarMap[index % avatarMap.length]}
              alt="player avatar"
              height={100}
              width={100}
            />
            {user.name}
          </div>
        );
      })}
    </>
  );
};

const FileUpload = ({ params }: any) => {
  const supabase = createClient();
  const [files, setFiles] = useState<any>([]);
  const [uploadFile, setUploadFile] = useState<any>(null);
  useEffect(() => {
    console.log(files);
  }, [files]);

  // const handleUpload = async () => {
  //   if (!uploadFile) {
  //     console.log("no file to upload");
  //     return;
  //   }
  //   setFiles([...files, uploadFile]);
  //   setUploadFile(null);
  // };

  const handleUpload = async () => {
    if (!uploadFile) {
      console.log("no file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("upload[]", uploadFile);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/upload/file/${params.roomCode}/10`,
        formData
        // { responseType: "json" } // Add this line
      );

      if (!response) {
        throw new Error(`HTTP error!`);
      } else {
        console.log("OK");
        const result = JSON.parse(response.data);
        const questionsGemini = JSON.parse(result[0]);
        const { error } = await supabase
          .from("Games")
          .update({ questions: questionsGemini })
          .eq("room_id", params.roomCode);

        setFiles([...files, uploadFile]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }

    setUploadFile(null);
  };

  return (
    <div className="card w-96 shadow-xl bg-white items-center">
      <div className="p-28 border-dashed border h-full w-80 m-5 border-black">
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
        <h2 className="card-title">Upload Documentation</h2>
        <p>Study Guides, Notes, and more!</p>
        <div className="card-actions">
          <input
            type="file"
            onChange={(e: any) => {
              setUploadFile(e.target.files[0]);
            }}
            className="file-input file-input-bordered file-input-info w-full max-w-xs bg-white"
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              handleUpload();
            }}
          >
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
};
