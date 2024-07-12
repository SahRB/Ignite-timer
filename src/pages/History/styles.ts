import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
    margin-bottom: 2rem;

  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow-x: auto; /* Add horizontal scrolling for smaller screens */
  margin-top: 2rem;
  overflow-x: auto; /* Adicionado scrolling horizontal para o caso de a tabela ser muito larga */
  margin-top: -1rem; /* Reduzido o espaçamento superior */
  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 300px; /* Adjust min-width for smaller screens */
    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }
    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        width: 40%; /* Adjust width for smaller screens */
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
        
      }
    }
  }
`
const STATUS_COLORS ={
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500'
}as const

interface StatusProps{
    statusColor: 'yellow'| 'red' | 'green'
}

export const Status = styled.span <StatusProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before{
        content: '';
        width: 0.5rem;;
        height: 0.5rem;
        border-radius: 999px;
        background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
    }
    &::after{

    }
`;