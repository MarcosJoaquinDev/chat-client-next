import useSWRImmutable from 'swr/immutable';
import { BASE_URL } from '@/const';

const fetcher = async (params:any) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${getToken()}`);
  myHeaders.append('Content-Type', 'application/json');
  let options = {};
  if(params.input==="message"){
    options = {
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({chatId:params.id, message:params.message})
    };
  }
  const res = await fetch(BASE_URL + params.input, options);
  if(res.status===200) return true;
  const data = await res.json();
  return data;
};

const useSendMessages = (message:string,id:string) =>{
  const { data } = useSWRImmutable({input:"message",message,id}, fetcher);
  if(data){
    return data;
  }
}


const fetcherAdd = async (params:any)=>{
  let myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${getToken()}`);
  myHeaders.append("Content-Type","application/json");
  let options = {};
  if(params.input==="chat"){
    options = {
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({email:params.email,name:params.name}),
    };
  }
  if(params.name && params.email){

    const res = await fetch(BASE_URL + params.input, options);
    if(res.status==200) return true;
    const data = await res.json();
    return data.message;
  };
}
const useAddUser = (name:string,email:string) =>{
  const { data } = useSWRImmutable({input:"chat",name,email}, fetcherAdd);
  if(data){
    return data;
  }
}
const getToken = ()=> localStorage.getItem("token");
export {useSendMessages,useAddUser}