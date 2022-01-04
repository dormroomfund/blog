const ProgressBar = (props='0%') => {

  const style = {
    position: "fixed",
    background: "#391463",
    width: props.scroll,
    height: "4px",
    zIndex: 3,
  };

  return <div className="progress-bar" style={style}></div>;
};

export default ProgressBar;
