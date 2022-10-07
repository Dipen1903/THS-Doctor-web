import React, { useEffect, useMemo, useState } from "react";
import { isEmpty } from "../../../Utilities/Functions";
import EmptyData from "./EmptyData";
import Pagination from "./Pagination";

function GridLayout({
  data,
  page = {
    total: 0,
    pageSize: 0,
    onPageChange: () => {},
  },
  component,
  emptyMessage,
}) {
  const Component = component;
  const [pageProps, setPageProps] = useState(page);
  const [currentPage, setCurrentPage] = useState(data?.meta?.current_page || 1);

  const currentTableData = useMemo(() => {
    if (!isEmpty(data)) {
      const firstPageIndex = (currentPage - 1) * (page?.pageSize || 10);
      const lastPageIndex = firstPageIndex + (page?.pageSize || 10);
      return data?.slice(firstPageIndex, lastPageIndex);
    } else {
      return [];
    }
  }, [currentPage, data]);
  useEffect(() => {
    setPageProps((state) => ({ ...state, ...page }));
  }, [page]);

  return (
    <>
      {data?.length ? (
        <>
          <div className="list-container">
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <Component data={item} index={index} />
              </React.Fragment>
            ))}
          </div>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={pageProps?.total || data?.length}
            pageSize={pageProps?.pageSize || 10}
            onPageChange={(e) => {
              setCurrentPage(e);
              pageProps?.onPageChange(e);
            }}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default GridLayout;
