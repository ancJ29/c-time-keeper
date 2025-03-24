import { formatTime } from '@/utils'
import { TimeInput } from '@mantine/dates'
import { useState } from 'react'
import classes from './TimeSelect.module.scss'

type TimeSelectProps = {
  value?: number | null
  onChangeValue: (value: string) => void
}

export default function TimeSelect({ value, onChangeValue }: TimeSelectProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={classes.container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!hovered ? (
        <div className={classes.textContainer}>{formatTime(value, 'hh:mm A')}</div>
      ) : (
        <div className={classes.timeInputContainer}>
          <TimeInput
            value={formatTime(value, 'HH:mm')}
            size="md"
            classNames={classes}
            onChange={(event) => onChangeValue(event.target.value)}
          />
        </div>
      )}
    </div>
  )
}
