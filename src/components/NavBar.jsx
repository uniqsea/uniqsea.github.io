import styled from 'styled-components'
import { site } from '../data.js'
import { Link, NavLink as RouterNavLink } from 'react-router-dom'
import { Languages, Moon, Sun } from 'lucide-react'
import { useSitePreferences } from '../context/SitePreferences.jsx'
import { sitePreferencesEnabled } from '../config/features.js'

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
  padding: 12px 32px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 640px) { 
    padding: 8px 20px;
    gap: 12px;
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
  @media (max-width: 720px) {
    display: ${sitePreferencesEnabled ? 'none' : 'flex'};
  }
`

const Pills = styled.ul`
  display: flex;
  align-items: center;
  gap: clamp(12px, 2.2vw, 24px);
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 420px) { gap: 10px; }
`

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 22px);
  min-width: 0;
`

const PreferenceGroup = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 2px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
`

const PreferenceButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-family: var(--heading-font);
  font-size: 0.7rem;
  font-weight: 700;
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: var(--fg);
    background: var(--surface-hover);
  }

  &:active { transform: scale(0.94); }

  .language-label { margin-left: 2px; }

  @media (max-width: 420px) {
    width: 29px;
    height: 29px;
    .language-icon { display: none; }
    .language-label { margin-left: 0; }
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
  { to: '/', labelKey: 'nav.home' },
  // { to: '/projects', label: 'Projects' },  // 暂时隐藏
  // { to: '/publications', label: 'Publication' },  // 暂时隐藏
  { to: '/design', labelKey: 'nav.design' },
  { to: '/moments', labelKey: 'nav.moments' },
]

export function NavBar() {
  const { language, theme, t, toggleLanguage, toggleTheme } = useSitePreferences()

  return (
    <Nav aria-label="Primary navigation">
      <NavInner>
        <Brand to="/" aria-label={site.name}>
          <BrandText>
            <span className="name">{site.fullName || site.name}</span>
          </BrandText>
        </Brand>
        <RightSide>
          <Pills>
            {navItems.map(item => (
              <NavItem key={item.to}>
                <RouterNavLink to={item.to} end>{t(item.labelKey)}</RouterNavLink>
              </NavItem>
            ))}
          </Pills>
          {sitePreferencesEnabled && (
            <PreferenceGroup aria-label="Site preferences">
              <PreferenceButton
                type="button"
                onClick={toggleLanguage}
                aria-label={language === 'en' ? t('controls.switchToChinese') : t('controls.switchToEnglish')}
                title={language === 'en' ? t('controls.switchToChinese') : t('controls.switchToEnglish')}
              >
                <Languages className="language-icon" size={14} aria-hidden="true" />
                <span className="language-label">{language === 'en' ? 'EN' : '中'}</span>
              </PreferenceButton>
              <PreferenceButton
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? t('controls.switchToLight') : t('controls.switchToDark')}
                title={theme === 'dark' ? t('controls.switchToLight') : t('controls.switchToDark')}
              >
                {theme === 'dark' ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
              </PreferenceButton>
            </PreferenceGroup>
          )}
        </RightSide>
      </NavInner>
    </Nav>
  )
}
