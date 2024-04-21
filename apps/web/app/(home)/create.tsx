"use client";
import React, { useState } from "react";
import { navigateToSelection } from "./actions";
import { createClient } from "../../utils/supabase/client";

function generateRandomCode(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const CreateModal = ({ displayName }: any) => {
  const supabase = createClient();
  supabase
    .from("Games")
    .select()
    .then((data) => console.log(data.data));
  const [code, setCode] = useState("");

  async function handleContinue(code: string) {
    await supabase.from("Games").insert([
      {
        room_id: code,
        host: displayName,
        players: [{ name: displayName, avatar: "", score: 0 }],
      },
    ]);
    navigateToSelection(code);
  }

  return (
    <>
      <button
        className="btn btn-lg text-5xl text-white border-2 border-white"
        onClick={() => {
          (
            document.getElementById("my_modal_2") as HTMLDialogElement
          ).showModal();
          setCode(generateRandomCode(5));
        }}
      >
        <svg
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.4361 7.20262C34.0964 6.91154 33.6837 6.72435 33.2453 6.6624C32.8068 6.60045 32.3602 6.66624 31.9565 6.85226L24.4479 10.2773L20.0761 2.20087C19.8704 1.82085 19.5695 1.5042 19.2044 1.28373C18.8394 1.06327 18.4236 0.94701 18 0.94701C17.5764 0.94701 17.1606 1.06327 16.7956 1.28373C16.4305 1.5042 16.1296 1.82085 15.9239 2.20087L11.552 10.2772L4.04224 6.85167C3.63818 6.66741 3.19204 6.60258 2.75402 6.66445C2.31601 6.72633 1.90352 6.91246 1.56299 7.20189C1.22247 7.49133 0.96742 7.87257 0.826568 8.30271C0.685715 8.73284 0.664649 9.19479 0.76574 9.63655L4.54278 26.1404C4.61464 26.4599 4.74922 26.761 4.93829 27.0254C5.12736 27.2897 5.36695 27.5117 5.64243 27.6778C5.91935 27.8451 6.2262 27.9536 6.54477 27.9968C6.86334 28.0401 7.18713 28.0171 7.49689 27.9294C14.368 25.9826 21.6246 25.9818 28.4962 27.9273C28.8058 28.0149 29.1294 28.0378 29.4478 27.9946C29.7662 27.9514 30.0729 27.843 30.3497 27.6757C30.6251 27.5098 30.8646 27.288 31.0537 27.0238C31.2428 26.7597 31.3774 26.4588 31.4494 26.1395L35.233 9.63789C35.3359 9.19612 35.3158 8.73355 35.1749 8.30296C35.034 7.87236 34.778 7.49108 34.4361 7.20262ZM23.931 20.7582C23.9149 20.9175 23.8683 21.0719 23.7939 21.2127C23.7196 21.3534 23.6189 21.4777 23.4976 21.5785C23.3764 21.6792 23.237 21.7544 23.0874 21.7998C22.9377 21.8451 22.7809 21.8598 22.6258 21.8428C19.5504 21.5113 16.4496 21.5113 13.3742 21.8428C13.0616 21.8754 12.7491 21.7795 12.5053 21.5762C12.2614 21.3728 12.106 21.0785 12.0731 20.7578C12.0402 20.4371 12.1326 20.116 12.3299 19.865C12.5272 19.614 12.8134 19.4535 13.1258 19.4187C16.3663 19.0694 19.6337 19.0694 22.8742 19.4187C23.0293 19.4354 23.1797 19.4833 23.3167 19.5597C23.4538 19.6361 23.5748 19.7394 23.673 19.8638C23.7711 19.9882 23.8444 20.1312 23.8887 20.2847C23.9329 20.4382 23.9473 20.5991 23.931 20.7582Z"
            fill="#42408F"
          />
        </svg>
        Create
      </button>
      <dialog id={"my_modal_2"} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">Your Room Code:</h3>
          <p className="py-4 italic">{code}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-success w-32 text-base text-white"
                formAction={() => handleContinue(code)}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateModal;
