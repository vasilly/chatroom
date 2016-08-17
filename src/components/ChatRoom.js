import React, { Component } from 'react'

class ChatRoom extends Component {
constructor(props, context){
  super(props, context)
  this.submit = this.submit.bind(this)
  this.updateUsername = this.updateUsername.bind(this)
  this.updateMessage = this.updateMessage.bind(this)
  this.state={
    username: '',
    message: '',
    thread: [],
  }
}
componentDidMount(){
  var _this = this
  var thread=[]
  console.log('ComponentDidMount');
  firebase.database().ref('messages/').on( 'value',
    (snapshot)=>{
      var currentThread = snapshot.val()
      console.log('componentDidMount-currentThread:'+currentThread )

      console.dir(currentThread);
      console.table(currentThread);
      var timestamps = Object.keys(currentThread).sort();
      console.log("timestamps");
      console.dir(timestamps);
timestamps.map(
  (timestamp)=>{
    thread.push(currentThread[timestamp])
  }
);
console.dir(thread);
      // timestamps.sort()
      // for(var i =0; i<timestamps.length;i++){
      //   var timestamp = timestamp[i]
      //   var pkg = currentThread[timestamp]
      //   thread.push(pkg)
      // }
      this.setState({
        thread: thread
      })

    }//end
  )
}

submit(event){
  var pkg ={
  username: this.state.username,
  message: this.state.message,
  id: Math.floor( Date.now()/1000 )

  }
  // submit to Fb
  firebase.database().ref('messages/'+pkg.id).set(pkg)
  console.log('pkg: ' +JSON.stringify(pkg))
  // var thread = Object.assign([], this.state.thread)
  // thread.push(pkg)
  // this.setState({
  //   thread: thread
  // })
  console.log('state: ' +JSON.stringify(this.state))
  console.table(this.state.thread)
  // console.dir(this.state)
}

updateMessage(event){
  console.log('updateMessage: '+event.target)
  this.setState({
    message:event.target.value
  })
}

updateUsername(event){
  console.log('updateUsername: '+event.target)
  this.setState({
    username:event.target.value
  })
}
  render(){
    var conversation = this.state.thread.map(
      function(msg, i){
        return (
          <li key={i} >{msg.message}</li>
        )
      }
    )
    return (
      <div>
        <p>This is the Chat Room 2!</p>
        <input onChange={this.updateUsername} id="username" type="text" placeholder="Username"/><br />
        <textarea onChange={this.updateMessage} id="message" placeholder="Message"/><br />
        <button onClick={this.submit}>Send Message</button>

        <h2>Conversation</h2>
        <ul>
          {conversation}
        </ul>
      </div>
    )
  }
}

export default ChatRoom
