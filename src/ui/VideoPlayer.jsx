import React, {useRef, useEffect, useState} from "react";
import { TimeService } from "../data/services/TimeService";

const _selectedVideo = {
    id: 2,
    title: 'Lions',
    duration: 37,
    url: 'https://v3.cdnpk.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4',
    cover: 'https://media.istockphoto.com/id/494856046/pt/foto/le%C3%A3o-em-alta-relva.jpg?s=1024x1024&w=is&k=20&c=-2MCGmaLNBpIUUv3iXBiVoKzXBupM6ZAra3UnEmyqig='
};

export default function VideoPlayer() {
    const video = _selectedVideo;
    const videoRef = useRef();
    const progressTimer = useRef();
    const [isPlaying, setPlay] = useState(false);
    const [progress, setProgress] = useState(0)

    useEffect(() => {
       const videoElememt = videoRef.current;
       videoElememt.addEventListener('play', play);
       videoElememt.addEventListener('pause', pause);
       videoElememt.addEventListener('seeked', onProgress);
       setTime(0);
       pause();

       return () => {
           videoElememt.removeEventListener('play', play);
           videoElememt.removeEventListener('pause', pause);
           videoElememt.removeEventListener('seeked', onProgress);
       }
    }, [video])

    useEffect(() => {
        clearInterval(progressTimer.current);
        if(isPlaying) {
            progressTimer.current = setInterval(onProgress, 1000);
        }

    }, [isPlaying])

    function play() {
        videoRef.current.play();
        setPlay(true);
    }
    function pause() {
        videoRef.current.pause();
        setPlay(false);
    }
    function onProgress() {
        setProgress(videoRef.current.currentTime);
    }
    function onChangeProgress(event) {
        setTime(event.target.value);
    }
    function setTime(time) {
        videoRef.current.currentTime = time;
        onProgress();
    }

    return(
        <div className="video-player">
            <video src={video.url}  ref={videoRef}/>
            {video.url && (
                <>
                    <div className="controls">
                        <button onClick={isPlaying ? pause : play}>{isPlaying ? '||' : '|>'}</button>
                        <span>{TimeService.formatTime(Math.round(progress))} / {TimeService.formatTime(video.duration)}</span>
                        <input type="range" value={progress} onChange={onChangeProgress} min={0} max={video.duration} step={.1} />
                    </div>
                    <h2>{video.title}</h2>
                </>
            )}
            
        </div>
    )
}