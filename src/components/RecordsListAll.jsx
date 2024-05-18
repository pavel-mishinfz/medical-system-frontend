import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Header from './Header/Header';
import Record from './Record/Record';
import Pagination from './Pagination/Pagination';


const PageSize = 5;

const RecordsListAll = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [recordsList, setRecordsList] = useState([]);
    const [recordsIsLoading, setRecordsIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
 

    const currentRecords = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return recordsList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, recordsList]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://' + window.location.hostname + `:8001/records`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                });
                setRecordsList(response.data);
                setRecordsIsLoading(true);
            } catch (error) {
                console.error('Get Records Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {recordsIsLoading && (
                <>
                    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                    <div className="container">
                        <Head
                            setSidebarIsOpen={setSidebarIsOpen}
                            isAuthenticated
                        />
                        <div className="section">
                            <div className="records-list">
                                <Header title={'Записи на прием'} />
                                {currentRecords.length > 0 && currentRecords.map(record => 
                                    <Record 
                                        key={record.id}
                                        id={record.id}
                                        doctorId={record.id_doctor}
                                        userId={record.id_user}
                                        day={record.date}
                                        time={record.time}
                                        isOnlineFormat={record.is_online}
                                        setRecordsList={(record) => setRecordsList(recordsList.filter(item => item.id !== record.id))}
                                        isAdmin
                                    />
                                )}
                                <div className="pagination">
                                    <Pagination
                                        className="pagination-bar"
                                        currentPage={currentPage}
                                        totalCount={recordsList.length}
                                        pageSize={PageSize}
                                        onPageChange={page => setCurrentPage(page)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
        </>
    );
};

export default RecordsListAll;