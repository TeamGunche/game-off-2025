import styled from "styled-components";
import { useApp } from "@/store/useAppStore.ts";
import TitleImg from "@/../public/assets/img/UI/Title.png";
import BackgroundImg from "@/../public/assets/img/UI/Title_BG.png";

function MainMenu() {
  const { startGame, showSettings } = useApp();

  const handleExit = () => {
    window.api?.quitApp();
  };

  return (
    <Container>
      <Title src={TitleImg} />
      <MenuBox>
        <MenuButtons>
          <MenuButton onClick={startGame}>Game Start</MenuButton>
          <MenuButton onClick={showSettings}>Setting</MenuButton>
          {window.api && (
            <MenuButton onClick={handleExit}>Exit</MenuButton>
          )}
        </MenuButtons>
      </MenuBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;

  background-image: url(${BackgroundImg});
  background-size: cover;
`;

const MenuBox = styled.div`
  padding: 40px 60px;
  border-radius: 8px;
  //box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  min-width: 400px;

  //background-color: rgba(255, 255, 255, 0.1);
  //backdrop-filter: blur(15px);
`;

const Title = styled.img`
  margin-bottom: 40px;
  width: 300px;
`;

const MenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MenuButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #4a4a4a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #6a6a6a;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default MainMenu;
