import marked from 'marked'

window.addEventListener('message', ({ data }) => {
  if (data.channel === 'markdown-raw') {
    window.postMessage({
      channel: 'markdown',
      data: marked(data.data),
    }, '*')
  }
})
