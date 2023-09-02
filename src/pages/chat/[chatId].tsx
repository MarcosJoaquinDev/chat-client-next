import Layout from "@/components/LayoutChat";
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
      <Layout chatId={router.query.chatId} />
    </>
  );
}
