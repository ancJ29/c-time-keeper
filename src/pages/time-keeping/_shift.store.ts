import { convertShiftToFCEvent, convertUserToFCResource } from '@/configs/calendar'
import { getAllShifts, getAllUsers, Shift, User } from '@/services/domain'
import { createStore } from '@/utils'
import { EventInput } from '@fullcalendar/core'
import { ResourceInput } from '@fullcalendar/resource'

type State = {
  shiftsByUserId: Record<string, Shift[]>
  events: EventInput[]
  resources: ResourceInput[]
  userById: Record<string, User>
  start: number
  end: number
  isSelectedAllUsers: boolean
}

enum ActionType {
  INIT_DATA = 'INIT_DATA',
  CHANGE_DATE = 'CHANGE_DATE',
  SET_SELECTED_USER_IDS = 'SET_SELECTED_USER_IDS',
  SET_IS_SELECTED_ALL_USERS = 'SET_IS_SELECTED_ALL_USERS',
}

type Action = {
  type: ActionType
  shifts?: Shift[]
  users?: User[]
  selectedUserIds?: string[]
  start?: number
  end?: number
  checked?: boolean
}

const defaultState = {
  shiftsByUserId: {},
  events: [],
  resources: [],
  userById: {},
  start: Date.now(),
  end: Date.now(),
  isSelectedAllUsers: true,
}

const { dispatch, ...store } = createStore<State, Action>(reducer, {
  ...defaultState,
})

export default {
  ...store,
  async initData() {
    const users = await getAllUsers()
    dispatch({ type: ActionType.INIT_DATA, users })
  },
  async changeDate(startDate: Date, endDate: Date) {
    const state = store.getSnapshot()
    const [start, end] = adjustDateRange(state.start, state.end, startDate, endDate)
    if (start !== state.start || end !== state.end) {
      const shifts = await getAllShifts({ start, end })
      dispatch({ type: ActionType.CHANGE_DATE, shifts, start, end })
    }
  },
  getEvent(id: string) {
    const state = store.getSnapshot()
    const [userId, shiftId] = id.split('-')
    return state.shiftsByUserId[userId]?.find((shift) => shift.id === shiftId)
  },
}

function reducer(action: Action, state: State): State {
  switch (action.type) {
    case ActionType.INIT_DATA:
      if (action.users !== undefined) {
        const userById = Object.fromEntries(action.users.map((user) => [user.id, user]))
        const resources: ResourceInput[] = action.users.map(convertUserToFCResource)

        return {
          ...state,
          userById,
          resources,
        }
      }
      break
    case ActionType.CHANGE_DATE:
      if (action.shifts !== undefined && action.start && action.end) {
        const shiftsByUserId: Record<string, Shift[]> = {}
        action.shifts.map((shift) => {
          const shifts = shiftsByUserId[shift.userId] || []
          shiftsByUserId[shift.userId] = [...shifts, shift]
        })
        const events = initEvents(Object.keys(shiftsByUserId), shiftsByUserId)

        return {
          ...state,
          shiftsByUserId,
          events,
          start: action.start,
          end: action.end,
        }
      }
      break
  }
  return state
}

function adjustDateRange(
  start: number,
  end: number,
  startDate: Date,
  endDate: Date,
): [adjustedStart: number, adjustedEnd: number] {
  const adjustedStart = start < startDate.getTime() ? start : startDate.getTime()
  const adjustedEnd = end > endDate.getTime() ? end : endDate.getTime()
  return [adjustedStart, adjustedEnd]
}

export function initEvents(
  userIds: string[],
  shiftByUserId: Record<string, Shift[]>,
): EventInput[] {
  let index = 0
  return userIds.flatMap((userId) =>
    (shiftByUserId[userId] || []).map((shift) => convertShiftToFCEvent(shift, index++)),
  )
}
