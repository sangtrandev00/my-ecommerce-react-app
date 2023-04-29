
import PropTypes from 'prop-types';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function PaginationControlled(props) {
  const {page: currentPage, limit, total} = props.paginationData;
  const [page, setPage] = React.useState(currentPage);
  const handleChange = (event, value) => {
    setPage(value);

    event.preventDefault();
    props.onPaginate(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={Math.ceil(total/limit)} page={page} onChange={handleChange} />
    </Stack>
  );
}