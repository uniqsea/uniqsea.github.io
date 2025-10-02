import styled from 'styled-components'
import { motion } from 'motion/react'
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
  @media (max-width: 640px) { padding: 10px 16px; }
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
  background: linear-gradient(135deg, rgba(239,68,68,0.9), rgba(239,68,68,0.6));
  color: #fff; font-weight: 700; font-size: 12px; letter-spacing: 0.5px;
`

const BrandText = styled.span`
  display: flex; flex-direction: column; line-height: 1.1;
  .name { font-size: 16px; font-weight: 700; letter-spacing: -0.02em; }
  /* no subtitle line */
`

const Pills = styled.ul`
  display: flex; align-items: center; gap: 6px; list-style: none; margin: 0; padding: 2px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
`

const NavItem = styled.li`
  position: relative;
  a {
    position: relative;
    display: inline-block;
    padding: 8px 14px;
    font-size: 13px; font-weight: 600;
    color: var(--muted);
    text-decoration: none;
    border-radius: 999px;
    transition: color 0.2s ease;
  }
  a:hover { color: var(--fg); }
`

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/publications', label: 'Publication' },
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
              <RouterNavLink to={item.to} end>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="activePill"
                        style={{
                          position: 'absolute', inset: 0, borderRadius: 999,
                          background: 'var(--fg)',
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 1, color: isActive ? 'var(--bg)' : 'inherit' }}>
                      {item.label}
                    </span>
                  </>
                )}
              </RouterNavLink>
            </NavItem>
          ))}
        </Pills>
      </NavInner>
    </Nav>
  )
}
