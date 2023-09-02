import { Button, Card, Input, Spacer, Text } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./ui.module.css";
import { useEffect, useState } from "react";
import { useSetNewUser } from "@/hooks/userData";
import { useRouter } from "next/router";
import useLogin from "@/hooks/login";

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterData>();
  const [data, setData] = useState<RegisterData | null>(null);
  const [errorPic, setErrorPic] = useState(false);

  const navigation = useRouter();
  const initialData = { email: "", password: "" };
  const [login, setLogin] = useState<LoginData>(initialData);
  const resLogin: any = useLogin(login.email, login.password);

  const res = useSetNewUser(data);

  useEffect(() => {
    if (res && data) {
      setLogin({ email: data.email, password: data.password });
    }
    if (resLogin == false) {
      navigation.push("/chat");
    }
  }, [res, resLogin]);

  const handle: SubmitHandler<RegisterData> = (formData) => {
    if (fileDataURL) {
      const { username, email, password } = formData;
      let userData = { username, email, password, img: fileDataURL };
      setData(userData);
    } else {
      setErrorPic(true);
    }
  };

  const [fileDataURL, setFileDataURL] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader: any = new FileReader();
    reader.onloadend = () => {
      setFileDataURL(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(handle)} className={style["formContainer"]}>
      <Text h3>Registrarme</Text>
      <Spacer y={2.5} />

      <Input
        clearable
        underlined
        aria-labelledby=""
        labelPlaceholder="Usuario"
        {...register("username", { required: true })}
      />
      <span style={{ color: "red" }}>
        {errors.username && "Este campo es requerido"}
      </span>
      <Spacer y={2.5} />

      <Input
        clearable
        underlined
        aria-labelledby=""
        labelPlaceholder="Email"
        {...register("email", { required: true })}
      />
      <span style={{ color: "red" }}>
        {errors.email && "Este campo es requerido"}
      </span>
      <Spacer y={2.5} />

      <Input.Password
        clearable
        underlined
        aria-labelledby=""
        labelPlaceholder="Contraseña"
        {...register("password", { required: true })}
      />
      <span style={{ color: "red" }}>
        {errors.password && "Este campo es requerido"}
      </span>
      <Spacer y={2.5} />

      <Card css={{ w: "300px" }}>
        <Card.Body>
          <input type="file" onChange={handleFileChange} />
          {fileDataURL && (
            <img src={fileDataURL} alt="Preview" style={{ maxWidth: "100%" }} />
          )}
        </Card.Body>
      </Card>
      <Spacer y={1.5} />
      <span style={{ color: "red" }}>
        {errorPic && "Este campo es requerido"}
      </span>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button color="success" type="submit">
          Aceptar
        </Button>
        <Button bordered color="success">
          Volver
        </Button>
      </div>
    </form>
  );
}
