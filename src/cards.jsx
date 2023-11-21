

const Cards = (props) => {
  return (
    <>
      {/* eslint-disable-next-line react/prop-types */}
      {props.cards.map((item, index) => (
        <div key={index} className="card">{item}</div>
      ))}
    </>
  )
}

export default Cards