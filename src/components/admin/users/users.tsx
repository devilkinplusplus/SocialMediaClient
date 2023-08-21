import {
  Avatar,
  Backdrop,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../../../common/constants/dtos/user";
import { getAllUsers } from "../../../common/services/models/userService";
import { AxiosResponse } from "axios";
import { UsersReponse } from "../../../common/constants/responseParams/usersResponse";
import { stringAvatar } from '../../../common/services/utilities/stringUtilities';
import AddReactionIcon from '@mui/icons-material/AddReaction';

interface Column {
  id: "image" | "name" | "lastname" | "username" | "status";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "image",
    label: "Image",
    minWidth: 100,
  },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "lastname", label: "Lastname", minWidth: 100 },
  {
    id: "username",
    label: "Username",
    minWidth: 80,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 60,
  },

];


function Users() {
  const [rows, setRows] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = () => {
    setOpen(true);
    getAllUsers(page, rowsPerPage)
      .then((res: AxiosResponse<UsersReponse>) => {
        if (res.data.succeeded) {
          setRows(res.data.values);
          setCount(res.data.userCount);
        }
      })
      .finally(() => {
        setOpen(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page,rowsPerPage]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 410 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>
                      {row?.profileImage ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          alt="Profile sa"
                          src={`https://localhost:7134/${
                            row?.profileImage
                          }`}
                        />
                      ) : (
                        <Avatar
                          {...stringAvatar(
                            `${row?.firstName} ${row?.lastName}`
                          )}
                        />
                      )}
                    </TableCell>

                    <TableCell>
                      {row.firstName}
                    </TableCell>

                    <TableCell>
                      {row.lastName}
                    </TableCell>

                    <TableCell>
                      <Chip label={row.userName} />
                    </TableCell>

                    <TableCell>
                      {row.isPrivate === true ? <Chip label="Private" color="error" /> : <Chip label="Public" color="success"/>}
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Users;
