import React, {useRef, useEffect, useState, useContext, useMemo} from "react";
import { TimeService } from "../data/services/TimeService";
import { videoStore } from "../data/video/VideoContext";

export default function VideoPlayer() {
    const [videoState] = useContext(videoStore);

    const video = videoState.selectedVideo;
    const videoRef = useRef();
    const progressTimer = useRef();
    const [isPlaying, setPlay] = useState(false);
    const [progress, setProgress] = useState(0);
    const totalTime = useMemo(() => TimeService.formatTime(video.duration), [video]);

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
                        <span>{TimeService.formatTime(Math.round(progress))} / { totalTime }</span>
                        <input type="range" value={progress} onChange={onChangeProgress} min={0} max={video.duration} step={.1} />
                    </div>
                    <h2>{video.title}</h2>
                </>
            )}
            
        </div>
    )
}