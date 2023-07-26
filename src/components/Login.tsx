import useLogin from "@/hooks/login";
import { Button, Input, Spacer, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./ui.module.css";

export default function Login() {
  const initialData = { email: "", password: "" };
  const [data, setData] = useState<LoginData>(initialData);
  const [errorLogin, setErrorLogin] = useState("");
  const resLogin: any = useLogin(data.email, data.password);
  const router = useRouter();

  useEffect(() => {
    if (resLogin) {
      if (resLogin.type === "Email Error") setErrorLogin(resLogin.error);
      if (resLogin.type === "Password Invalid") setErrorLogin(resLogin.error);
    }
    if (resLogin === false) {
      console.log(resLogin);
      router.push("/chat");
    }
  }, [resLogin]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>();

  const handle: SubmitHandler<LoginData> = (FormData) => setData(FormData);
  return (
    <form onSubmit={handleSubmit(handle)} className={style["formContainer"]}>
      <Text h3>Ingresar</Text>
      <Spacer y={2.5} />
      <Input
        clearable
        underlined
        labelPlaceholder="Email"
        {...register("email", { required: true })}
        onInput={() => setErrorLogin("")}
      />
      <span style={{ color: "red" }}>
        {errors.email && "Este campo es requerido"}
      </span>
      <Spacer y={2.5} />
      <Input.Password
        clearable
        underlined
        labelPlaceholder="Password"
        {...register("password", {
          required: { value: true, message: "password is required" },
        })}
        onInput={() => setErrorLogin("")}
      />
      <span style={{ color: "red" }}>
        {errors.password && "Este campo es requerido"}
      </span>
      <Spacer y={2.5} />
      <span style={{ color: "red" }}>{errorLogin ? errorLogin : null}</span>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button color="success" type="submit">
          Ingresar
        </Button>
        <Button bordered color="success">
          Resgistrarme
        </Button>
      </div>
    </form>
  );
}
