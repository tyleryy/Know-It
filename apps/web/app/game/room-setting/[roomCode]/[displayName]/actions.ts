import { redirect } from "next/navigation";
export const navigateToWaitingRoom = (code: string, displayName: string) => {
  redirect(`/game/waiting-player/${code}/${displayName}`);
};

export const navigateToSelection = (code: string, displayName: string) => {
  redirect(`/selection/${code}/${displayName}`);
};
