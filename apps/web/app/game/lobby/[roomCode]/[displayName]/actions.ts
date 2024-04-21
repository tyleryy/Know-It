import { redirect } from "next/navigation";
export const navigateToWaitingRoom = (code: string, displayName: string) => {
  redirect(`/game/waiting-player/${code}/${displayName}`);
};
