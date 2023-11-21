import { useEffect, useRef, useState } from 'react';
import Cards from './cards'
import './slider.css'

const Slider = () => {
  const slider = useRef(null)
  const [currentSlidePosition, setCurrentSlidePosition] = useState(0)

  const nextDisabled = slider.current ? (currentSlidePosition >= slider.current.scrollWidth - slider.current.clientWidth) : false;
  const prevDisabled = currentSlidePosition <= 0;

  const slide = (direction) => {
    const moveAmount = slider.current.clientWidth * 0.8;

    if (direction === "next" && currentSlidePosition < slider.current.scrollWidth - slider.current.clientWidth) {
      setCurrentSlidePosition(currentSlidePosition => currentSlidePosition + moveAmount)
    } else if (direction === "prev" && currentSlidePosition > 0) {
      setCurrentSlidePosition(currentSlidePosition => currentSlidePosition - moveAmount)
    }
  }

  useEffect(() => {
    const currentSlider = slider.current

    const restore = () => {
      setCurrentSlidePosition(currentSlider.scrollLeft)
    }

    window.addEventListener('resize', restore);

    return () => {
      window.removeEventListener('resize', restore);
    }
  }, [])

  useEffect(() => {
    slider.current.scrollTo({ left: currentSlidePosition, behavior: "smooth" })
  }, [currentSlidePosition])

  return (
    <div className="slider-wrapper">
      <div className="slider" ref={slider}>
        <Cards cards={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      </div>

      <button className="prev" onClick={() => slide('prev')} disabled={prevDisabled}>
        prev
      </button>
      <button className="next" onClick={() => slide('next')} disabled={nextDisabled}>
        next
      </button>
    </div>
  )
}

export default Slider