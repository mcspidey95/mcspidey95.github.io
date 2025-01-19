import React from 'react';
import { Link as LinkR } from 'react-router-dom';
import { Bio } from '../../data/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpider } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { UseHover } from '../../hoverContext';

export const Nav = styled.div`
    background-color: ${({isHovered, theme}) => isHovered ? theme.black : theme.card_light};
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    transition: background-color 0.3s ease;

    &.hovered {
        background-color: ${({ theme }) => theme.black};
    }

    @media (max-width: 960px) {
        trastion: 0.8s all ease;
    }
`;
export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`;

export const NavLogo = styled.a`
    width: 80%;    
    padding: 0 6px;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none;
  }
    @media (max-width: 640px) {
      padding: 0 0px;
  }
`;
export const Span = styled.div`
    margin-left: 5px;
    padding: 0 4px;
    font-weight: bold;
    font-size: 18px;
`;
export const NavItems = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 32px;
    padding: 0 6px;
    list-style: none;

    @media screen and (max-width: 768px) {
      display: none;
    }
`;

export const NavLink = styled.a`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.1s ease;
    text-decoration: none;

    :hover {
      color: ${({ theme }) => theme.primary};
      transform: translateY(-1px) scale(1.03);
    }

    &.active {
      border-bottom: 2px solid ${({ theme }) => theme.primary};
    }
`;


export const GithubButton = styled.a`
  border: 1.8px solid ${({ isHovered, theme }) => isHovered ? theme.red : theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ isHovered, theme }) => isHovered ? theme.red : theme.primary}};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.2s ease;
    :hover {
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};
      transform: translateY(-1px) scale(1.02);     
    }
    @media screen and (max-width: 768px) { 
    font-size: 14px;
    }
`;

export const ButtonContainer = styled.div`
  width: 80%;  
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;


export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
  }
`

export const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    position: absolute;
    top: 80px;
    right: 0;
    width: 100%;
    padding: 12px 40px 24px 40px;
    background: ${({ theme }) => theme.card_light+99};
    transition: all 0.6s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    border-radius: 0 0 20px 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    z-index: ${({ isOpen }) => (isOpen ? '1000' : '-1000')};

`

export const MobileMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  width: 100%;
  height: 100%;
`

export const MobileMenuLink = styled(LinkR)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const MobileMenuButton = styled.a`
  border: 1.8px solid ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.6s ease-in-out;

  :hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

export  const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const MobileNavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  @media (max-width: 640px) {
    padding: 0 0px;
  }
`;

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { isHovered, setIsHovered } = UseHover();
  const theme = useTheme();

  React.useEffect(() => {
    const logo = document.querySelector("svg");
    if (logo) {
      logo.style.color = isHovered ? theme.red : theme.white;
    }
  }, [isHovered]);


  return (
    <Nav isHovered = {isHovered}>
        <NavContainer>
            <NavLogo>
                <a href={Bio.linkedin} target='_blank' rel='noreferrer' style={{display: "flex", alignItems: "center", color: "white", marginBottom: "20;", cursor: "pointer", textDecoration: "none", fontSize: "20px", transition: "transform 0.1s ease"}} onMouseEnter={(e) => { e.currentTarget.querySelector("svg").style.color = theme.primary; e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; }} onMouseLeave={(e) => {e.currentTarget.querySelector("svg").style.color = theme.white; e.currentTarget.style.transform = "translateY(0) scale(1)"; }}>
                    <FontAwesomeIcon icon={faSpider} style={{transition: "color 0.3s ease"}} /> <Span style={{transition: "color 0.3s ease"}}>mcspidey95</Span>
                </a>
            </NavLogo>
            <MobileIcon>
            </MobileIcon>
            <NavItems>
                <NavLink href='#about'>About</NavLink>
                <NavLink href='#skills'>Skills</NavLink>
                <NavLink href='#projects'>Projects</NavLink>
                <NavLink href='#education'>Education</NavLink>
                <NavLink href='https://dad-thegame.vercel.app/' target='_blank' id='dad' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><img src='https://raw.githubusercontent.com/mcspidey95/mcspidey95.github.io/master/src/components/Projects/previews/dad.png' alt='dad'/></NavLink>
            </NavItems>
            <ButtonContainer>
                <GithubButton href='https://github.com/mcspidey95' target='_blank' isHovered={isHovered}>Github Profile</GithubButton>
            </ButtonContainer>
        </NavContainer>
        {
          open && (
            <MobileMenu open={open}>
              <MobileLink href="#about" onClick={() => {
                setOpen(!open)
                }}>About</MobileLink>
              <MobileLink href='#skills' onClick={() => {
                setOpen(!open)
                }}>Skills</MobileLink>
              <MobileLink href='#projects' onClick={() => {
                setOpen(!open)
               }}>Experience</MobileLink>
             <MobileLink href='#education' onClick={() => {
               setOpen(!open)
               }}>Projects</MobileLink>
              <MobileLink href='#tools' onClick={() => {
                setOpen(!open)
               }}>Education</MobileLink>
              <GithubButton style={{padding: '10px 16px',background: `${theme.primary}`, color: 'white',width: 'max-content'}} href="https://github.com/mcspidey95" target="_blank">Github Profile</GithubButton>
            </MobileMenu>
          )
        }
    </Nav> 
  );
};

export default Navbar;