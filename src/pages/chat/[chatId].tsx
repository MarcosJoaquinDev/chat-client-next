import Layout from "@/components/LayoutChat";
import { Text } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ChatId() {
  const router = useRouter();
  const title = "Chat - Marcos";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Text color="primary" h3>
        Chat con {router.query.chatId}
      </Text>
      <Layout chatId={router.query.chatId} />
    </>
  );
}
