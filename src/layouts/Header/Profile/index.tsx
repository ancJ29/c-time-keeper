import { Avatar, UnstyledButton } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/profile')
  }

  return (
    <UnstyledButton visibleFrom="xs" onClick={onClick}>
      <Avatar
        radius="xl"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
        size={28}
      />
    </UnstyledButton>
  )
}
