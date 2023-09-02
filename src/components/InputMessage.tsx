import { useForm } from "react-hook-form";
import { SendButton, SendIcon } from "./SendButton";
import { useSendMessages } from "@/hooks/chat";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function NewMessages({ room }: any) {
  const [newMessage, setNewMessage] = useState({ message: "", id: "" });
  const { handleSubmit, register } = useForm();
  const [message, setMessage] = useState("");

  const res = useSendMessages(newMessage.message, newMessage.id);

  const handle = (e: any) => {
    setNewMessage({ message: e.message, id: room });
    setMessage("");
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(handle)}>
      <Input
        css={{ w: "100%" }}
        onInput={(e: any) => setMessage(e.target.value)}
        value={message}
        size="md"
        aria-labelledby=""
        contentRightStyling={false}
        {...register("message", { required: true })}
        placeholder="Type your message..."
        aria-label="a"
        contentRight={
          <SendButton>
            <SendIcon />
          </SendButton>
        }
      />
    </form>
  );
}
