import { resolve } from 'dns'
import webVitals, { ReportHandler } from 'web-vitals'

const reportWebVitals = async (onPerfEntry?: ReportHandler): Promise<any> => {
  if ((onPerfEntry != null) && onPerfEntry instanceof Function) {
    await webVitals.then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
      return
    })
  }
}

export default reportWebVitals
