import { redirect } from "next/navigation";

export function navigateToRoomSetting(code: string) {
  redirect(`/game/room-setting/${code}`);
}
