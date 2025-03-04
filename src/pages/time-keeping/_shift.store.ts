import { getAllShifts, getAllUsers, Shift, User } from '@/services/domain'
import { DatesRangeValue, DateValue } from '@/types'
import { createStore, endOfDay, ONE_DAY, startOfDay } from '@/utils'

type State = {
  shiftsByUserId: Record<string, Shift[]>
  userById: Record<string, User>
  startDate: DateValue
  endDate: DateValue
}

enum ActionType {
  INIT_DATA = 'INIT_DATA',
  CHANGE_DATE = 'CHANGE_DATE',
}

type Action = {
  type: ActionType
  shifts?: Shift[]
  users?: User[]
  startDate?: DateValue
  endDate?: DateValue
}

const defaultState = {
  shiftsByUserId: {},
  userById: {},
  startDate: new Date(startOfDay(Date.now())),
  endDate: new Date(endOfDay(Date.now())),
}

const { dispatch, ...store } = createStore<State, Action>(reducer, {
  ...defaultState,
})

export default {
  ...store,
  async initData() {
    const state = store.getSnapshot()
    const [users, shifts] = await Promise.all([
      getAllUsers(),
      getAllShifts({
        start: state.startDate?.getTime() || 0,
        end: state.endDate?.getTime() || 0,
      }),
    ])
    dispatch({ type: ActionType.INIT_DATA, users, shifts })
  },
  async changeDate(value: DatesRangeValue) {
    const startDate = value[0]
    const endDate = value[1]
    if (!startDate || !endDate) {
      return
    }
    const shifts = await getAllShifts({
      start: startDate.getTime(),
      end: endDate.getTime() + ONE_DAY,
    })
    dispatch({ type: ActionType.CHANGE_DATE, startDate, endDate, shifts })
  },
}

function reducer(action: Action, state: State): State {
  switch (action.type) {
    case ActionType.INIT_DATA:
      if (action.users !== undefined && action.shifts !== undefined) {
        const userById = Object.fromEntries(action.users.map((user) => [user.id, user]))
        const shiftsByUserId = initShiftsByUserId(action.shifts)
        return {
          ...state,
          userById,
          shiftsByUserId,
        }
      }
      break
    case ActionType.CHANGE_DATE:
      if (action.shifts !== undefined && action.startDate && action.endDate) {
        const shiftsByUserId = initShiftsByUserId(action.shifts)
        return {
          ...state,
          shiftsByUserId,
          startDate: action.startDate,
          endDate: action.endDate,
        }
      }
  }
  return state
}

function initShiftsByUserId(shifts: Shift[]) {
  const shiftsByUserId: Record<string, Shift[]> = {}
  shifts.map((shift) => {
    const shifts = shiftsByUserId[shift.userId] || []
    shiftsByUserId[shift.userId] = [...shifts, shift]
  })

  return shiftsByUserId
}
