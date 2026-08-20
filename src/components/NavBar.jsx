import styled from 'styled-components'
import { site } from '../data.js'
import { Link, NavLink as RouterNavLink } from 'react-router-dom'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  transition: background-color 0.2s ease, border-color 0.2s ease;
`

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 640px) { 
    padding: 8px 16px; 
    gap: 8px;
  }
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
`

const LogoMark = styled.span`
  width: 28px; height: 28px; border-radius: 8px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--accent);
  color: var(--accent-contrast); font-weight: 700; font-size: 12px; letter-spacing: 0.5px;
`

const BrandText = styled.span`
  display: flex; flex-direction: column; line-height: 1.1;
  font-family: var(--heading-font);
  .name { 
    font-size: clamp(16px, 4vw, 20px); 
    font-weight: 700; 
    letter-spacing: -0.02em; 
  }
  /* no subtitle line */
`

const Pills = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 640px) {
    gap: 16px;
  }
`

const NavItem = styled.li`
  position: relative;
  a {
    position: relative;
    display: inline-block;
    padding: 8px 0;
    font-family: var(--heading-font);
    font-size: clamp(12px, 3vw, 14px);
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  a:hover,
  a[aria-current='page'] {
    color: var(--fg);
    text-decoration: none;
  }
  a[aria-current='page']::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    height: 1px;
    background: currentColor;
  }
`

const navItems = [
  { to: '/', label: 'Home' },
  // { to: '/projects', label: 'Projects' },  // 暂时隐藏
  // { to: '/publications', label: 'Publication' },  // 暂时隐藏
  { to: '/design', label: 'Design' },
  { to: '/moments', label: 'Moments' },
]

export function NavBar() {
  return (
    <Nav>
      <NavInner>
        <Brand to="/" aria-label={site.name}>
          <BrandText>
            <span className="name">{site.fullName || site.name}</span>
          </BrandText>
        </Brand>
        <Pills>
          {navItems.map(item => (
            <NavItem key={item.to}>
              <RouterNavLink to={item.to} end>{item.label}</RouterNavLink>
            </NavItem>
          ))}
        </Pills>
      </NavInner>
    </Nav>
  )
}
