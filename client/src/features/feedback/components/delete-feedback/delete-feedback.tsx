import { Button } from "@components/elements/button";
import * as Dialog from "@radix-ui/react-dialog";

export function DeleteFeedback() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button status="alert" name="Delete" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Delete Feedback</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete the feedback?
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
