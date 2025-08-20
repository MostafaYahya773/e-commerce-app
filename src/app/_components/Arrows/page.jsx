export function SampleNextArrow({ onClick }) {
  return (
    <i
      className="fa-solid fa-arrow-right md:text-[25px] z-20 text-[20px] lg:text-[30px] absolute right-2 -top-[70px] md:-top-[80px] lg:-top-[95px] cursor-pointer text-[#000000]"
      onClick={onClick}
    ></i>
  );
}

export function SamplePrevArrow({ onClick }) {
  return (
    <i
      className="fa-solid fa-arrow-left md:text-[25px] z-20 text-[20px] lg:text-[30px] absolute right-[70px] -top-[70px] md:-top-[80px] lg:-top-[95px] cursor-pointer text-[#000000]"
      onClick={onClick}
    ></i>
  );
}
