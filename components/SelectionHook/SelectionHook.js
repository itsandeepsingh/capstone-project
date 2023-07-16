import Image from "next/image.js";
import styled from "styled-components";

const Hook = styled(Image)`
  position: absolute;
  z-index: 1;
  bottom: 10px;
  right: 10px;

  width: 30px;
  height: 30px;

  @media (max-width: 500px) {
    width: 22px;
    height: 22px;
  }
`;

export default function SelectionHook() {
  return (
    <Hook
      src={require(`/assets/hook.png`).default}
      width={22}
      height={22}
      alt=""
    />
  );
}
