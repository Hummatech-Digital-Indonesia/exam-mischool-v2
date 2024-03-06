export function getRandomImage () : string {
  const images : string[] = [
    '/img/illustrations/exam/background-1.jpg',
    '/img/illustrations/exam/background-2.jpg',
    '/img/illustrations/exam/background-3.jpg',
    '/img/illustrations/exam/background-4.jpg',
    '/img/illustrations/exam/background-5.jpg',
    '/img/illustrations/exam/background-7.jpg',
  ]

  const randomIndex : number = Math.floor(Math.random() * images.length)

  return images[randomIndex]
}
