const textarea = document.getElementById('textarea')
const btnRecord = document.getElementById('btnRecord')
const btnStop = document.getElementById('btnStop')
const btnDownload = document.getElementById('btnDownload')
const btnDelete = document.getElementById('btnDelete')
const lblRecording = document.getElementById('lblRecording')

class speechApi {
    constructor() {
        const SpeechText = window.SpeechRecognition || window.webkitSpeechRecognition

        this.speechApi = new SpeechText()
        this.output = textarea.output
        this.speechApi.continuous = true
        this.speechApi.lang = 'pt-BR'
        this.speechApi.interimResults = true

        this.speechApi.onresult = e => {
            var resultIndex = e.resultIndex
            var transcript = e.results[resultIndex][0].transcript

            textarea.value = transcript
        }
    }

    start() {
        this.speechApi.start()
    }

    stop() {
        this.speechApi.stop()
    }
}

var speech = new speechApi()

btnRecord.addEventListener('click', () => {
    btnRecord.disabled = true;
    btnStop.disabled = false;

    lblRecording.style.animation = 'animateIcon 1.5s linear infinite'
    lblRecording.style.visibility = 'visible'

    speech.start()
})

btnStop.addEventListener('click', () => {
    btnRecord.disabled = false;
    btnStop.disabled = true;

    lblRecording.style.animation = ''
    lblRecording.style.visibility = 'hidden'
    //lblRecording.innerHTML = ''

    speech.stop()
})

btnDownload.addEventListener('click', () => {
    var text = textarea.value
    var fileName = "speech.txt"

    download(text, fileName)
})

btnDelete.addEventListener('click', () => {
    speech.stop()

    textarea.value = ''
    btnRecord.disabled = false;
    btnStop.disabled = true;
    lblRecording.style.animation = ''
    lblRecording.style.visibility = 'hidden'
})

function download(text, fileName){
    var element = document.createElement('a')

    element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', fileName)
    element.style.display = 'none'

    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}