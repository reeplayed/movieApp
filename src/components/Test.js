import React, {forwardRef} from 'react';
import posed from 'react-pose';
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps';

const MyComponent = () => {


  return (


      <GoogleMap
          defaultZoom={10}
          defaultCenter={{lat: 100.33, lng: 100.333}}

      />

)};

const WrappedMap = withScriptjs(withGoogleMap(MyComponent));
export default ()=>{
  return (
      <div style={{ width: "90vw", height: "80vh" }}>
        <WrappedMap
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCzuSdRVtpNzkDqnPd2NuF7x_4ZLR_92pc&callback=initMap'
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
  )}


// const [watch, setWatch] = useState(false);
// const key = 'AIzaSyD3WkcXiEOOADMgHo6ussO8j_tX50KaJhA';
//
// const [prod, setProd] = useState([]);

// useEffect(()=>{
//
//     document.querySelector('#chat-message-input').onkeyup = function(e) {
//                 if (e.keyCode === 13) {  // enter, return
//                     document.querySelector('#chat-message-submit').click();
//                 }
//             };
//
//
//     firebase.database().ref('posts/').limitToLast(5).on('value', (snapshot)=>{
//         let messagesObj = snapshot.val();
//         let messages = [];
//         Object.keys(messagesObj).forEach(key =>  messages.push(messagesObj[key]));
//         setProd(messages)
//     });
//
// },[]);
//
// const writeUserData = () => {
//     let messageInputDom = document.querySelector('#chat-message-input');
//     let message = messageInputDom.value;
//     firebase.database().ref('posts/').push({username: message});
//     console.log(prod)
// };

//
// const handleProgres = (state) => {
//     console.log(state)
// };

// const getIdFromURL = () => {
//     const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
//     const match = name.match(regExp);
//     setWatch((match&&match[7].length==11) ? match[7] : 'false');
// };
//
// const api = () => {
//     axios.get('https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM,MC3lyRxAMco&key='+key+'&fields=items(id,snippet(publishedAt,title,thumbnails/medium/url),statistics(viewCount,likeCount))&part=snippet,statistics')
//         .then(res => console.log(res.data))
//         .catch(err=>console.log(err))
// };
//
//

// useEffect( () => {
//     let  roomName = "{{ room_name|escapejs }}";
//
//     let chatSocket = new WebSocket(
//         'ws://127.0.0.1:8000/chat/2/');
//
//     chatSocket.onmessage = function(e) {
//         let data = JSON.parse(e.data);
//         let message = data['message'];
//         document.querySelector('#chat-log').value += (message + '\n');
//     };
//     chatSocket.onclose = function(e) {
//         console.error('Chat socket closed unexpectedly');
//     };
//
//     document.querySelector('#chat-message-input').focus();
//     document.querySelector('#chat-message-input').onkeyup = function(e) {
//         if (e.keyCode === 13) {  // enter, return
//             document.querySelector('#chat-message-submit').click();
//         }
//     };
//     document.querySelector('#chat-message-submit').onclick = function(e) {
//         let messageInputDom = document.querySelector('#chat-message-input');
//         let message = messageInputDom.value;
//         chatSocket.send(JSON.stringify({
//             'message': message
//         }));
//
//         messageInputDom.value = '';
//     };
//
// },[]);

//
// const [name,  setName] = useState( '');
//
// function FooModal() {
//     return <div>FOO</div>;
// }
//
// function BarModal() {
//     return <div>BAR</div>;
// }

// import React from 'react';

{
  /*<h1>Movie App</h1>*/
}
{
  /*<div className='player-wrapper'>*/
}
{
  /*    <ReactPlayer*/
}
{
  /*        className='react-player'*/
}
{
  /*        url='http://127.0.0.1:8000/media/movies/Feel_It_Still_-_Portugal_The_Man_60s_Mr_Postman_Style_Cover_ft_Joey_Adanna_Nina_Ann.mp4'*/
}
{
  /*        width='100%'*/
}
{
  /*        height='100%'*/
}
{
  /*        controls*/
}
{
  /*        onProgress={handleProgres}*/
}
{
  /*    />*/
}
{
  /*</div>*/
}

{
  /*<input type="text"*/
}
{
  /*           maxLength = {120}*/
}
{
  /*           placeholder="Set your name"*/
}
{
  /*           value={name}*/
}
{
  /*           onChange={e => setName(e.target.value)}/>*/
}

{
  /*<button onClick={getIdFromURL}>api</button>*/
}
{
  /*{watch}*/
}
{
  /*<BrowserRouter>*/
}
{
  /*    <div>*/
}
{
  /*        <Link to='/foo'>show foo</Link>*/
}
{
  /*        <Link to='/bar'>show bar</Link>*/
}

{
  /*        <ModalRoute component={FooModal} path='/foo' className='test-modal test-modal-foo'/>*/
}
{
  /*        <ModalRoute component={BarModal} path='/bar' className='test-modal test-modal-bar'/>*/
}
{
  /*        <ModalContainer />*/
}
{
  /*    </div>*/
}
{
  /*</BrowserRouter>*/
}

{
  /*<textarea id="chat-log" cols="100" rows="20"></textarea><br/>*/
}
{
  /*<input id="chat-message-input" type="text" size="100"/><br/>*/
}
{
  /*<input id="chat-message-submit" onClick={writeUserData} type="button" value="Send"/>*/
}
{
  /*<div className='card-container'>*/
}
{
  /*    <button onClick={writeUserData}>test</button>*/
}
{
  /*    {prod.map(prod => <h1>{prod.email} {prod.username}</h1>)}*/
}

{
  /*</div>*/
}
