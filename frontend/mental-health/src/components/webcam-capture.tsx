"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "./button"
import { Card } from "./card"
import { AlertCircle, Camera } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void
  captureNow: boolean
  resetCapture: () => void
}

export default function WebcamCapture({ onCapture, captureNow, resetCapture }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    async function setupWebcam() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 320 },
            height: { ideal: 240 },
            facingMode: "user",
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
          setStream(mediaStream)
          setError(null)
        }
      } catch (err) {
        console.error("Error accessing webcam:", err)
        setError("Unable to access webcam. Please ensure you have granted camera permissions.")
      }
    }

    setupWebcam()

    return () => {
      // Cleanup: stop all tracks when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (captureNow && !error) {
      captureImage()
      resetCapture()
    }
  }, [captureNow, error, resetCapture])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageData = canvas.toDataURL("image/jpeg")
        onCapture(imageData)
      }
    }
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden bg-gray-900 relative">
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute bottom-3 right-3">
              <Button
                size="sm"
                onClick={captureImage}
                variant="secondary"
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              >
                <Camera className="h-5 w-5" />
                <span className="sr-only">Capture Image</span>
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

