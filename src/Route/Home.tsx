import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCoindata } from "../api";
import Detail from "./Detail";
import { Route, useMatch } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import Price from "./Price";
import Chart from "./Chart";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-size: 40px;
  color: gray;
  position: absolute;
  top: 20px;
`;
const ItemList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  width: 400px;
  height: 650px;
  border-radius: 20px;
  background-color: gray;
`;
const Detailwindow = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 120px;
  width: 600px;
  height: 500px;
  border-radius: 20px;
  background-color: gray;
`;
const Box = styled(motion.div)`
  width: 350px;
  height: 80px;
  border-radius: 10px;
  background-color: gainsboro;
  margin: 20px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;
const Items = styled.div``;
const CoinName = styled.span`
  font-size: 15px;
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
`;

interface ICoin {
  id: number;
  name: string;
  rank: number;
  symbol: string;
}
function Home() {
  const navigate = useNavigate();
  const animationMatch = useMatch("/:coinId/*");
  const { data, isLoading } = useQuery<ICoin[]>("coin", getCoindata);
  console.log(data?.slice(0, 5));
  const onclick = (coinId: string) => {
    navigate(`/${coinId}`);
  };
  const overlayBack = () => {
    navigate(-1);
  };
  return (
    <>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <Wrapper>
          <AnimatePresence>
            <ItemList>
              <Title>Coin</Title>
              <Items>
                {data?.slice(0, 6).map((coin) => (
                  <Box
                    layoutId={coin.id + ""}
                    onClick={() => onclick(coin.id + "")}
                    key={coin.id}
                  >
                    <CoinName>{coin.name}</CoinName>
                  </Box>
                ))}
              </Items>
            </ItemList>
          </AnimatePresence>
          <AnimatePresence>
            {animationMatch ? (
              <>
                <Overlay onClick={overlayBack}></Overlay>
                <Detailwindow layoutId={animationMatch.params.coinId}>
                  <Detail />
                  <Chart
                    coinId={animationMatch.params.coinId + ""}
                    name={animationMatch.pathname}
                  />
                  <Link to="/">Home</Link>
                  <Link to={`${animationMatch.params.coinId}/chart`}>
                    chart
                  </Link>
                </Detailwindow>
              </>
            ) : null}
          </AnimatePresence>
        </Wrapper>
      )}
    </>
  );
}
export default Home;
