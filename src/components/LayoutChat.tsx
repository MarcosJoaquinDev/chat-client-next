import { Button, Grid, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import Messages from "./Messages";
import ChatTab from "./TabChat";
import { useChatsData } from "@/hooks/userData";
import { ChatsHeader } from "./UI";
import { AddUser } from "./AddUser";
import { SettingIcon } from "./Icons";

export default function Layout({ chatId }: any) {
  const chats = useChatsData();
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
          }}
        >
          <AddUser />
          <Button css={{ backgroundColor: "transparent" }} auto>
            <SettingIcon />
          </Button>
        </aside>
        <ChatsHeader>
          <Input
            bordered
            placeholder="Buscar"
            size="md"
            color="primary"
            css={{ color: "#fff" }}
          />
          {chats?.map((chat: any) => (
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
