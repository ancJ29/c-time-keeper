import { getAllShifts, Shift } from '@/services/domain'
import useUserStore from '@/stores/user.store'
import { DatesRangeValue, DateValue } from '@/types'
import { cloneDeep, createStore, endOfDay, ONE_DAY, startOfDay } from '@/utils'

type State = {
  currents: Record<string, Shift[]>
  updates: Record<string, Shift[]>
  startDate: DateValue
  endDate: DateValue
  roleId: string | null
  venueId: string | null
  name?: string
}

enum ActionType {
  INIT_DATA = 'INIT_DATA',
  CHANGE_DATE = 'CHANGE_DATE',
  CHANGE_ROLE_ID = 'CHANGE_ROLE_ID',
  CHANGE_VENUE_ID = 'CHANGE_VENUE_ID',
  CHANGE_NAME = 'CHANGE_NAME',
}

type Action = {
  type: ActionType
  shifts?: Shift[]
  startDate?: DateValue
  endDate?: DateValue
  roleId?: string | null
  venueId?: string | null
  name?: string
}

const defaultState = {
  currents: {},
  updates: {},
  startDate: new Date(startOfDay(Date.now())),
  endDate: new Date(endOfDay(Date.now())),
  roleId: null,
  venueId: null,
  name: undefined,
}

const { dispatch, ...store } = createStore<State, Action>(reducer, {
  ...defaultState,
})

export default {
  ...store,
  async initData() {
    const state = store.getSnapshot()
    const shifts = await getAllShifts({
      start: state.startDate?.getTime() || 0,
      end: state.endDate?.getTime() || 0,
    })
    dispatch({ type: ActionType.INIT_DATA, shifts })
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
  changeRoleId(roleId: string | null) {
    dispatch({ type: ActionType.CHANGE_ROLE_ID, roleId })
  },
  changeVenueId(venueId: string | null) {
    dispatch({ type: ActionType.CHANGE_VENUE_ID, venueId })
  },
  changeName(name?: string) {
    dispatch({ type: ActionType.CHANGE_NAME, name })
  },
}

function reducer(action: Action, state: State): State {
  switch (action.type) {
    case ActionType.INIT_DATA:
      if (action.shifts !== undefined) {
        const currents = initShiftsByUserId(action.shifts)
        return {
          ...state,
          currents,
          updates: cloneDeep(currents),
        }
      }
      break
    case ActionType.CHANGE_DATE:
      if (action.shifts !== undefined && action.startDate && action.endDate) {
        const currents = initShiftsByUserId(action.shifts)
        return {
          ...state,
          currents,
          updates: cloneDeep(currents),
          startDate: action.startDate,
          endDate: action.endDate,
          roleId: null,
          venueId: null,
          name: undefined,
        }
      }
      break
    case ActionType.CHANGE_ROLE_ID:
      if (action.roleId !== undefined) {
        const updates = _filterShifts(state.currents, action.roleId, state.venueId, state.name)
        return {
          ...state,
          roleId: action.roleId,
          updates,
        }
      }
      break
    case ActionType.CHANGE_VENUE_ID:
      if (action.venueId !== undefined) {
        const updates = _filterShifts(state.currents, state.roleId, action.venueId, state.name)
        return {
          ...state,
          venueId: action.venueId,
          updates,
        }
      }
      break
    case ActionType.CHANGE_NAME:
      {
        const updates = _filterShifts(state.currents, state.roleId, state.venueId, action.name)
        return {
          ...state,
          name: action.name,
          updates,
        }
      }
      break
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

function _filterShifts(
  shiftsByUserId: Record<string, Shift[]>,
  roleId: string | null,
  venueId: string | null,
  name?: string,
): Record<string, Shift[]> {
  const { users } = useUserStore.getState()
  let updates = shiftsByUserId

  if (roleId !== null) {
    updates = Object.fromEntries(
      Object.entries(updates).filter(([userId]) => users.get(userId)?.roleId === roleId),
    )
  }

  if (venueId !== null) {
    updates = Object.fromEntries(
      Object.entries(updates).map(([userId, shifts]) => [
        userId,
        shifts.filter((shift) => shift.venueId === venueId),
      ]),
    )
  }

  if (name !== undefined) {
    updates = Object.fromEntries(
      Object.entries(updates).filter(([userId]) => users.get(userId)?.name === name),
    )
  }

  return updates
}
