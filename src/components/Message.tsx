import { useUserData } from "@/hooks/userData";
import { Text } from "@nextui-org/react";
export default function Message({ msg }: any) {
  const data = useUserData();
  const side = data?.email === msg.from ? "end" : "";
  const color = data?.email === msg.from ? "black" : "#0f0e0e";
  return (
    <div
      style={{
        width: "200px",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        padding: "8px 5px 0px 8px",
        margin: "5px",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: side, // ojo aca verifico
      }}
    >
      <Text color="success" size="$md" css={{ alignSelf: "start" }}>
        {msg?.message}
      </Text>
      <Text color="#fff" size="$xs" css={{ alignSelf: "end" }}>
        hh:mm
      </Text>
    </div>
  );
}
