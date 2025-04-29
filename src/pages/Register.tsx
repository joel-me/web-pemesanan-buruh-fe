import { useForm } from "react-hook-form";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: "buruh" | "petani";
};

// Styled Components
const Container = styled.div`
  background-color: #0b7a35;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #0b7a35;
  margin-bottom: 20px;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
`;

const Select = styled.select`
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #0b7a35;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #095c2d;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Link = styled.a`
  color: #0b7a35;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Register = () => {
  const { register, handleSubmit } = useForm<RegisterInput>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterInput) => {
    try {
      await axios.post("/api/auth/register", data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Register</Title>

        <Input
          {...register("name")}
          placeholder="Masukkan nama"
        />
        <Input
          {...register("email")}
          placeholder="Masukkan email"
          type="email"
        />
        <Input
          {...register("password")}
          placeholder="Masukkan password"
          type="password"
        />

        <Select {...register("role")}>
          <option value="">Pilih Role</option>
          <option value="petani">Petani</option>
          <option value="buruh">Buruh</option>
        </Select>

        <Button type="submit">Daftar</Button>

        <Footer>
          <p>
            Sudah punya akun? <Link href="/login">Login di sini</Link>
          </p>
        </Footer>
      </Form>
    </Container>
  );
};

export default Register;
