export default function RPost({post, index}){
    return <div key={index} className='card'>
        <h3 >{post
        }</h3>
    </div>
}