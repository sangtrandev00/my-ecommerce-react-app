import { Breadcrumbs } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Breadcrumb() {
  return (
    <Breadcrumbs aria-label="breadcrumb" className="py-2">
        <Link underline="hover" color="inherit" href="/">
            Home
            </Link>
  <Link
    underline="hover"
    color="inherit"
    to=""
  >
    Shop
    </Link>
    {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
</Breadcrumbs>
  )
}
