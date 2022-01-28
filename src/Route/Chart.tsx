import { useQuery } from "react-query";
import { fetchCoinHistoty } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useMatch, useParams } from "react-router";

const ChartBox = styled.div`
  width: 100%;
  padding: 50px;
  position: relative;
`;
const Title = styled.div`
  font-size: 32px;
  color: black;
  position: absolute;
  top: 0;
  left: 250px;
`;
interface Chartprops {
  coinId: string;
  name?: string;
}
interface IHistorycal {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({ coinId, name }: Chartprops) {
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading, data } = useQuery<IHistorycal[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistoty(coinId),
    { refetchInterval: 100000 }
  );
  return (
    <>
      {chartMatch ? (
        <ChartBox>
          {isLoading ? (
            "loading..."
          ) : (
            <>
              {" "}
              <Title>{name?.slice(1)}</Title>
              <ApexChart
                type="candlestick"
                series={[
                  {
                    name: "candle",
                    data: data?.map((price) => ({
                      x: price.time_close.slice(8, 10),
                      y: [
                        price.open.toFixed(2),
                        price.high.toFixed(2),
                        price.low.toFixed(2),
                        price.close.toFixed(2),
                      ],
                    })),
                  },
                ]}
                options={{
                  yaxis: { show: false },
                  xaxis: {
                    type: "category",
                    categories: data?.map((price) => price.time_close),
                  },
                  chart: {
                    width: "100%",
                    type: "candlestick",
                    height: 350,
                    toolbar: { show: false },
                    background: "transparent",
                  },
                }}
              />
            </>
          )}
        </ChartBox>
      ) : null}
    </>
  );
}
export default Chart;
