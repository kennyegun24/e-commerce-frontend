import React, { useEffect, useState, useMemo, useCallback } from 'react'


const Success = ({ text, success, color }) => {
    const [opacity, setOpacity] = useState(1)
    const [length, setLength] = useState(1)

    const loopFunction = () => {
        let i = 1
        let j = 1
        const loop = setInterval(() => {
            i -= 0.1
            setOpacity(i)
            if (i <= 0.1) {
                clearInterval(loop)
            }
        }, 400);
        const secLoop = setInterval(() => {
            j -= 0.02
            setLength(j)
            if (i <= 0.1) {
                clearInterval(secLoop)
            }
        }, 80);
    }

    const loopIt = useMemo(() => {
        return () => {
            loopFunction()
        }
    }, [])

    useEffect(() => {
        if (success) {
            loopIt()
        }
    }, [success])

    return (
        success && (
            <div className='successMessage'>
                <span style={{ opacity: opacity }} className='success'>{text}</span>
                <span style={{ background: color, width: `${length * 100}%`, opacity: opacity, height: '5px' }}></span>
            </div>
        )
    )
}

export default Success