//import fetch from 'isomorphic-fetch'
import { CLOUDNARY_NAME, CLOUDNARY_URL, CLOUDNARY_PRESET } from '@/utils'

export const uploadImage = async (file, tags, folder) => {
  // Fill all necessary fields for Cloudinary
  var fd = new FormData()
  fd.append('upload_preset', CLOUDNARY_PRESET)
  fd.append('folder', folder || '/content/articles') // Optional - place image at specific folder admin in Cloudinary
  fd.append('tags', tags || 'browser_upload') // Optional - add tag for image admin in Cloudinary
  fd.append('file', file)
  var url = `${CLOUDNARY_URL}/${CLOUDNARY_NAME}/upload`
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: fd,
    })
    return await response.json()
  } catch (error) {
    return console.error(error)
  }
}
