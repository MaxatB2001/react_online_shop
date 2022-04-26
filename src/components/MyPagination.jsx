import React, {useContext} from 'react';
import {Pagination} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const MyPagination = observer(() => {
    const { product } = useContext(Context)
    const pageCount = Math.ceil(product.totalCount / product.limit)
    const pages = []

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
        console.log('r')
    }

    return (
        <Pagination>
            {pages.map(p =>
                <Pagination.Item
                    key={p}
                    active={p === product.page}
                    onClick={() => product.setPage(p)}
                >
                    {p}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default MyPagination;