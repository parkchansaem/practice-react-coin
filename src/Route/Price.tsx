import { useQuery } from "react-query";
import { useMatch } from "react-router";
import styled, { keyframes } from "styled-components";
import { priceFetch } from "../api";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;
const comeupAnimation = keyframes`
  0% {
    transform: none;
    opacity: 0;
  }
  1% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
`;
const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: gainsboro;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  opacity: 0;
  animation: ${comeupAnimation} 0.5s linear forwards;
`;
const Text = styled.h3<{ isPositive?: Boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.isPositive ? "lightgreen" : "red")};
`;
interface Chartprops {
  coinId: string;
}
interface Iprice {
  quotes: {
    USD: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      ath_date: string;
      ath_price: number;
    };
  };
}
function Check(value: number | undefined) {
  if (value) {
    return value > 0;
  }
}
function Price({ coinId }: Chartprops) {
  const priceMAtch = useMatch("/:coinId/price");
  const { isLoading, data } = useQuery<Iprice>(["ohicv", coinId], () =>
    priceFetch(coinId)
  );

  return (
    <div>
      {priceMAtch ? (
        <>
          {" "}
          {isLoading ? (
            "loading.."
          ) : (
            <Container>
              <InfoBar>
                Current Prices :
                <Text isPositive={Check(data?.quotes.USD.price) === true}>
                  ${data?.quotes.USD.price.toFixed(2)}
                </Text>
              </InfoBar>
              <InfoBar>
                Change rate (last:1h):{" "}
                <Text
                  isPositive={
                    Check(data?.quotes.USD.percent_change_1h) === true
                  }
                >
                  {data?.quotes.USD.percent_change_1h}%
                </Text>
              </InfoBar>
              <InfoBar>
                Change rate (last:24h):{" "}
                <Text
                  isPositive={
                    Check(data?.quotes.USD.percent_change_24h) === true
                  }
                >
                  {data?.quotes.USD.percent_change_24h}%
                </Text>
              </InfoBar>
              <InfoBar>
                Change rate (last:7d):{" "}
                <Text
                  isPositive={
                    Check(data?.quotes.USD.percent_change_7d) === true
                  }
                >
                  {data?.quotes.USD.percent_change_7d}%
                </Text>
              </InfoBar>
              <InfoBar>
                Change rate (last:30d):{" "}
                <Text
                  isPositive={
                    Check(data?.quotes.USD.percent_change_30d) === true
                  }
                >
                  {data?.quotes.USD.percent_change_30d}%
                </Text>
              </InfoBar>
              <InfoBar>
                Highest Price:{" "}
                <Text isPositive={true}>
                  {data?.quotes.USD.ath_date.slice(0, 10)}
                </Text>
              </InfoBar>
              <InfoBar>
                Highest Date:{" "}
                <Text isPositive={Check(data?.quotes.USD.ath_price) === true}>
                  ${data?.quotes.USD.ath_price.toFixed(2)}
                </Text>
              </InfoBar>
            </Container>
          )}
        </>
      ) : null}
    </div>
  );
}
export default Price;
