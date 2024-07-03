function random(min, max) {
    return Math.random() * (max - min) + min
}

const splitEmoji = (string) => [...new Intl.Segmenter().segment(string)].map(x => x.segment)

export { random, splitEmoji }