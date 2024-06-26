"use client";
import ReadyButton from "../../../room-setting/[roomCode]/[displayName]/ReadyButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import file_img from "./file-1453.svg";
import { navigateToWaitingRoom } from "./actions";
import { createClient } from "../../../../../utils/supabase/client";

import dog from "../../../../../assets/avatars/dog.svg";
import frog from "../../../../../assets/avatars/frog.svg";
import penguin from "../../../../../assets/avatars/penguin.svg";
import chicken from "../../../../../assets/avatars/chicken.svg";

const userConfig = [
  { name: "tyler" },
  { name: "nwin" },
  { name: "stevem" },
  { name: "katy" },
];
interface PageProps {
  params: any;
}
const avatarMap: any = {
  dog: dog,
  frog: frog,
  penguin: penguin,
  chicken: chicken,
  cat: frog,
};

const LobbyPage = ({ params }: PageProps) => {
  const supabase = createClient();
  const [gameState, setGameState] = useState<any>(null);
  const [isHost, setIsHost] = useState(false);

  // Create a function to handle inserts
  const handleUpdates = (payload: any) => {
    // setGameData((prev: any) => {
    //   payload.new;
    // });
    setGameState(payload.new);
  };

  // Listen to inserts
  const room = supabase
    .channel(params.roomCode)
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "Games" },
      handleUpdates
    )
    .subscribe();

  useEffect(() => {
    async function fetchData() {
      const gameState: any = await supabase
        .from("Games")
        .select("*")
        .eq("room_id", params.roomCode);

      setGameState(gameState.data[0]);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (gameState) {
      if (params.displayName === gameState.host) {
        setIsHost(true);
      }
    }
  }, [gameState]);

  return (
    <>
      <div className=" flex justify-center items-center h-screen flex-col">
        <div className="m-10 flex flex-row justify-center">
          <div className="flex flex-row gap-10">
            <div>
              <AvatarStack users={gameState?.players} />
            </div>
            <div>
              <FileUpload
                gameState={gameState}
                params={params}
                supabase={supabase}
              />
            </div>
          </div>
        </div>
        {
          // if host
          isHost ? (
            <ReadyButton
              label="Ready"
              formAction={navigateToWaitingRoom}
            ></ReadyButton>
          ) : (
            <div className="p-5 rounded-full bg-purple-500">
              <span className="text-3xl"> Waiting for Host...</span>
            </div>
          )
        }
      </div>
    </>
  );
};

export default LobbyPage;

const AvatarStack = ({ users }: any) => {
  return (
    <>
      {users?.map((user: any, index: number) => {
        return (
          <div key={user.name} className="relative -left-10">
            <Image
              src={avatarMap[user.avatar]}
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

const FileUpload = ({ gameState, params, supabase }: any) => {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    console.log(files);
    if (files.length === 0) {
      console.log("no file to upload");
      return;
    }
    const fileSync = async () => {
      const { error } = await supabase
        .from("Games")
        .update({
          files: files,
        })
        .eq("room_id", params.room_id);
      if (error) {
        alert("Error uploading files");
        return;
      }
    };
    fileSync();
  }, [files]);

  const handleUpload = async () => {
    if (!uploadFile) {
      console.log("no file to upload");
      return;
    }
    setFiles([...files, uploadFile]);
    setUploadFile(null);
  };
  const [uploadFile, setUploadFile] = useState<any>(null);
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
          <form>
            <button
              className="btn btn-primary"
              formAction={() => {
                handleUpload();
              }}
            >
              Upload File
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
