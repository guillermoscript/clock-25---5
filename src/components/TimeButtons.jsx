export default function TimeButtons({lengthId, lengthText, numberLenght, onClick, disabled}) {
    return (
        <div>
            <p id={lengthId + '-label'}>{lengthText}</p>
            <button disabled={disabled} onClick={onClick} id={lengthId + "-decrement"}>-</button>
            <span className="number-length" id={lengthId + "-length"}>{numberLenght}</span>
            <button disabled={disabled} onClick={onClick} id={lengthId + "-increment"}>+</button>
        </div>
    )
}