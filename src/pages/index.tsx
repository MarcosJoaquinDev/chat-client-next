import Head from "next/head";
import { Button, Text } from "@nextui-org/react";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const navigate = useRouter();
  return (
    <>
      <Head>
        <title>Chat MJD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text color="#dfdfd3" h1>
          Chat MJD
        </Text>
        <section>
          <img src="conversation.png" alt="logo de chat mjd" width={300} />
        </section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "15px",
          }}
        >
          <Button color="success" onPress={() => navigate.push("/login")}>
            <Text color="#fff" css={{ margin: 0 }} h3>
              Ingresar
            </Text>
          </Button>
          <Button
            bordered
            color="success"
            onPress={() => navigate.push("/sign")}
          >
            <Text color="#17c964" css={{ margin: 0 }} h3>
              Registrarme
            </Text>
          </Button>
        </div>
      </main>
    </>
  );
}
