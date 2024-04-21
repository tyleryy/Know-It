import { redirect } from "next/navigation";

export function navigateToSelection(code: string, displayName: string) {
  redirect(`/selection/${code}/${displayName}`);
}
