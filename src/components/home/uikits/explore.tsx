import React, { memo, useCallback, useEffect, useState } from "react";
import UserCard from "./userCard";
import { getSuggestedPeople } from "../../../common/services/models/userService";
import { AxiosResponse } from "axios";
import { SuggestedReponse } from "../../../common/constants/responseParams/suggestedResponse";
import { Suggested } from '../../../common/constants/dtos/suggested';
import ReactPaginate from "react-paginate";
import { Backdrop, CircularProgress } from '@mui/material';
function Explore() {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(4);
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<Suggested[]>([]);
  const [open,setOpen] = useState<boolean>(false);
  const handlePageChange = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected);
  };

  const fetchData = useCallback(() => {
    setOpen(true);
    getSuggestedPeople(page, size)
      .then((res: AxiosResponse<SuggestedReponse>) => {
        if (res.data.succeeded) {
          setCount(res.data.userCount);
          setUsers(res.data.values);
        }
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setOpen(false)
      });
  }, [page, size]);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return (
    <>
      <div className="bg-con-white h-16 py-4 px-6 mb-2">
        <div className="flex space-x-6 justify-between px-10 items-stretch">
          <p className="text-purple-600 text-3xl font-semibold">Explore</p>
          {/* Search bar */}
          <div className="relative text-gray-600">
            <input
              type="search"
              name="search"
              placeholder="Search here.."
              className="bg-white h-10 px-5 pr-10 rounded-full border border-gray-300 text-sm focus:outline-none w-72"
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M23.707,22.293l-5.323-5.323C19.396,15.665,20,13.902,20,12c0-4.411-3.589-8-8-8S4,7.589,4,12s3.589,8,8,8 c1.902,0,3.665-0.604,5.07-1.616l5.323,5.323c0.391,0.391,1.023,0.391,1.414,0l0,0C24.098,23.316,24.098,22.684,23.707,22.293z M12,18 c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S15.309,18,12,18z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap justify-evenly items-center mx-4">
        {users?.map((user, index) => {
          return <UserCard key={index} user={user} users={users}/>;
        })}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageChange}
        containerClassName="flex justify-center space-x-3 border py-2 px-4 text-gray-500"
        pageCount={Math.ceil(count / size)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
       <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default memo(Explore);
