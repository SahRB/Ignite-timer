import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 75rem;
  height: calc(100vh - 10rem);
  margin: 5rem 5rem;
  padding: 2.5rem;
  background: ${(props) => props.theme['gray-800']};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`