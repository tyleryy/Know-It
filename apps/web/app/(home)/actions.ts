import { redirect } from "next/navigation";

export function navigateToSelection(code: string, displayName: string) {
  redirect(`/selection/${code}/${displayName}`);
}

export function navigateToRoomSetting(code: string, displayName: string) {
  redirect(`/game/room-setting/${code}/${displayName}`);
}
