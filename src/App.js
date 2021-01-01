import React from 'react'
import MusicPlayer from './MusicPlayer'

const sections = [
    {
        id: 1, 
        url: 'http://stark-effect.com/mashups23/mashup2.mp3',
        photo: require('../public/images/left.png'),
        position: "left"
    }, {
        id: 2,
        url: 'http://stark-effect.com/mashups23/mashup4.mp3',
        photo: require('../public/images/middle.png'),
        position: "middle"
    }, {
        id: 3,
        url: 'http://stark-effect.com/mashups23/mashup8.mp3',
        photo: require('../public/images/right.png'),
        position: "right"
    }
]

const renderMusicPlayers = () => {
    return sections.map(section => {
        return ( <MusicPlayer key={section.id} 
                              id={section.id}
                              url={section.url}
                              audio={new Audio(section.url)}
                              pagePosition={section.position}
                              photo={section.photo} />
                )
    })
}

const App = () => {
    return (
        <div id="main-div">
            <div id="top">
                <div id="text">
                    <div id="title">M A S H U P S</div>
                    <div id="content">
                        In each of these three clips you'll hear a mashup 
                        of <span className="bold">two songs</span>. For each song
                          you can hear, name <span className="bold">either</span> the 
                          artist or the song. One for each correct for a total 
                          of six points, one bonus point if you get them all correct, 
                          and three more if you name <span className="bold">both</span> the artist and the song for each.</div>
                </div>
            </div>
            {renderMusicPlayers()}
        </div>
    )
}

export default App
