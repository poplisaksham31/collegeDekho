import { useEffect, useState } from "react";
import { newsApi } from "./hooks/newApi";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./BlogComponent.module.css";
import ChartComponent from "./ChartComponent";
import Papa from 'papaparse';
import { FilterComponent } from "./FilterComponent";

export const BlogComponent = () => {
  const [startIndex, setStartIndex] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState({});
  const [payloutClicked, setPayoutClicked] = useState({});

  const fetchData = async () => {
    setStartIndex((prev) => prev + 1);
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      const output = await newsApi({ startIndex, setTotalCount });
      setLoading(false);
      setData((prev) => [...prev, ...output]);
    })();
  }, [startIndex]);
    
  useEffect(() => {
    if (Object.values(payoutDetails)?.length) {
      localStorage.setItem('payoutDetails', JSON.stringify(payoutDetails));
    }
  }, [payoutDetails]);
    
    useEffect(() => {
        const savedDetails = localStorage.getItem('payoutDetails');
        if (savedDetails) {
               setPayoutDetails(JSON.parse(savedDetails));
        }
    }, [])

    const exportToCSV = () => {
        const csv = Papa.unparse(data);
    
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.csv';
        link.click();
      };
    
  return (
    <div>
      <div className={styles.Filters}>
        <div className={styles.TotalCount}>Total Count: {totalCount}</div>
        <input placeholder="Search here" className={styles.SearchBar} />
        <div className="d-flex" style={{ alignItems: "center" }}>
            <button className={"btn btn-dark"}
            style={{ height: "fit-content" }} onClick={() => exportToCSV()}>Export as CSV</button>
          <div className={styles.Filters} onClick={() => setShowModal(true)}>
            Filters
          </div>
          <button
            className={"btn btn-primary"}
            style={{ height: "fit-content" }}
            onClick={() => setShowChart(true)}
          >
            Show Chart
          </button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={totalCount > data?.length ? true : false}
        scrollableTarget="scrollableDiv"
        loader={
          loading ? (
            <div
              style={{
                width: "100%",
                alignItems: "center",
                textAlign: "center",
                height: "110px",
                display: "block",
              }}
            >
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : null
        }
      >
        <div className={styles.allCardsContainer}>
          {data?.map((value, index) => {
            return (
              <div className={styles.Card} key={index}>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className={styles.Heading}>{value?.webTitle}</div>
                  {payloutClicked?.[value?.id] ? (
                    <input
                      type="number"
                      onChange={(e) => {
                        setPayoutDetails((prev) => {
                          return { ...prev, [value.id]: e.target.value };
                        });
                      }}
                      value={payoutDetails[value.id]}
                      onBlur={() => {
                        setPayoutClicked((prev) => {
                            return { ...prev, [value.id]: false };
                          });
                      }}
                      placeholder="enter amount"
                    ></input>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setPayoutClicked((prev) => {
                          return { ...prev, [value.id]: true };
                        });
                      }}
                    >
                      {payoutDetails?.[value?.id]? `Rs.${payoutDetails?.[value?.id]} Payout Set`:"Set Payout"}
                    </button>
                  )}
                </div>
                <div>
                  <div>
                    <b>Section Name:</b> {value?.sectionName}
                  </div>
                  <div>
                    <b>Publication Date:</b>{" "}
                    {value?.webPublicationDate?.split("T")?.[0]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
      {showChart && (
        <ChartComponent
          show={showChart}
          setShow={setShowChart}
          articles={data}
        />
      )}
          {showModal && <FilterComponent
              showModal={showModal}
              setShowModal={setShowModal}
              data={data}
          />}
    </div>
  );
};
