import React from 'react'
import styled from'styled-components'
import ProjectCards from '../Cards/card';
import { projects } from '../../data/constants'

export const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0px 100px 0;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

export const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

export const Description = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

export const ToggleGroup = styled.div`
    display: flex;
    border: 1.5px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    border-radius: 12px;
    font-weight: 500;
    margin: 22px 0px;
      transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px) scale(1.02);
  }
    @media (max-width: 768px) {
        font-size: 12px;
    }
`

export const ToggleButton = styled.div`
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
      transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px) scale(1.01);
    color: white;
  }
    ${({ active, theme }) =>
        active && `
    background: ${theme.primary + 20};
    color: white;
    `
    }
    &:hover {
        background: ${({ theme }) => theme.primary + 8};
    }
    @media (max-width: 768px) {
        padding: 6px 8px;
        border-radius: 4px;
    }
`
export const Divider = styled.div`
    width: 1.5px;
    background: ${({ theme }) => theme.primary};
`


export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
    
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    // grid-gap: 32px;
    // grid-auto-rows: minmax(100px, auto);
    // @media (max-width: 960px) {
    //     grid-template-columns: repeat(2, 1fr);
    // }
    // @media (max-width: 640px) {
    //     grid-template-columns: repeat(1, 1fr);
    // }
`;

const Projects = () => {
    const [toggle, setToggle] = React.useState("all");
  return (
    <Container id="projects">
        <Wrapper>
        <Title>Projects</Title>
        <Description>
        I have worked on a variety of projects, ranging from web applications to AI projects.
        </Description>

        <ToggleGroup >
        {toggle === 'all' ?
            <ToggleButton active value="everything" onClick={() => setToggle('all')}>ALL</ToggleButton>
            :
            <ToggleButton value="everything" onClick={() => setToggle('all')}>ALL</ToggleButton>
          }
          <Divider />
          {toggle === 'web' ?
            <ToggleButton active value="web app" onClick={() => setToggle('web')}>WEB APPS</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('web')}>WEB APPS</ToggleButton>
          }
          <Divider />
          {toggle === 'games' ?
            <ToggleButton active value="android app" onClick={() => setToggle('games')}>GAMES</ToggleButton>
            :
            <ToggleButton value="android app" onClick={() => setToggle('games')}>GAMES</ToggleButton>
          }
          <Divider />
          {toggle === 'ai' ?
            <ToggleButton active value="machine learning" onClick={() => setToggle('ai')}>AI & ML</ToggleButton>
            :
            <ToggleButton value="machine learning" onClick={() => setToggle('ai')}>AI & ML</ToggleButton>
          }
        </ToggleGroup>

        <CardContainer>
          {toggle === 'all' && projects.map((project) => <ProjectCards project={project} />)}
          {projects.filter((item) => item.category.includes(toggle)).map((project) => <ProjectCards project={project} />)}
        </CardContainer>
        </Wrapper>
    </Container>
  )
};

export default Projects