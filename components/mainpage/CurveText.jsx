const CurveText = () => {
    return (
      <svg
        viewBox="0 0 1200 600"
        className="w-[800px] h-[400px] overflow-visible "
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="curve" d="M 100 500 A 500 500 0 0 1 1100 500" />
        </defs>
        <text className="fill-black  text-[80px] outlined-text pointer-events-none select-none">
          <textPath
            href="#curve"
            startOffset="50%"
            textAnchor="middle"
            className=" "
          >
            Injecting vibes into a boring transfer
          </textPath>
        </text>
      </svg>
    )
  }

  export default CurveText