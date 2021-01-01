import React, { useState, useRef } from 'react'
import { Icon } from 'semantic-ui-react'

const MusicPlayer = (props) => {

    const { audio, pagePosition } = props
    audio.volume = 0.2

    const [duration, setDuration] = useState(0)
    const [buttonSym, setButtonSym] = useState("play")

    const refHandle = useRef()
    const refSlider = useRef()
    const refDuration = useRef()

    const togglePlay = (e) => {
        if (buttonSym === "play") {
            audio.play()
            setButtonSym("pause")
        } else {
            audio.pause()
            setButtonSym("play")
        }
    }

    const positionHandle = (position, testing) => {
        const slider = refSlider.current
        const handle = refHandle.current
        const timelineWidth = slider.offsetWidth - handle.offsetWidth
        const handleLeft = position - slider.offsetLeft

        if (handleLeft >= 0 && handleLeft <= timelineWidth) {
          handle.style.marginLeft = handleLeft + "px"
        }
        if (handleLeft < 0) {
          handle.style.marginLeft = "0px"
        }
        if (handleLeft > timelineWidth) {
          handle.style.marginLeft = timelineWidth + "px"
        }
    }

    audio.addEventListener('loadedmetadata', (e) => {
        setDuration(Math.round(e.target.duration))
    })

    audio.addEventListener("timeupdate", (e) => {
        const slider = refSlider.current
        const durationSpan = refDuration.current

        let time = (Math.round(audio.currentTime)).toString()
        if (time.length === 1) { time = "0" + time }
        durationSpan.textContent = `0:${time} / 0:${duration}`
        console.log(Math.round(audio.currentTime))

        const ratio = audio.currentTime / audio.duration
        const position = (slider.offsetWidth * ratio) + slider.offsetLeft
        positionHandle(position)
    })

    const mouseMove = (e) => {
        const slider = refSlider.current
        const durationSpan = refDuration.current

        positionHandle(e.pageX)
        audio.currentTime = ((e.pageX - slider.offsetLeft) / slider.offsetWidth) * audio.duration
        
        let time = (Math.round(audio.currentTime)).toString()
        if (time.length === 1) { time = "0" + time }
        durationSpan.textContent = `0:${time} / 0:${duration}`
    }
    
    const mouseUp = (e) => {
        window.removeEventListener('mousemove', mouseMove)
        window.removeEventListener('mouseup', mouseUp)
    }
    
    const mouseDown = (e) => {
        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    return (
        <div className="player-div" id={pagePosition}>
            <div className="player">
                <div className="buttons">
                    <div className="bold">Song #{props.id}</div>
                    <div id="slider" ref={refSlider} onClick={mouseMove} />
                    <div id="handle" ref={refHandle} onMouseDown={mouseDown} />
                    <Icon id="btn" onClick={togglePlay} name={buttonSym} bordered inverted color='black'/>
                    <span ref={refDuration} id="duration">0:00 / 0:{duration}</span>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer

{/* <audio className="audio-control" controls>
<source src={props.url} type="audio/mpeg"/>
</audio> */}