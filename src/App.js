import './App.css';
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from './utils/themes';
import Navbar from './components/navbar';
import Hero from './components/HeroSection';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { BrowserRouter as Router } from 'react-router-dom';
import { UseHover } from './hoverContext';

const Body = styled.div`
    background: ${({ isHovered, theme }) =>
    isHovered
      ? theme.black
      : theme.bg};
width: 100%;
height: 100%;
overflow-x: hidden;
transition: all 0.3s ease;
`;

const Wrapper = styled.div`
    background: ${({ isHovered, theme }) =>
    isHovered
      ? `linear-gradient(38.73deg, #07475a 0%, ${theme.black} 50%), linear-gradient(141.27deg, #07235a 50%, #07235a 100%)`
      : `linear-gradient(38.73deg, #07475a 0%, ${theme.bg} 50%), linear-gradient(141.27deg, #07235a 50%, #07235a 100%)`};
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
  transition: all 0.3s ease;
`;

function App() {
  const { isHovered } = UseHover();
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
      <Navbar />
      <Body isHovered={isHovered}>
        <Hero />
        <Wrapper isHovered={isHovered}>
          <Skills />
        </Wrapper>
        <Projects />
        <Wrapper>
          <Education />
        </Wrapper>
        <Contact />
      </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;