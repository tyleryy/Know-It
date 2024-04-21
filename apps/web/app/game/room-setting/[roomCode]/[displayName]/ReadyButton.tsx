"use client";
interface ReadyButtonProps {
  formAction: any;
  label: string;
  disabled?: boolean;
}

const ReadyButton: React.FC<ReadyButtonProps> = ({
  formAction,
  label,
  disabled = false,
}) => {
  return (
    <form>
      <button
        disabled={disabled}
        formAction={() => formAction()}
        className="btn btn-default text-black bg-white m-10 w-48 h-16 border-none hover:text-white hover:bg-purple-800 rounded-3xl"
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default ReadyButton;
