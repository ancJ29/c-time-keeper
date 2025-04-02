import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import classes from './Camera.module.scss'

type CameraProps = {
  onCapture: (imageSrc: string | null) => void
}

const COUNTDOWN_TIME = 3
const CAPTURE_DELAY = (COUNTDOWN_TIME + 0.3) * 1000

export default function Camera({ onCapture }: CameraProps) {
  const webcamRef = useRef<Webcam | null>(null)
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME)
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
    }, CAPTURE_DELAY)

    return () => {
      clearInterval(countdownInterval)
      clearTimeout(timer)
    }
  }, [onCapture])

  return (
    <div className={classes.container}>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" mirrored className={classes.webcam} />
      {isCapturing && (
        <div className={classes.loadingContainer}>
          <div className={classes.spinner} />
          <div className={classes.countdown}>{countdown}</div>
        </div>
      )}
    </div>
  )
}
