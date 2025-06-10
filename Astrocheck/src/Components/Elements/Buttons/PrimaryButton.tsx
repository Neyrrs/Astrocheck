const PrimaryButton = ({
  width = "px-4",
  height = "py-2",
  fontSize = "xs",
  text = "Button",
  onClick = () => {},
  ...rest
}) => {
  return (
    <button
      className={`border-2 bg-[hsl(225,75%,65%)] hover:bg-[hsl(225,51%,54%)] font-normal text-${fontSize} text-white ${width} ${height} ease-in duration-200 rounded-md border-transparent`}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
