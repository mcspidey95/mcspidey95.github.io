import React from 'react';
import { Link as LinkR } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpider } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { useTheme } from 'styled-components';

const Nav = styled.div`
    background-color: ${({ theme }) => theme.card_light};
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1200px;
`;

const NavLogo = styled(LinkR)`
    width: 80px;
    padding: 0 6px;
    display: flex;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    align-items: center;

    @media screen and (max-width: 640px) {
        padding: 0 opx;
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
`;

export const NavItems = styled.ul`
    width: 350%;
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
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    :hover {
      color: ${({ theme }) => theme.primary};
    }

    &.active {
      border-bottom: 2px solid ${({ theme }) => theme.primary};
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

export const GithubButton = styled.a`
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
    @media screen and (max-width: 768px) { 
    font-size: 14px;
    }
`;

const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    position: absolute;
    top: 80px;
    right: 0;
    width: 100%;
    padding: 42px 40px 24px 40px;
    background: ${({ theme }) => theme.card_light+99};
    transition: all 0.3 ease in-out;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    border-radius: 0 0 20 20px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.3);
    opacity: ${({ open }) => open ? '1' : '0'}
    z-index: ${({ open }) => open ? '1' : '-1'}
`;

const MobileLink = styled(LinkR)`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transiion: all 0.2s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
`;

export const Span = styled.div`
    margin-left: 5px;
    padding: 0 4px;
    font-weight: bold;
    font-size: 16px;
`;

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  return (
    <Nav>
        <NavContainer>
            <NavLogo>
                <a href='/' style={{display: "flex", alignItems: "center", color: "white", marginBottom: "20;", cursor: "pointer", textDecoration: "none", fontSize: "20px"}}>
                    <FontAwesomeIcon icon={faSpider} /> <Span>mcspidey95</Span>
                </a>
            </NavLogo>
            <MobileIcon>
              <FontAwesomeIcon icon={faBars} onClick={() => setOpen(!open)} />
            </MobileIcon>
            <NavItems>
                <NavLink href='#about'>About</NavLink>
                <NavLink href='#skills'>Skills</NavLink>
                <NavLink href='#projects'>Projects</NavLink>
                <NavLink href='#education'>Education</NavLink>
                <NavLink href='#tools'>Tools</NavLink>
            </NavItems>
            <ButtonContainer>
                <GithubButton>Github Profile</GithubButton>
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
              <MobileLink href='#experience' onClick={() => {
                setOpen(!open)
               }}>Experience</MobileLink>
             <MobileLink href='#projects' onClick={() => {
               setOpen(!open)
               }}>Projects</MobileLink>
              <MobileLink href='#education' onClick={() => {
                setOpen(!open)
               }}>Education</MobileLink>
              <GithubButton style={{padding: '10px 16px',background: `${theme.primary}`, color: 'white',width: 'max-content'}} href="/" target="_blank">Github Profile</GithubButton>
            </MobileMenu>
          )
        }
    </Nav> 
  );
};

export default Navbar;