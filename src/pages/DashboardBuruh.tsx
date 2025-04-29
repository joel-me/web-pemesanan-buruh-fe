import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #0b7a35;
`;

const Text = styled.p`
  color: #6b7280; /* abu-abu soft */
  font-size: 16px;
`;

export const DashboardBuruh = () => {
  return (
    <Container>
      <Title>Pesanan Masuk</Title>
      <Text>Belum ada pesanan.</Text>
    </Container>
  );
};

export default DashboardBuruh;
