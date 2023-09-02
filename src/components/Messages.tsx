import { useEffect, useState } from "react";
import { rtdb } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import type { DataSnapshot, Query } from "firebase/database";
import { useChatMessages, useChatsData } from "@/hooks/userData";
import { Avatar, Card } from "@nextui-org/react";
import NewMessages from "./InputMessage";
import Message from "./Message";

export default function Messages({ chatId }: any) {
  const [messages, setMessages] = useState<any>([]);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const room = useChatMessages(chatId);
  const data = useChatsData();

  useEffect(() => {
    if (data) {
      const picture = data.find((i: any) => i.roomId === chatId);
      setUserAvatar(picture.img);
      setUserName(picture.name);
    }
  }, [chatId]);
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
          <Avatar src={userAvatar} text={userName} />
        </Card.Header>
        <Card.Body>
          {messages.map((m: any, index: number) => (
            <Message msg={m} key={index} />
          ))}
        </Card.Body>
        <Card.Footer css={{ backgroundColor: "#1f1f1f" }}>
          <NewMessages room={room} />
        </Card.Footer>
      </Card>
    </>
  );
}
