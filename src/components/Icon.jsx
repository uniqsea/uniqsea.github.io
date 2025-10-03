import React from 'react'
import GitHubIcon from '../assets/github-mark.svg'
import EmailIcon from '../assets/email.svg'
import LinkedInIcon from '../assets/linkedin.svg'

const icons = {
  github: GitHubIcon,
  email: EmailIcon,
  linkedin: LinkedInIcon,
}

export function Icon({ name, size = 16, ...props }) {
  const IconComponent = icons[name]
  
  if (!IconComponent) {
    return null
  }

  return (
    <img 
      src={IconComponent} 
      alt={name} 
      width={size} 
      height={size}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
      {...props}
    />
  )
}
