const splitEmoji = (string) => [...new Intl.Segmenter().segment(string)].map(x => x.segment)

export { splitEmoji }