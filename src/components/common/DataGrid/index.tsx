import { DataGridProps, GenericObject } from '@/types'
import Laptop from './Laptop'
import Mobile from './Mobile'

function DataGrid<T extends GenericObject>(props: DataGridProps<T>) {
  return (
    <>
      <Laptop {...props} />
      <Mobile {...props} />
    </>
  )
}

export default DataGrid
