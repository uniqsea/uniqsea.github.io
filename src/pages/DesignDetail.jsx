import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { NavBar } from '../components/NavBar.jsx'
import { Page, Max } from '../components/Layout.jsx'
import { designs } from '../data/designs.js'

const Section = styled.section`
  padding: clamp(40px, 6vw, 72px) 0 96px;
`

const Header = styled.header`
  max-width: 920px;
  margin: 0 auto clamp(28px, 4vw, 44px);
`

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    color: var(--fg);
    text-decoration: none;
  }
`

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.035em;
`

const Meta = styled.span`
  color: var(--muted);
  font-size: 1rem;
`

const Poster = styled.figure`
  width: min(100%, 920px);
  margin: 0 auto;
  background: #fff;

  img {
    width: 100%;
    height: auto;
  }
`

const NotFound = styled.div`
  padding: 72px 0;

  h1 { margin-bottom: 16px; }
  a { color: var(--muted); }
`

export default function DesignDetail() {
  const { designId } = useParams()
  const design = designs.find(item => item.id === designId)

  if (!design) {
    return (
      <Page>
        <NavBar />
        <Max>
          <NotFound>
            <h1>Design Not Found</h1>
            <Link to="/design">← Back to Design</Link>
          </NotFound>
        </Max>
      </Page>
    )
  }

  return (
    <Page>
      <NavBar />
      <Section>
        <Max>
          <Header>
            <BackLink to="/design">← Design</BackLink>
            <TitleRow>
              <Title>{design.title}</Title>
              <Meta>{design.subtitle}</Meta>
            </TitleRow>
          </Header>
          <Poster>
            <img src={design.full} alt={design.title} />
          </Poster>
        </Max>
      </Section>
    </Page>
  )
}
