import classNames from "classnames";

const PlayerSquare = ({
  xcoord,
  ycoord,
  getSquareClass,
  status,
  handlePlaceShip,
  placementDirection,
}) => {
  const classes = classNames(
    "playerSquare",
    getSquareClass(status, xcoord, ycoord)
  );
  return (
    <div
      xcoord={xcoord}
      ycoord={ycoord}
      onClick={handlePlaceShip}
      className={classes}
    ></div>
  );
};

export default PlayerSquare;
