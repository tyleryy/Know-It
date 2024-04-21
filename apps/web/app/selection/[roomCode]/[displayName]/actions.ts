import { redirect } from "next/navigation";

export function navigateToRoomSetting(code: string, displayName: string) {
  redirect(`/game/room-setting/${code}/${displayName}`);
}

export const navigateToWaitingRoom = (code: string, displayName: string) => {
  redirect(`/game/waiting-player/${code}/${displayName}`);
};

export const navigateToLobby = (code: string, displayName: string) => {
  redirect(`/game/lobby/${code}/${displayName}`);
};
