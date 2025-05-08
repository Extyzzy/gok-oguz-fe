import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  FC,
  SyntheticEvent,
  ChangeEvent,
} from 'react'

import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import { Input } from '@nextui-org/react'
import Image from 'next/image'

function base64ToFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',')
  const mimeMatch = arr[0].match(/:(.*?);/)
  if (!mimeMatch) throw new Error('Invalid base64 data')
  const mime = mimeMatch[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

interface CropImageProps {
  errorMessage?: string
  label?: string
  onChange: (file: File) => void
  initialImage?: string | null
}

export const CropImage: FC<CropImageProps> = ({ label, errorMessage, initialImage, onChange }) => {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const aspect = useMemo(() => 16 / 9, [])
  const [fileName, setFileName] = useState('')

  const onImageLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      if (aspect) {
        const { width, height } = e.currentTarget
        setCrop(centerAspectCrop(width, height, aspect))
      }
    },
    [aspect],
  )

  const onSelectFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }, [])

  useDebounceEffect(
    async () => {
      console.log('completedCrop', completedCrop)
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop)

        const base64 = previewCanvasRef.current.toDataURL('image/jpeg', 0.7)

        const croppedFile = base64ToFile(base64, fileName)
        onChange(croppedFile)
      }
    },
    100,
    [completedCrop],
  )

  return (
    <div className='my-2'>
      <div>
        <Input
          label={label ?? 'Image'}
          type='file'
          accept='image/*'
          className='file-input'
          placeholder='Upload the category icon SVG'
          onChange={onSelectFile}
          errorMessage={errorMessage}
          isInvalid={!!errorMessage}
        />
      </div>
      {initialImage && (
        <div className='my-4'>
          <h1 className='font-bold text-xl'>Initial image</h1>
          <Image
            src={initialImage}
            alt='Initial image'
            width={200}
            height={200}
            className='object-cover rounded-lg '
          />
        </div>
      )}
      {!!imgSrc && (
        <>
          <h1 className='font-bold text-2xl'>Crop the image</h1>

          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            className='max-h-96'
          >
            <img ref={imgRef} alt='Crop me' src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
        </>
      )}
      {!!completedCrop && (
        <>
          <div>
            <h1 className='font-bold text-xl'>Preview of cropped image</h1>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
