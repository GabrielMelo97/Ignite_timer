import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  AddNewCycleAction,
  StopTimerAction,
  TimesOverAction,
} from '../reducers/cycles/actions'
import { CycleProps, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextProps {
  cycles: CycleProps[]
  activeCycle: CycleProps | undefined
  amountSecondsPassed: number
  handleTimesOver: () => void
  handleSetSeconds: (seconds: number) => void
  handleStopTimer: () => void
  createNewCycle: (data: CreateCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextProps)

interface CycleContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function handleSetSeconds(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function handleTimesOver() {
    dispatch(TimesOverAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: CycleProps = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    dispatch(AddNewCycleAction(newCycle))

    handleSetSeconds(0)
  }

  function handleStopTimer() {
    dispatch(StopTimerAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        amountSecondsPassed,
        handleTimesOver,
        handleSetSeconds,
        handleStopTimer,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
