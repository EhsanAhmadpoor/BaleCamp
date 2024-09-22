
import useWindowSize from "../../hooks/useWindowSize";
import Board from "./Board";
import BoardMobile from "./BoardMobile";

const BoardPage = () => {
  const { width } = useWindowSize()

  return width > 768 ? < Board /> : <BoardMobile />;
}

export default BoardPage;