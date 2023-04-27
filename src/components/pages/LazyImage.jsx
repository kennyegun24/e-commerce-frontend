import React, { useRef, useEffect, useState } from 'react'

const LazyImage = ({ src }) => {
    const [view, setView] = useState(false)
    let ref = useRef()

    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setView(true)
            }
        })
    }
    useEffect(() => {
        let observer = new IntersectionObserver(callback)

        if (ref?.current) {
            observer.observe(ref.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])

    return view ? (
        <img className='prodImg' src={src} alt="" />
    ) : (
        <img ref={ref} alt="" style={{ background: '#111' }} className='prodImg' />
    )
}

export default LazyImage