import { Button, Card, Input, Spacer, Text } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./ui.module.css";
import { useState } from "react";
import { useSetNewUser } from "@/hooks/userData";

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterData>();

  const [data, setData] = useState<RegisterData | null>(null);
  const res = useSetNewUser(data);
  console.log(res);
  const handle: SubmitHandler<RegisterData> = (formData) => {
    if (fileDataURL) {
      const { username, email, password } = formData;
      let userData = { username, email, password, img: fileDataURL };
      setData(userData);
    } else {
      console.log("no hay foto");
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
