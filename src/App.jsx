import React, { useState } from "react";
import { useFetch } from "./utils/useFetch";
import Follower from "./components/Follower";
import Pagination from "./components/Pagination";
const App = () => {
  const { loading, data } = useFetch();
  const paginate = (followers) => {
    const itemsPerPage = 20;
    const pages = Math.ceil(followers.length / itemsPerPage);
    const newFollowers = Array.from({ length: pages }, (_, index) => {
      const start = index * itemsPerPage;
      return followers.slice(start, start + itemsPerPage);
    });
    return newFollowers;
  };
  const [paginationNumber, setPaginationNumber] = useState(0);
  if (loading) {
    return (
      <main className="application">
        <section>
          <div className="container">
            <h1 className="title">loading</h1>
          </div>
        </section>
      </main>
    );
  }
  const newData = paginate(data);
  const changePagination = (number) => {
    setPaginationNumber(number);
  };
  const handlePagination = (action) => {
    if (action === "increase") {
      if (paginationNumber === newData.length - 1) {
        setPaginationNumber(0);
      } else {
        setPaginationNumber((prevState) => {
          return prevState + 1;
        });
      }
    }
    if (action === "decrease") {
      if (paginationNumber === 0) {
        setPaginationNumber(newData.length - 1);
      } else {
        setPaginationNumber((prevState) => {
          return prevState - 1;
        });
      }
    }
  };
  return (
    <main className="application">
      <section>
        <div className="container">
          <h1 className="title">pagination</h1>
          <ul className="followers">
            {newData[paginationNumber].map((item) => {
              return <Follower key={item.id} {...item} />;
            })}
          </ul>
          {newData.length > 1 && (
            <ul className="pagination">
              <li
                className="pagination-controls"
                onClick={() => handlePagination("decrease")}
              >
                prev
              </li>
              {newData.map((_, index) => {
                return (
                  <Pagination
                    key={index}
                    number={index + 1}
                    className={index === paginationNumber && "active"}
                    onClick={changePagination}
                  />
                );
              })}
              <li
                className="pagination-controls"
                onClick={() => handlePagination("increase")}
              >
                next
              </li>
            </ul>
          )}
        </div>
      </section>
    </main>
  );
};
export default App;
