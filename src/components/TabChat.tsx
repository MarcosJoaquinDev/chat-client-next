import { Card, User } from "@nextui-org/react";
export default function ChatTab({ chat }: any) {
  return (
    <Card isPressable isHoverable css={{ mb: 5 }}>
      <Card.Body css={{ backgroundColor: "#71b17d", border: "none" }}>
        <User bordered src={chat.img} name={chat.name} color="success" />
      </Card.Body>
    </Card>
  );
}
