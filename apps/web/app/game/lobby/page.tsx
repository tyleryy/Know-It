"use client";
import ReadyButton from "../room-setting/ReadyButton";

// interface FileUploadButtonProps {
//   // Define your props here
// }

// const FileUploadButton: React.FC<FileUploadButtonProps> = (props) => {
//   // Use your props here

//   return (
//     <div>
//       <button
//         className="btn text-white"
//         onClick={() => {
//           const modal: any = document.getElementById("my_modal_1");
//           if (modal) {
//             modal.showModal();
//           }
//         }}
//       >
//         open modal
//       </button>
//       <dialog id="my_modal_1" className="modal text-white">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Hello!</h3>
//           <p className="py-4">
//             Press ESC key or click the button below to close
//           </p>
//           <div className="modal-action">
//             <form method="dialog">
//               {/* if there is a button in form, it will close the modal */}
//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

const LobbyPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex flex-row justify-center">
          <div className="flex flex-row gap-10">
            <div> hi</div>
            <div>
              <input
                type="file"
                className="file-input file-input-bordered file-input-info w-full max-w-xs bg-white"
              />
            </div>
          </div>
        </div>
        <ReadyButton label="Ready" onClick={() => {}}></ReadyButton>
      </div>
    </>
  );
};

export default LobbyPage;
