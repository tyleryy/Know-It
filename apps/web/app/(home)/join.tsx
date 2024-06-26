"use client";
import React, { useState } from "react";
import { navigateToSelection } from "./actions";
import { createClient } from "../../utils/supabase/client";

const JoinModal = ({ displayName }: any) => {
  const [code, setCode] = useState("");
  const supabase = createClient();
  async function handleContinue(code: string) {
    const gameState: any = await supabase
      .from("Games")
      .select("players, room_id, host")
      .eq("room_id", code);
    if (gameState.data.length === 0) {
      alert("Room not found");
      return;
    }
    let gameStateData = gameState.data[0];
    gameStateData.players.push({ name: displayName, avatar: "", score: 0 });

    const { error } = await supabase
      .from("Games")
      .update({
        players: gameStateData.players,
      })
      .eq("room_id", code);
    if (error) {
      alert("Error joining room");
      return;
    }

    navigateToSelection(code, displayName);
  }
  return (
    <>
      <button
        className="btn btn-lg text-5xl text-white border-2 border-white"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement
          ).showModal()
        }
      >
        <svg
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.6339 0.366135C32.3995 0.131729 32.0815 3.13799e-05 31.75 0H31.746L21.7775 0.0314331C21.594 0.0320155 21.4129 0.072981 21.247 0.151423C21.0811 0.229864 20.9346 0.343858 20.8177 0.485312L9.81828 13.8004L8.51773 12.4998C8.04843 12.0318 7.41268 11.769 6.74989 11.769C6.0871 11.7691 5.45138 12.0319 4.98212 12.5L3.00015 14.4821C2.76797 14.7142 2.58378 14.9898 2.45811 15.2932C2.33244 15.5965 2.26775 15.9216 2.26773 16.2499C2.26772 16.5782 2.33238 16.9033 2.45802 17.2066C2.58366 17.51 2.76783 17.7856 3 18.0177L6.26355 21.2814L1.5852 25.9598C1.11708 26.429 0.854203 27.0647 0.854233 27.7275C0.854262 28.3903 1.1172 29.0261 1.58536 29.4952L3.50476 31.4146C3.73691 31.6468 4.01251 31.831 4.31584 31.9566C4.61916 32.0822 4.94426 32.1469 5.27257 32.1469C5.60088 32.1469 5.92598 32.0822 6.2293 31.9566C6.53263 31.831 6.80823 31.6468 7.04038 31.4146L11.7186 26.7363L14.9823 30.0002C15.4516 30.4681 16.0873 30.7309 16.7501 30.7309C17.4129 30.7309 18.0486 30.468 18.5179 30L20.4998 28.0179C20.732 27.7858 20.9162 27.5102 21.0419 27.2068C21.1676 26.9035 21.2323 26.5784 21.2323 26.2501C21.2323 25.9218 21.1676 25.5967 21.042 25.2934C20.9163 24.99 20.7322 24.7144 20.5 24.4823L19.1995 23.1818L32.5146 12.1823C32.6561 12.0654 32.7701 11.9189 32.8485 11.753C32.927 11.5871 32.968 11.406 32.9686 11.2225L33 1.25397C33.0005 1.08916 32.9684 0.925869 32.9056 0.7735C32.8428 0.621131 32.7505 0.482687 32.6339 0.366135ZM30.4704 10.6284L17.4238 21.406L15.3928 19.375L23.8839 10.8839C24.1184 10.6495 24.2501 10.3315 24.2501 10C24.2501 9.66846 24.1184 9.35049 23.8839 9.11606C23.6495 8.88162 23.3316 8.74992 23 8.74992C22.6685 8.74992 22.3505 8.88162 22.1161 9.11606L13.625 17.6072L11.5941 15.5762L22.3716 2.52953L30.496 2.50397L30.4704 10.6284Z"
            fill="#42408F"
          />
        </svg>
        Join
      </button>
      <dialog id={"my_modal_1"} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">Enter the Room Code</h3>
          <input
            type="text"
            placeholder="Ex: 123456"
            className="input input-bordered w-full max-w-xs mt-5"
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-success w-32 text-base text-white"
                formAction={() => handleContinue(code)}
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default JoinModal;
