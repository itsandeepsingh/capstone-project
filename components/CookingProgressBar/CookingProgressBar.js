import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const ProgressBar = styled.div`
  position: relative;
  flex: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  margin: 0 5px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  height: 6px;

  @media (min-width: 500px) {
    height: 8px;
  }
`;

const ProgressIndicator = styled.div`
  position: absolute;
  height: 100%;
  width: ${(props) => (props.$pastAndCurrentSteps ? "100%" : "0")};
  background-color: #636363;
  border-radius: 3px;
`;

export default function CookingProgressBar({ totalSteps, currentStepIndex }) {
  return (
    <Container>
      {Array.from({ length: totalSteps }, (_, index) => (
        <ProgressBar key={index}>
          <ProgressIndicator $pastAndCurrentSteps={index <= currentStepIndex} />
        </ProgressBar>
      ))}
    </Container>
  );
}
