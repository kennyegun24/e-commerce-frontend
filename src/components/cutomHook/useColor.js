import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"

const useColor = () => {
    const [getColor, setGetColor] = useState('#fff')

    const setColor = (e) => {
        setGetColor(e)
    }

    return {
        setColor,
        getColor
    }
}

export default useColor