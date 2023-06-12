import { useEffect, useState } from 'react'

type SizeType = 'small' | 'middle' | 'large' | undefined
const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<SizeType>(undefined)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            let size: SizeType

            if (width < 768) {
                size = 'small'
            } else if (width < 1024) {
                size = 'middle'
            } else {
                size = 'large'
            }

            setScreenSize(size)
        }

        // Add event listener to detect screen size changes
        window.addEventListener('resize', handleResize)

        // Initial screen size detection
        handleResize()

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return screenSize
}

export default useScreenSize
