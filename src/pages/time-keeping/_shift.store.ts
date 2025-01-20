import { EventProps } from '@/configs/calendar'
import { getAllShifts, getAllUsers, Shift, User } from '@/services/domain'
import { createStore } from '@/utils'

type State = {
  eventsByUserId: Record<string, EventProps[]>
  events: EventProps[]
  selectedUserIds: string[]
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
  eventsByUserId: {},
  events: [],
  selectedUserIds: [],
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
  setSelectedUserIds(selectedUserIds: string[]) {
    dispatch({ type: ActionType.SET_SELECTED_USER_IDS, selectedUserIds })
  },
  setIsSelectedAllUsers(checked: boolean) {
    dispatch({ type: ActionType.SET_IS_SELECTED_ALL_USERS, checked })
  },
  getEvent(id: string) {
    const state = store.getSnapshot()
    return state.events.find((event) => event.id === id)
  },
}

function reducer(action: Action, state: State): State {
  switch (action.type) {
    case ActionType.INIT_DATA:
      if (action.users !== undefined) {
        const userById = Object.fromEntries(action.users.map((user) => [user.id, user]))
        return {
          ...state,
          userById,
          selectedUserIds: Object.keys(userById),
        }
      }
      break
    case ActionType.CHANGE_DATE:
      if (action.shifts !== undefined && action.start && action.end) {
        const eventsByUserId: Record<string, EventProps[]> = {}
        action.shifts.map((shift) => {
          const events = eventsByUserId[shift.userId] || []
          eventsByUserId[shift.userId] = [
            ...events,
            {
              id: shift.id,
              userName: state.userById[shift.userId]?.name || '',
              venueId: shift.venueId,
              start: new Date(shift.start),
              end: new Date(shift.end),
              allDay: false,
            },
          ]
        })
        const events = initEvents(state.selectedUserIds, eventsByUserId)
        return {
          ...state,
          eventsByUserId,
          events,
          start: action.start,
          end: action.end,
        }
      }
      break
    case ActionType.SET_SELECTED_USER_IDS:
      if (action.selectedUserIds !== undefined) {
        const events = initEvents(action.selectedUserIds, state.eventsByUserId)
        return {
          ...state,
          events,
          selectedUserIds: action.selectedUserIds,
          isSelectedAllUsers: action.selectedUserIds.length === Object.keys(state.userById).length,
        }
      }
      break
    case ActionType.SET_IS_SELECTED_ALL_USERS:
      if (action.checked !== undefined) {
        const selectedUserIds = action.checked ? Object.keys(state.userById) : []
        const events = action.checked ? initEvents(selectedUserIds, state.eventsByUserId) : []
        return {
          ...state,
          events,
          selectedUserIds,
          isSelectedAllUsers: action.checked,
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

function initEvents(selectedUserIds: string[], eventsByUserId: Record<string, EventProps[]>) {
  const events: EventProps[] = []
  selectedUserIds.map((userId) => {
    events.push(...(eventsByUserId[userId] || []))
  })
  return events
}
