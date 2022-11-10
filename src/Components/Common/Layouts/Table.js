import React, { useEffect } from "react";
import { Form, Pagination } from "react-bootstrap";
import {
  useSortBy,
  useTable,
  useRowSelect,
  usePagination,
  useExpanded,
} from "react-table";

export default function Table(props) {
  const Collapse = (row) => props.collapseComponent(row);
  const data = React.useMemo(() => [...props?.data], [props.data]);
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
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useSortBy,
    useExpanded,
    props.pagination && usePagination
  );
  // useEffect(() => {
  //   return () => {};
  // }, [props.data]);

  return (
    <>
      <div className="consultation_card_box mt_20">
        <div className="table-responsive">
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
                      {/* {column?.sort && (
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
                      )} */}
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
                      className={`consultation_table_body_row ${
                        row.isExpanded ? "view open" : "view"
                      }`}
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
                    {row.isExpanded ? (
                      <RowSubComponent row={row.values} />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {page?.length && props.pagination ? (
        <div className="pagination_card">
          <div className="row">
            <div className="col-md-3">
              <h5 className="pagination_result_text">
                Showing {parseInt(page[0].id) + 1} -{" "}
                {parseInt(page[page.length - 1].id) + 1} of {data?.length}{" "}
                Results
              </h5>
            </div>
            <div className="col-md-6">
              <center>
                <Pagination className="pagination_content">
                  <Pagination.Prev
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  />

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
                            <Pagination.Item
                              key={i}
                              onClick={() => gotoPage(currentPage)}
                              active={pageIndex !== currentPage ? false : true}
                            >
                              {currentPage + 1}
                            </Pagination.Item>
                          );
                        })
                    : pageOptions.map((currentPage, i) => {
                        return (
                          <Pagination.Item
                            key={i}
                            onClick={() => gotoPage(currentPage)}
                            active={pageIndex !== currentPage ? false : true}
                          >
                            {currentPage + 1}
                          </Pagination.Item>
                        );
                      })}
                  <Pagination.Next
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  />
                </Pagination>
              </center>
            </div>
            <div className="col-md-3">
              <div className="display_inline float_right item_list_box ">
                <h6 className="page_item_list">Items per page</h6>
                <Form.Group className="mb-3 item_drop_box">
                  <select
                    className="form-select"
                    defaultValue={10}
                    onChange={(e) => {
                      setPageSize(
                        e.target.value === "All"
                          ? Number(props?.data?.length)
                          : Number(e.target.value)
                      );
                    }}
                  >
                    {[5, 10, 15, 20, "All"].map((pageDataSize, index) => (
                      <option key={index} className="btn dropdown-item">
                        {pageDataSize}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
