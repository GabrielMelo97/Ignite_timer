import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="">Vou trabalhar em</label>
      <TaskInput
        type="text"
        list="taskSuggestions"
        placeholder="Dê um nome para seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
      />

      <datalist id="taskSuggestions">
        <option value="Aula - " />
        <option value="Projeto - " />
      </datalist>

      <label htmlFor="">durante</label>
      <MinutesAmountInput
        type="number"
        step={5}
        min={5}
        max={60}
        placeholder="00"
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
