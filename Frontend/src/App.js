import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

export default function App() {
  const [stocks, setStocks] = useState([]);
  const columns = [
    {
      name: "SNo.",
      cell: (row, index) => {
        return index + 1;
      },
      width: "80px",
    },
    {
      name: "Symbol",
      selector: (row) => row.symbol,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Price Change Percent",
      selector: (row) => `${row.priceChangePercent} %`,
    },
  ];

  const tableStyle = {
    headRow: {
      style: {
        fontSize: "20px",
        minHeight: "30px",
        borderBottomWidth: "1px",
        borderBottomColor: "black",
        borderBottomStyle: "solid",
      },
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8080/api/stocks")
        .then((res) => {
          console.log(res.data);
          setStocks(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="container" style={{ overflow: "auto" }}>
        <div className="row justify-content-center">
          <div className="col-11">
            <div class="card-header text-center">
              <h5>All Stock</h5>
            </div>
            <DataTable
              columns={columns}
              data={stocks}
              customStyles={tableStyle}
              pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
}
