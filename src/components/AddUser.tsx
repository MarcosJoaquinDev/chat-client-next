import { useEffect, useState } from "react";
import { AddUserIcon } from "./Icons";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useAddUser } from "@/hooks/chat";
import { useSWRConfig } from "swr";
export function AddUser() {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);
  const { handleSubmit, register } = useForm<NewUser>();

  const [data, setData] = useState<NewUser>({ email: "", name: "" });
  const res: any = useAddUser(data.name, data.email);
  const [error, setError] = useState(null);
  const { mutate } = useSWRConfig();
  useEffect(() => {
    if (res === true) {
      mutate("chat");
      setVisible(false);
    } else {
      setError(res);
    }
  }, [res]);

  const handleSub = (formData: any) => {
    setData(formData);
  };
  return (
    <>
      <Button
        onPress={handler}
        css={{
          backgroundColor: "transparent",
          padding: "6px",
          marginLeft: "6px",
        }}
        auto
      >
        <AddUserIcon />
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <form onSubmit={handleSubmit(handleSub)}>
          <Modal.Header>
            <Text b size={18}>
              <AddUserIcon />
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              label="Name"
              placeholder="Next123"
              {...register("name", { required: true })}
            />
            <Input
              clearable
              bordered
              fullWidth
              aria-labelledby=""
              label="Email"
              placeholder="example@domain.com"
              {...register("email", { required: true })}
            />
            {error && <Text css={{ color: "red" }}>{error}</Text>}
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat onPress={closeHandler}>
              Close
            </Button>
            <Button auto type="submit">
              Sign in
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
