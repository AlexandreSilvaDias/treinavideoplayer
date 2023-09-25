import React from "react";
import Video from "./Video";

const _list = [
    {
        id: 2,
        title: 'Lions',
        duration: 37,
        url: 'https://v3.cdnpk.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4',
        cover: 'https://media.istockphoto.com/id/494856046/pt/foto/le%C3%A3o-em-alta-relva.jpg?s=1024x1024&w=is&k=20&c=-2MCGmaLNBpIUUv3iXBiVoKzXBupM6ZAra3UnEmyqig='
    },
    {
        id: 5,
        title: 'Lions',
        duration: 37,
        url: 'https://v3.cdnpk.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4',
        cover: 'https://media.istockphoto.com/id/494856046/pt/foto/le%C3%A3o-em-alta-relva.jpg?s=1024x1024&w=is&k=20&c=-2MCGmaLNBpIUUv3iXBiVoKzXBupM6ZAra3UnEmyqig='
    },
    {
        id: 8,
        title: 'Lions',
        duration: 37,
        url: 'https://v3.cdnpk.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4',
        cover: 'https://media.istockphoto.com/id/494856046/pt/foto/le%C3%A3o-em-alta-relva.jpg?s=1024x1024&w=is&k=20&c=-2MCGmaLNBpIUUv3iXBiVoKzXBupM6ZAra3UnEmyqig='
    }
]

export default function VideoList() {

    function onClick(video) {
        console.log(video);
    }

    return(
        <ul className="list">
            {
                _list.map(item => (
                    <Video key={item.id} onClick={onClick} video={item} />
                ))
            }
        </ul>
    );
}