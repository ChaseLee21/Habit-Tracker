function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    return num
}

const splitEmoji = (string) => [...new Intl.Segmenter().segment(string)].map(x => x.segment)

export { random, splitEmoji }