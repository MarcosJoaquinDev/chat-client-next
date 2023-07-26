import useSWRImmutable from 'swr/immutable';

import {BASE_URL} from '@/const';

const fetcher = async (input:string) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${getToken()}`);
  let options = {
    method: 'GET',
    headers: myHeaders,
  };
  const res = await fetch(BASE_URL + input, options);
  const data = await res.json();
  return data;
};
const useUserData=()=>{
  const { data } = useSWRImmutable("user", fetcher);
  return data;
}
const useChatsData=()=>{
  const { data } = useSWRImmutable("chat", fetcher);
  if(data){
    const {chats} =  data;
    return chats;
  }
}
const useChatMessages = (chatId:string) =>{
  const { data } = useSWRImmutable(`chat/${chatId}`, fetcher);
  if(data){
    const {roomId} =  data;
    return roomId;
  }
}

const fetcherSet = async (params:any) => {
  const {username,img,email,password} = params.newUser;
  let options = {
    method: 'POST',
    body:JSON.stringify({username,img,email,password}),
    headers: {
      'Content-Type': 'application/json' ,
    }
  };

  if(params.newUser){
    const res = await fetch(BASE_URL + params.input, options);
    const data = await res.json();
    return data;
  }
};
const useSetNewUser = (newUser:RegisterData|null)=>{
  const { data } = useSWRImmutable({input:"signup",newUser}, fetcherSet);
  if(data){
    return data;
  }
}
const getToken = ()=> localStorage.getItem("token");

export {useUserData, useChatsData, useChatMessages, useSetNewUser}