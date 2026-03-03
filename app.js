function attachEvents() {

    const textArea = document.getElementById('messages');
    const inputName = document.querySelector('input[name="author"]');
    const inputMessage = document.querySelector('input[name="content"]');
    const btnSend = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    const Url = 'http://localhost:3030/jsonstore/messenger';

    btnSend.addEventListener('click',sendMessage);
    refreshBtn.addEventListener('click',loadMessage);

    async function sendMessage(){
        try{
        const authorName = inputName.value;

        const txtMessage =  inputMessage.value;

        if(!authorName.trim() || !txtMessage.trim()){
            return;
        }
       const postObj = {
        author:authorName.trim(),
        content:txtMessage.trim()
       }

       const res = await fetch(Url,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(postObj)
       });
       if(!res.ok){
        throw new Error("Error while sending message");
       }
       await loadMessage();
       inputMessage.value = '';
    
    }
     catch(err){
        console.error(err);
        
     }
}
    async function loadMessage(){
        try{
        const res = await fetch(Url);
        if (!res.ok) {
         throw new Error("Error while loading messages");
           }
        const data = await res.json();
        const messages = Object.values(data);

        textArea.value = messages
         .map(m => `${m.author}: ${m.content}`)
         .join("\n");
        } catch(error){
           console.error(error);
        
    }
}
}
attachEvents();