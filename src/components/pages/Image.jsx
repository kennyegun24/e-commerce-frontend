import React, { useEffect, useRef, useState } from 'react'

const Imag = ({ imageUrl, setColor }) => {
    const canvaRef = useRef(null)
    const [bgColor, setBgColor] = useState('#fff')

    useEffect(() => {

        const canvas = canvaRef.current
        const image = new Image()

        image.onload = () => {
            canvas.width = image.width
            canvas.height = image.height

            const context = canvas.getContext('2d')
            context.drawImage(image, 0, 0)

            const imageData = context.getImageData(0, 0, 1, 1).data
            const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`
            // console.log(color)
            setBgColor(color)
            setColor(color)
        }
        image.src = imageUrl
    }, [imageUrl])
    return (
        <div style={{ width: '100%', height: '50vh' }}>
            <canvas ref={canvaRef} style={{ opacity: 0, width: 0 }}></canvas>
            <img src={imageUrl} style={{ width: '100%' }} alt="" />
        </div>
    )
}

export default Imag