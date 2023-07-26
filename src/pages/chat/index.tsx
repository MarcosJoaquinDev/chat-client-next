import Layout from "@/components/LayoutChat";
import { useUserData } from "@/hooks/userData";
import { Text, Avatar } from "@nextui-org/react";
import Head from "next/head";
export default function ChatPage() {
  const data = useUserData();

  return (
    <>
      <Head>
        <title>Chat - MJD</title>
        <link rel="icon" href="/message.svg" />
      </Head>
      <div
        style={{
          marginTop: "20px",
          marginLeft: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Avatar text="John" size="xl" src={data?.img} />
        <Text color="primary" size="$3xs">
          {data?.email}
        </Text>
      </div>
      <Layout />
    </>
  );
}
