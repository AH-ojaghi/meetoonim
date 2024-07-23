import { RxDot } from "react-icons/rx";
import { RxDotFilled } from "react-icons/rx";

//

const sliderItems = [
  {
    src: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
  },
  {
    src: "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
  },
  {
    src: "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
  },
];
function Slider() {
  return (
    <>
      <div className="container">
        <div className="slider">
          {sliderItems.map((item) => {
            return (
              <>
                <div className="sliderItem">
                  <img src={item.src} alt="" />
                </div>
              </>
            );
          })}
          <div className="current-slide">
            {/* <button>{icon}</button> */}
            <RxDot />
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
