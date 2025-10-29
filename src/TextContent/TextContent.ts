export default function getText(html: string) {
  return html?.replaceAll(/<[^>]+>/g, '')?.replaceAll(/&nbsp;/g, ' ')?.replaceAll(/\s/g, '')
}
