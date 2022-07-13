import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import PageItem from "./PageItem";

const Page = observer(() => {
    const {item} = useContext(Context)
    const [currentPage, setCurrentPage] = useState(item.page)
    const pageCount = Math.ceil(item.totalCount / item.limit)
    const pages = []

    for(let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <div>
            <Pagination className={'col-xxl-12'}>
                {pages.map(page => {
                    return (
                        <PageItem onClick={() => {
                            item.setPage(page)
                            setCurrentPage(page)
                        }} active={currentPage === page} page={page} />
                    )
                })}
            </Pagination>
        </div>
    );
});

export default Page;