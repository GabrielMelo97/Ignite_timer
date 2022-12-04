/* eslint-disable prettier/prettier */
import { CycleProps } from './reducer'

export enum ActionTypes {
  add_new_cycle = 'add_new_cycle',
  stop_timer = 'stop_timer',
  times_over = 'times_over',
}

export function AddNewCycleAction(newCycle : CycleProps){
  return(
    {
      type: ActionTypes.add_new_cycle,
      payload: {
        newCycle,
      },
    }
  )
}

export function StopTimerAction(){
  return(
    {
      type: ActionTypes.stop_timer,
    }
  )
}

export function TimesOverAction(){
  return(
    {
      type: ActionTypes.times_over,
    }
  )
}