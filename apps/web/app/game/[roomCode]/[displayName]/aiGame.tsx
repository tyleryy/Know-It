"use client";
import Image from "next/image";
import gem from "../../../../assets/gem.png";

const colors = [
  "bg-gradient-to-r to-[#781919] from-[#4B0808]",
  "bg-gradient-to-r to-[#4D6889] from-[#1A3D69]",
  "bg-gradient-to-r to-[#DEA52D] from-[#6F5217]",
  "bg-gradient-to-r to-[#B5A544] from-[#0F921A]",
];

const FAKEDATA = {
  question:
    "If you could spend one year in perfect happiness but afterward would remember nothing of the experience, would you?",
  answers: [
    {
      is_correct: true,
      answer: "Well yes but no, um actually",
      explaination: "",
    },
    {
      is_correct: false,
      answer: "Well yes but no, um actually",
      explaination: "This is because of that",
    },
    {
      is_correct: false,
      answer: "Well yes but no, um actually",
      explaination: "This is because of that",
    },
    {
      is_correct: false,
      answer: "Well yes but no, um actually",
      explaination: "Because I said so",
    },
  ],
};

export default async function AiGame() {
  return (
    <div className="flex flex-col w-6/12 bg-[#141C2F] h-full rounded-lg px-10 py-6">
      <div className="flex flex-col">
        <Image
          src={gem}
          alt="gemini pic"
          className="w-[4rem] h-[4rem] rounded-full"
        />
        <p className="text-white text-2xl font-bold">{FAKEDATA.question}</p>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-7 mt-7">
          {FAKEDATA.answers.map((answer, index) => (
            <div
              key={index}
              className={`btn flex rounded-xl items-center text-lg text-white justify-between px-4 py-4 min-h-32 ${colors[index]}`}
            >
              <span className="font-medium">{answer.answer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
