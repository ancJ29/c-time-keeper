import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import classes from './Camera.module.scss'

type CameraProps = {
  onCapture: (imageSrc: string | null) => void
}

export default function Camera({ onCapture }: CameraProps) {
  const webcamRef = useRef<Webcam | null>(null)
  const [countdown, setCountdown] = useState(5)
  const [isCapturing, setIsCapturing] = useState(true)

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval)
          setIsCapturing(false)
        }
        return prev - 1
      })
    }, 1000)

    const timer = setTimeout(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot()
        onCapture(imageSrc)
      }
    }, 5500)

    return () => {
      clearInterval(countdownInterval)
      clearTimeout(timer)
    }
  }, [onCapture])

  return (
    <div className={classes.container}>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className={classes.webcam} />
      {isCapturing && (
        <div className={classes.loadingContainer}>
          <div className={classes.loading}>{countdown}</div>
        </div>
      )}
    </div>
  )
}
