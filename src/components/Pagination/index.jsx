import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss"

const Pagination = ({ currentPage, onChangePage }) => {
    return (
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => onChangePage(e.selected + 1)}
                pageRangeDisplayed={8}
                pageCount={3}
                previousLabel="<"
                forcePage={currentPage}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;