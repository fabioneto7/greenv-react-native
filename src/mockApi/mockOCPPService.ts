import fakeChargers from "./chargersMock.json"

interface BootNotificationResponse {
  status: string;
  currentTime: string;
  interval: number;
}

interface Charger {
  name: string,
  id: string,
  address: string,
  latitude: number,
  longitude: number,
  availability: string
}

export const sendBootNotification = (): Promise<BootNotificationResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'Accepted',
        currentTime: new Date().toISOString(),
        interval: 300,
      })
    }, 1000)
  })
}

export const sendStatusNotification = (): Promise<Charger[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeChargers)
    }, 1000)
  })
}

  