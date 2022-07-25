import React, { useEffect, useMemo, useState } from "react";
import { isEmpty } from "../../../Utilities/Functions";
import EmptyData from "./EmptyData";
import Pagination from "./Pagination";

function GridLayout({ data, pageSize = 9, component, emptyMessage }) {
  const Component = component;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    if (!isEmpty(data)) {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return data?.slice(firstPageIndex, lastPageIndex);
    } else {
      return [];
    }
  }, [currentPage, data]);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      {currentTableData?.length ? (
        <>
          {currentTableData.map((item, index) => (
            <React.Fragment key={index}>
              <Component mapData={item} index={index} />
            </React.Fragment>
          ))}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data?.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <EmptyData message={emptyMessage || "No Data Available !"} />
      )}
    </>
  );
}

export default GridLayout;
