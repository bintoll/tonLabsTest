import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { nasaBaseUrl, NasaUrls } from '@constants/urls'

type GetCuriosityPhotoReponse = {
  id: number
  sol: number
  camera: {
    id: number
    name: string
    full_name: string
  }
  img_src: string
  earth_date: string
}

export class NasaApi {
  private static instance: NasaApi
  private axiosInstance: AxiosInstance = axios.create({
    baseURL: nasaBaseUrl,
    timeout: 10000,
  })
  public static get sharedInstance(): NasaApi {
    if (!NasaApi.instance) {
      NasaApi.instance = new NasaApi()
    }
    return NasaApi.instance
  }

  public requestCuriosityPhotos() {
    return this.axiosInstance.get<undefined, AxiosResponse<{ photos: GetCuriosityPhotoReponse[] }>>(
      NasaUrls.getCuriosityPhotos,
    )
  }
}
