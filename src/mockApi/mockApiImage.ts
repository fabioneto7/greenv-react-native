interface ImageData {
  id: string;
  url: any;
  title: string;
}

const images: ImageData[] = [
  {
    id: '1',
    url: require('../assets/fakeImages/image1.jpg'),
    title: 'Image 1'
  },
  {
    id: '2',
    url: require('../assets/fakeImages/image2.jpg'),
    title: 'Image 2'
  },
  {
    id: '3',
    url: require('../assets/fakeImages/image3.jpg'),
    title: 'Image 3'
  },
  {
    id: '4',
    url: require('../assets/fakeImages/image4.jpg'),
    title: 'Image 4'
  }
]

export const fetchRandomImage = (): Promise<ImageData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * images.length)
    resolve(images[randomIndex])
    }, 1000)
  })
}
