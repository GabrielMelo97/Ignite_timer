import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountdownContainer, Separator } from './styles'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function CountDown() {
  const {
    activeCycle,
    handleTimesOver,
    amountSecondsPassed,
    handleSetSeconds,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsPassed >= totalSeconds) {
          handleTimesOver()

          clearInterval(interval)
          handleSetSeconds(totalSeconds)
        } else {
          handleSetSeconds(secondsPassed)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, handleTimesOver, handleSetSeconds])

  // useEffect(() => {
  if (activeCycle) {
    document.title = `Timer - ${minutes}:${seconds}`
  } else {
    document.title = `Timer`
  }
  // }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
