var socket=io();

socket.on('newMsg', (newMsg) => {
   app.messages.push(newMsg);
});


const sampleMsg={
   from:'sample',
   text:'sample Text',
   createdAt:'2:43 am'
}

const app=new Vue({
   el:'#app',
   data(){
      return{
         messages:[]
      }
   },
   methods:{
      sumbit(e){
         const text = e.target.elements.message.value;
         const msg={from:'anonymous',text}
         socket.emit('createMsg', msg,function(){
            e.target.elements.message.value='';
         });
      }
   }
})






  
