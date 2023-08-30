/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef } from 'react'
// import { v2 as cloudinary } from 'cloudinary'

function UploadWidget () {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dbinuhocd',
        uploadPreset: 'xqfxb9ga',
        sources: ['local', 'url']
      },
      (error, result) => {
        if (error === undefined && result !== undefined && result.event === 'success') {
          // setURL(result.info.secure_url)
          console.log('result.info.secure_url: ', result.info.secure_url)
        }
      }
    )
  }, [])

  return (
    <button type="button" id="uploadImage" onClick={() => { if (widgetRef !== undefined) widgetRef.current.open() }}>
      UPLOAD IMAGE
    </button>
  )
}

export default UploadWidget
