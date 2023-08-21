import { Alert, Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  achieveRank,
  getUserRanks,
} from "../../../common/services/models/userService";
import { AxiosResponse } from "axios";
import { RankResponse } from "../../../common/constants/responseParams/rankResponse";
import Rank from "./rank";

function MyRanks({ userId }) {
  const [ranks, setRanks] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const fetchData = () => {
    setOpen(true);
    getUserRanks(userId)
      .then((res: AxiosResponse<RankResponse>) => {
        if (res.data.succeeded) {
          setRanks(res.data.value.names);
        } else {
          setErrorMessage(res.data.errors[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  const handleRanks = async () => {
    setOpen(true);
    await achieveRank(userId)
      .then((res: AxiosResponse<RankResponse>) => {
        if (res.data.succeeded) {
          setErrorMessage(null);
          setRanks((prevRanks) => {
            // Convert the existing ranks array to a Set
            const existingRanksSet = new Set(prevRanks);
          
            // Iterate over the new data array and add non-duplicate values to the Set
            res.data.value.names.forEach((newRank) => {
              existingRanksSet.add(newRank);
            });
          
            // Convert the Set back to an array and update the state
            return Array.from(existingRanksSet);
          });
        } else {
          setErrorMessage(res.data.errors[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <div className="flex flex-col space-y-3 justify-between items-center">
      {errorMessage ? (
        <Alert severity="info" className="w-full" variant="outlined">
          {errorMessage} -
          <strong>
            <Link to="/ranks"> Check out how to get ranks </Link>
          </strong>
        </Alert>
      ) : (
        <div className="flex justify-start space-x-2 items-start">
          {ranks?.map((value, index) => {
            return (
              <Rank rank={value} key={index}/>
            );
          })}
        </div>
      )}

      <button
        onClick={() => handleRanks()}
        type="button"
        className="px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-500 duration-300"
      >
        Update Ranks Status
      </button>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default MyRanks;
