import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: "Arial Rounded MT Bold", sans-serif;
  opacity: 0.5;

  font-size: 18px;
  margin: 4px 0;

  &:hover {
    opacity: 1;
  }

  @media (min-width: 500px) {
    font-size: 25px;
    margin: 8px 0;
  }
`;

export default function CloseButton() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <Container>
      <Button onClick={handleClose}>X</Button>
    </Container>
  );
}
