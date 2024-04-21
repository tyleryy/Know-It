import { redirect } from "next/navigation";

export function navigateToRoomSetting(code: string, displayName: string) {
  redirect(`/game/room-setting/${code}/${displayName}`);
}
