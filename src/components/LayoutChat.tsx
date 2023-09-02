import { Button, Grid, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import Messages from "./Messages";
import ChatTab from "./TabChat";
import { useChatsData } from "@/hooks/userData";
import { ChatsHeader } from "./UI";
import { AddUser } from "./AddUser";
import { SettingIcon } from "./Icons";
import { useEffect, useState } from "react";

export default function Layout({ chatId }: any) {
  const chats = useChatsData();
  const [searchChat, setSearchChat] = useState("");
  const [chatsFilters, setChatFilters] = useState([]);

  const handleFilter = (e: any) => setSearchChat(e.target.value);
  useEffect(() => {
    if (searchChat) {
      const filters = chats.filter((chat: any) =>
        chat.name.toLowerCase().includes(searchChat)
      );
      setChatFilters(filters);
    }
  }, [searchChat]);
  return (
    <Grid.Container
      gap={1}
      justify="space-between"
      css={{ flexWrap: "no-wrap" }}
    >
      <Grid xs={4} css={{ minWidth: "350px" }}>
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <AddUser />
          <Button css={{ backgroundColor: "transparent", padding: "0" }} auto>
            <SettingIcon />
          </Button>
        </aside>
        <ChatsHeader>
          <Input
            bordered
            value={searchChat}
            aria-labelledby=""
            onChange={handleFilter}
            placeholder="Buscar"
            size="md"
            color="primary"
            css={{ color: "#fff" }}
          />
          {!searchChat.length
            ? chats?.map((chat: any) => (
                <Link href={`/chat/${chat.roomId}`} key={chat.roomId}>
                  <ChatTab chat={chat} />
                </Link>
              ))
            : chatsFilters?.map((chat: any) => (
                <Link href={`/chat/${chat.roomId}`} key={chat.roomId}>
                  <ChatTab chat={chat} />
                </Link>
              ))}
        </ChatsHeader>
      </Grid>
      <Grid xs={8}>
        <div style={{ width: "100%", height: "80vh" }}>
          {chatId ? (
            <Messages chatId={chatId} />
          ) : (
            <Text h2 css={{ textAlign: "center" }}>
              Welcome to Chat
            </Text>
          )}
        </div>
      </Grid>
    </Grid.Container>
  );
}
