import { showNotification } from '@/configs/notifications'
import { getAllShifts, Shift, updateShift } from '@/services/domain'
import useUserStore from '@/stores/user.store'
import { DatesRangeValue, DateValue } from '@/types'
import { cloneDeep, createStore, endOfDay, startOfDay } from '@/utils'

type State = {
  currents: Record<string, Shift[]>
  updates: Record<string, Shift[]>
  startDate: DateValue
  endDate: DateValue
  roleId: string | null
  venueId: string | null
  keyword?: string
  updatedShifts: Record<string, Shift>
}

enum ActionType {
  INIT_DATA = 'INIT_DATA',
  CHANGE_DATE = 'CHANGE_DATE',
  CHANGE_ROLE_ID = 'CHANGE_ROLE_ID',
  CHANGE_VENUE_ID = 'CHANGE_VENUE_ID',
  CHANGE_KEYWORD = 'CHANGE_KEYWORD',
  CHANGE_CHECK_IN_TIME = 'CHANGE_CHECK_IN_TIME',
  CHANGE_CHECK_OUT_TIME = 'CHANGE_CHECK_OUT_TIME',
}

type Action = {
  type: ActionType
  shifts?: Shift[]
  startDate?: DateValue
  endDate?: DateValue
  roleId?: string | null
  venueId?: string | null
  keyword?: string
  checkInTime?: string
  checkOutTime?: string
  userId?: string
  shiftId?: string
}

const defaultState = {
  currents: {},
  updates: {},
  startDate: new Date(startOfDay(Date.now())),
  endDate: new Date(endOfDay(Date.now())),
  roleId: null,
  venueId: null,
  keyword: undefined,
  updatedShifts: {},
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
    const [start, end] = value
    if (!start || !end) {
      return
    }
    const startDate = new Date(startOfDay(start.getTime()))
    const endDate = new Date(endOfDay(end.getTime()))
    const shifts = await getAllShifts({
      start: startDate.getTime(),
      end: endDate.getTime(),
    })
    dispatch({ type: ActionType.CHANGE_DATE, startDate, endDate, shifts })
  },
  changeRoleId(roleId: string | null) {
    dispatch({ type: ActionType.CHANGE_ROLE_ID, roleId })
  },
  changeVenueId(venueId: string | null) {
    dispatch({ type: ActionType.CHANGE_VENUE_ID, venueId })
  },
  changeKeyword(keyword?: string) {
    dispatch({ type: ActionType.CHANGE_KEYWORD, keyword })
  },
  changeCheckInTime(userId: string, shiftId: string, checkInTime: string) {
    dispatch({ type: ActionType.CHANGE_CHECK_IN_TIME, userId, shiftId, checkInTime })
  },
  changeCheckOutTime(userId: string, shiftId: string, checkOutTime: string) {
    dispatch({ type: ActionType.CHANGE_CHECK_OUT_TIME, userId, shiftId, checkOutTime })
  },
  save(t: (key: string) => string) {
    const state = store.getSnapshot()
    const promises = Object.values(state.updatedShifts).map((shift) => updateShift(shift))
    Promise.all(promises)
      .then(() => {
        setTimeout(() => {
          showNotification({ t, success: true })
        }, 500)
      })
      .catch((error) => {
        showNotification({ success: false, message: error.message })
      })
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
          keyword: undefined,
        }
      }
      break
    case ActionType.CHANGE_ROLE_ID:
      if (action.roleId !== undefined) {
        const updates = _filterShifts(state.currents, action.roleId, state.venueId, state.keyword)
        return {
          ...state,
          roleId: action.roleId,
          updates,
        }
      }
      break
    case ActionType.CHANGE_VENUE_ID:
      if (action.venueId !== undefined) {
        const updates = _filterShifts(state.currents, state.roleId, action.venueId, state.keyword)
        return {
          ...state,
          venueId: action.venueId,
          updates,
        }
      }
      break
    case ActionType.CHANGE_KEYWORD: {
      const updates = _filterShifts(state.currents, state.roleId, state.venueId, action.keyword)
      return {
        ...state,
        keyword: action.keyword,
        updates,
      }
    }
    case ActionType.CHANGE_CHECK_IN_TIME:
      if (
        action.userId !== undefined &&
        action.shiftId !== undefined &&
        action.checkInTime !== undefined
      ) {
        const updates = {
          ...state.updates,
          [action.userId]: state.updates[action.userId].map((shift) => {
            if (shift.id === action.shiftId) {
              const [hh, mm] = action.checkInTime?.split(':').map(Number) ?? [0, 0]
              const date = new Date(shift.start)
              date.setHours(hh, mm, 0, 0)
              state.updatedShifts[shift.id] = shift
              return { ...shift, start: date.getTime() }
            }
            return shift
          }),
        }
        return { ...state, updates }
      }
      break
    case ActionType.CHANGE_CHECK_OUT_TIME:
      if (
        action.userId !== undefined &&
        action.shiftId !== undefined &&
        action.checkOutTime !== undefined
      ) {
        const updates = {
          ...state.updates,
          [action.userId]: state.updates[action.userId].map((shift) => {
            if (shift.id === action.shiftId) {
              const [hh, mm] = action.checkOutTime?.split(':').map(Number) ?? [0, 0]
              const date = new Date(shift.start)
              date.setHours(hh, mm, 0, 0)
              if (date.getTime() < shift.start) {
                date.setDate(date.getDate() + 1)
              }

              const updatedShift = { ...shift, end: date.getTime() }
              state.updatedShifts[shift.id] = updatedShift

              return updatedShift
            }
            return shift
          }),
        }
        return { ...state, updates }
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
  keyword?: string,
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

  if (keyword !== undefined) {
    updates = Object.fromEntries(
      Object.entries(updates).filter(([userId]) =>
        users.get(userId)?.name.toLowerCase().includes(keyword.toLowerCase()),
      ),
    )
  }

  return updates
}
