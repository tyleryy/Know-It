"use client";
import dog from "../../assets/avatars/dog.svg";
import frog from "../../assets/avatars/frog.svg";
import penguin from "../../assets/avatars/penguin.svg";
import chicken from "../../assets/avatars/chicken.svg";
import Image from "next/image";

const chatMessages = [
  {
    id: 1,
    room_id: 23,
    message: "Hi there, how's it going?",
    time: "2024-04-20 21:59:06",
    username: "BarkRanger",
    avatar: "dog",
  },
  {
    id: 2,
    room_id: 16,
    message: "Hello! Long time no see.",
    time: "2024-04-20 22:13:06",
    username: "IceWaddler",
    avatar: "penguin",
  },
  {
    id: 3,
    room_id: 25,
    message: "Hey! What are you up to today?",
    time: "2024-04-20 22:13:06",
    username: "FeatherFan",
    avatar: "chicken",
  },
  {
    id: 4,
    room_id: 50,
    message: "Good morning, hope you're well!",
    time: "2024-04-20 22:47:06",
    username: "GreenHopper",
    avatar: "frog",
  },
  {
    id: 4,
    room_id: 50,
    message: "Good morning, hope you're well!",
    time: "2024-04-20 22:47:06",
    username: "GreenHopper",
    avatar: "frog",
  },
  {
    id: 4,
    room_id: 50,
    message: "Good morning, hope you're well!",
    time: "2024-04-20 22:47:06",
    username: "GreenHopper",
    avatar: "frog",
  },
  {
    id: 4,
    room_id: 50,
    message: "Good morning, hope you're well!",
    time: "2024-04-20 22:47:06",
    username: "GreenHopper",
    avatar: "frog",
  },
  {
    id: 4,
    room_id: 50,
    message: "Good morning, hope you're well!",
    time: "2024-04-20 22:47:06",
    username: "GreenHopper",
    avatar: "frog",
  },
];

const avatarMap = {
  dog: dog,
  frog: frog,
  penguin: penguin,
  chicken: chicken,
};

export default function Chat() {
  return (
    <div className="flex flex-col w-3/12 h-full bg-[#141C2F] rounded-lg p-3">
      <div className="flex flex-col overflow-auto	h-[80%]">
        {chatMessages.map((chat) => (
          <div key={chat.id} className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image
                  alt={`${chat.username} avatar`}
                  src={avatarMap[chat.avatar]}
                  className="w-9 h-9 rounded-full"
                />
              </div>
            </div>
            <div className="chat-header">
              {chat.username}
              {/* <time className="text-xs opacity-50">
              {new Date(chat.time).toLocaleTimeString()}
            </time> */}
            </div>
            <div className="chat-bubble text-lg text-white shadow-md">
              {chat.message}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Type here"
          className="inputinput-bordered input-primary w-full max-w-xs p-3 rounded-xl"
        />
        <button className="btn btn-circle bg-[#375287] items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.9306 14.255L6.8162 2.43098C6.46094 2.23205 6.05342 2.14629 5.64811 2.18516C5.2428 2.22403 4.859 2.38568 4.54802 2.64851C4.23704 2.91133 4.01368 3.26281 3.9078 3.65598C3.80192 4.04914 3.81855 4.46525 3.95549 4.84871L7.58097 15.0001H17C17.2653 15.0001 17.5196 15.1054 17.7071 15.293C17.8947 15.4805 18 15.7349 18 16.0001C18 16.2653 17.8947 16.5196 17.7071 16.7072C17.5196 16.8947 17.2653 17.0001 17 17.0001H7.58097L3.95549 27.1514C3.84831 27.4532 3.81496 27.7762 3.85825 28.0935C3.90153 28.4108 4.02018 28.7131 4.20427 28.9751C4.38836 29.2372 4.63254 29.4513 4.91636 29.5996C5.20018 29.7478 5.51539 29.826 5.83561 29.8275C6.17925 29.8268 6.51696 29.7379 6.81632 29.5692L27.9305 17.7452C28.2407 17.5715 28.4989 17.3182 28.6787 17.0115C28.8585 16.7047 28.9533 16.3556 28.9533 16.0001C28.9533 15.6446 28.8586 15.2955 28.6788 14.9887C28.499 14.682 28.2408 14.4287 27.9306 14.255Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
