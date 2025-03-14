import React from 'react';
import styled from 'styled-components';
import { Bio } from "../../data/constants";
import { UseHover } from '../../hoverContext';
import Typewriter from "typewriter-effect";
import pfp from "../../images/pfp1.jpg";
import pfp2 from "../../images/pfp2.jpg";

export const HeroContainer = styled.div`
  background: ${({ isHovered, theme }) => isHovered ? theme.black : theme.card_light};
  display: flex;
  margin-bottom: 50px;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  transition: background-color 0.3s ease;
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640) {
    padding: 32px 16px;
  }
  z-index: 1;

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;

export const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
export const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const HeroRightContainer = styled.div`
  position: relative; // Ensure proper stacking for images
  height: 100%;
  width: 100%;
  display: flex;
  order: 2;
  justify-content: end;
  gap: 12px;
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

export const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

export const Span = styled.span`
  margin-left: 5px;
  color: ${({ isHovered, theme }) => isHovered ? theme.red : theme.primary};
  cursor: pointer;
  transition: color 0.3s ease;
`;

export const Subtitle = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

export const ResumeButton = styled.a`
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    text-decoration: none;
    width: 95%;
    max-width: 300px;
    text-align: center;
    padding: 16px 0;
    color:${({ theme }) => theme.white};
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
      background: ${({ isHovered, theme }) =>
      isHovered
      ? `linear-gradient(225deg, hsla(354, 78%, 30%, 1) 0%, hsla(354, 89%, 54%, 1) 100%);`
      : `linear-gradient(225deg, hsla(251, 100%, 50%, 1) 0%, hsla(203, 100%, 50%, 1) 100%);`};
    box-shadow:  20px 20px 60px #1F2634,
    -20px -20px 60px #1F2634;
    transition: all 0.15s ease !important;
    &:hover {
        transform: translateY(-5px) scale(1.03);
    box-shadow:  20px 20px 60px #1F2634,
    filter: brightness(1);
    }    
    
    
    @media (max-width: 640px) {
        padding: 12px 0;
        font-size: 18px;
    } 

`;

export const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border-radius: 50%;
  border: 2px solid ${({ isHovered2, theme }) => isHovered2 ? theme.red : theme.primary};

  animation-name: floating;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  transition: all 0.5s ease;
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
  position: absolute;
  transform: ${({ isHovered }) => (isHovered ? 'scale(1)' : 'scale(0.95)')};

  @keyframes floating {
    0% { transform: translate(0, 0px); }
    50% { transform: translate(0, 10px); }
    100% { transform: translate(0, -0px); }
  }

  @media (max-width: 768px) {
    max-width: 400px;
    max-height: 400px;
  }

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const hero = () => {
  const { isHovered } = UseHover();
  return (
    <div id='about'>
      <HeroContainer isHovered={isHovered}>
        <HeroBg>
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer>
            <Title>Hey!👋 I'm <br />{Bio.name}</Title>
            <TextLoop>I am <Span isHovered={isHovered}> <Typewriter options={{strings: isHovered ? Bio.dad : Bio.roles, autoStart: true, loop: true}}></Typewriter></Span></TextLoop>
            <Subtitle>{Bio.description}</Subtitle>
            <ResumeButton href={Bio.resume} target='_blank' isHovered={isHovered}>Check Resume</ResumeButton>
          </HeroLeftContainer>
          <HeroRightContainer>
            <Img src={pfp} alt="pfp pic" isHovered={!isHovered} isHovered2={isHovered}/>
            <Img src={pfp2} alt="pfp2 pic" isHovered={isHovered} isHovered2={isHovered}/>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default hero;