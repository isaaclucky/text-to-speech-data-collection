import React, {useEffect, useState} from 'react'
import sample from './sample'
import ReactAudioPlayer from "react-audio-player";
import './Data.css'

const j = [
    {
        'id': 1,
        'json_id':45213,
        'text':"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit voluptas facilis laudantium sapiente qui iste numquam hic, architecto necessitatibus, cupiditate sunt labore quo impedit a, commodi officiis excepturi id fugiat.",
        'audio_url':sample
    },
    {
        'id': 2,
        'json_id':26987,
        'text':"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit voluptas facilis laudantium sapiente qui iste numquam hic, architecto necessitatibus, cupiditate sunt labore quo impedit a, commodi officiis excepturi id fugiat.",
        'audio_url':sample
    },
    {
        'id': 3,
        'json_id':15826,
        'text':"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit voluptas facilis laudantium sapiente qui iste numquam hic, architecto necessitatibus, cupiditate sunt labore quo impedit a, commodi officiis excepturi id fugiat.",
        'audio_url':sample
    },
    {
        'id': 4,
        'json_id':17468,
        'text':"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit voluptas facilis laudantium sapiente qui iste numquam hic, architecto necessitatibus, cupiditate sunt labore quo impedit a, commodi officiis excepturi id fugiat.",
        'audio_url':sample
    },
    {
        'id':5,
        'json_id':235,
        'text':"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit voluptas facilis laudantium sapiente qui iste numquam hic, architecto necessitatibus, cupiditate sunt labore quo impedit a, commodi officiis excepturi id fugiat.",
        'audio_url':sample
    }
]


export default function Data() {
    const[data, setData] = useState([])

    useEffect(()=>{
        getData()
    },[])


    function getData(){
        setData(j)
    }

  return (
    <div className='data-div'>
        <table id="data">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>JSON ID</th>
                    <th>Text Corpus</th>
                    <th>Audio Version</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d)=>(
                    <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.json_id}</td>
                        <td>{d.text}</td>
                        <td>
                            <ReactAudioPlayer
                                src={d.audio_url}
                                // autoPlay
                                controls
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
    </div>
  )
}
