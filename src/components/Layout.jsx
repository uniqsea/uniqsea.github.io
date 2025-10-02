import styled from 'styled-components'

export const Page = styled.div`
  position: relative;
  padding-top: 72px; /* space for fixed navbar */
`

export const Max = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  @media (max-width: 640px) { padding: 0 20px; }
`

