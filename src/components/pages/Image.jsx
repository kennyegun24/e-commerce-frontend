import React, { useEffect, useRef, useState } from 'react'

const Imag = ({ imageUrl, setColor, className }) => {
    const canvaRef = useRef(null)
    const [bgColor, setBgColor] = useState('#fff')

    useEffect(() => {

        const canvas = canvaRef.current
        const image = new Image()
        image.crossOrigin = 'anonymous'

        image.onload = () => {
            canvas.width = image.width
            canvas.height = image.height
            const context = canvas.getContext('2d')
            context.drawImage(image, 0, 0)

            const imageData = context.getImageData(0, 0, 1, 1).data
            const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`
            setBgColor(color)
            setColor(color)
        }
        image.src = imageUrl
    }, [imageUrl])
    return (
        <div className={className}>
            <canvas ref={canvaRef} style={{ opacity: 0, width: 0 }}></canvas>
            <img src={imageUrl} alt="" />
        </div>
    )
}

export default Imag