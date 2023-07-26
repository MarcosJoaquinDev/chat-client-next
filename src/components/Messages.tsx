import { useEffect, useState } from "react";
import { rtdb } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import type { DataSnapshot, Query } from "firebase/database";
import { useChatMessages } from "@/hooks/userData";
import { Avatar, Card, Text, User } from "@nextui-org/react";
import NewMessages from "./InputMessage";
import Message from "./Message";

export default function Messages({ chatId }: any) {
  const [messages, setMessages] = useState<any>([]);
  const room = useChatMessages(chatId);

  useEffect(() => {
    const chatroom: Query = ref(rtdb, `/rooms/${room}/messages`);
    onValue(chatroom, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      let msjFirebaseObj = [];
      for (const iterator in data) {
        msjFirebaseObj.push(data[iterator]);
      }
      msjFirebaseObj.shift();
      setMessages(msjFirebaseObj);
    });
  }, [room]);

  return (
    <>
      <Card css={{ w: "100%", h: "100%", backgroundColor: "#16181a" }}>
        <Card.Header css={{ padding: "$xs" }}>
          <Avatar />
        </Card.Header>
        <Card.Body>
          {messages.map((m: any) => (
            <Message msg={m} />
          ))}
        </Card.Body>
        <Card.Footer css={{ backgroundColor: "#1f1f1f" }}>
          <NewMessages room={room} />
        </Card.Footer>
      </Card>
    </>
  );
}
