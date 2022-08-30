import React, { useEffect } from "react";
import {
  useSortBy,
  useTable,
  useRowSelect,
  usePagination,
  useExpanded,
} from "react-table";
import { Icon } from "../../../Utilities/Icons";

export default function Table(props) {
  const Collapse = (row) => props.collapseComponent(row);
  const data = React.useMemo(() => [...props.data], [props.data]);
  const columns = React.useMemo(() => [...props.columns], [props.columns]);

  const RowSubComponent = React.useCallback(({ row }) => {
    return <Collapse row={row} />;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {},
    },
    useSortBy,
    useExpanded,
    props.pagination && usePagination,
    useRowSelect
  );
  useEffect(() => {
    return () => {};
  }, [props.data]);

  return (
    <>
      {page?.length && props.pagination ? (
        <div className="list-sec">
          <div>
            <p>
              Showing <span>{parseInt(page[0].id) + 1}</span> -{" "}
              <span>{parseInt(page[page.length - 1].id) + 1}</span> of{" "}
              <span>{data.length}</span> Results
            </p>
          </div>
          <div className="num-sec">
            <button
              className="btn"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <img src={Icon.LeftCiver} alt="lefticon" />
            </button>

            {pageOptions.length > 4
              ? pageOptions
                  .slice(
                    pageIndex > pageOptions.length - 5
                      ? pageOptions.length - 5
                      : pageIndex,
                    pageIndex + 5 > pageOptions.length
                      ? pageOptions.length
                      : pageIndex + 5
                  )
                  .map((currentPage, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => gotoPage(currentPage)}
                        aria-current="page"
                        className={
                          pageIndex !== currentPage ? "btn" : "btn active"
                        }
                      >
                        {currentPage + 1}
                      </button>
                    );
                  })
              : pageOptions.map((currentPage, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => gotoPage(currentPage)}
                      aria-current="page"
                      className={
                        pageIndex !== currentPage ? "btn" : "btn active"
                      }
                    >
                      {currentPage + 1}
                    </button>
                  );
                })}
            <button
              className="btn"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <img src={Icon.RightCiver} alt="regit" />
            </button>
          </div>
          <div className="item-sec">
            <p>Items per page</p>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {pageSize}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {[5, 10, 15, 20, "All"].map((pageDataSize, index) => (
                  <li key={index}>
                    <button
                      className="btn dropdown-item"
                      onClick={() => {
                        setPageSize(
                          pageDataSize === "All"
                            ? Number(props.data.length)
                            : Number(pageDataSize)
                        );
                      }}
                    >
                      {pageDataSize}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <table {...getTableProps()} className="table consultation_table">
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr
              key={i}
              className="consultation_table_head"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  className="consultation_table_head_text"
                  {...column.getHeaderProps([
                    {
                      className: column.className,
                      style: column.style,
                    },
                    column.getSortByToggleProps(),
                  ])}
                >
                  {column?.sort && (
                    <span>
                      {column?.isSorted ? (
                        column.isSortedDesc ? (
                          <img src={Icon.UpCiver} alt="up" />
                        ) : (
                          <img src={Icon.DownCiver} alt="down" />
                        )
                      ) : (
                        <img src={Icon.UpDown} alt="updown" />
                      )}
                    </span>
                  )}
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="" {...getTableBodyProps()}>
          {(page || rows).map((row, i) => {
            prepareRow(row);

            return (
              <React.Fragment key={i}>
                <tr
                  className={
                    "consultation_table_body_row" + row.isExpanded
                      ? "view open"
                      : "view"
                  }
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        className="consultation_table_body_text"
                        key={index}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded ? <RowSubComponent row={row.values} /> : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {page?.length && props.pagination ? (
        <div className="list-sec">
          <div>
            <p>
              Showing <span>{parseInt(page[0].id) + 1}</span> -{" "}
              <span>{parseInt(page[page.length - 1].id) + 1}</span> of{" "}
              <span>{data.length}</span> Results
            </p>
          </div>
          <div className="num-sec">
            <button
              className="btn"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <img src={Icon.LeftCiver} alt="" />
            </button>

            {pageOptions.length > 4
              ? pageOptions
                  .slice(
                    pageIndex > pageOptions.length - 5
                      ? pageOptions.length - 5
                      : pageIndex,
                    pageIndex + 5 > pageOptions.length
                      ? pageOptions.length
                      : pageIndex + 5
                  )
                  .map((currentPage, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => gotoPage(currentPage)}
                        aria-current="page"
                        className={
                          pageIndex !== currentPage ? "btn" : "btn active"
                        }
                      >
                        {currentPage + 1}
                      </button>
                    );
                  })
              : pageOptions.map((currentPage, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => gotoPage(currentPage)}
                      aria-current="page"
                      className={
                        pageIndex !== currentPage ? "btn" : "btn active"
                      }
                    >
                      {currentPage + 1}
                    </button>
                  );
                })}
            <button
              className="btn"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <img src={Icon.RightCiver} alt="" />
            </button>
          </div>
          <div className="item-sec">
            <p>Items per page</p>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {pageSize}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {[5, 10, 15, 20, "All"].map((pageDataSize, index) => (
                  <li key={index}>
                    <button
                      className="btn dropdown-item"
                      onClick={() => {
                        setPageSize(
                          pageDataSize === "All"
                            ? Number(props.data.length)
                            : Number(pageDataSize)
                        );
                      }}
                    >
                      {pageDataSize}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
