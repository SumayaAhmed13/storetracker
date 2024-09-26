import { Box, Pagination, Typography } from "@mui/material";
import { useState } from "react";

const CatelogPagination = ({ metaData, onPageChange }) => {
  const { pageSize, currentPage, totalCount, totalPages } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);
  function handlePageChange(page) {
    setPageNumber(page);
    onPageChange(page);
  }
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="body1">
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} results
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={pageNumber}
        onChange={(_e, page) => handlePageChange(page)}
      />
    </Box>
  );
};

export default CatelogPagination;
