import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles, activeCycle } = useContext(CyclesContext)
  document.title = `Timer`

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!cycle.interruptedDate && !cycle.finishedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}

            {cycles.length === 0 && (
              <tr>
                <td className="empty-history" colSpan={4}>
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
