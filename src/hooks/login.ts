import Login from '@/components/Login';
import useSWRImmutable from 'swr/immutable';
import {BASE_URL} from '@/const';

const fetcher = async (params:any) => {
  let optionHeader = {};
  if(params.input==="signin"){
    optionHeader = {
      method: 'POST',
      body: JSON.stringify({email:params.email,password:params.password}),
      headers: {
        'Content-Type': 'application/json' ,
      },
    }
  }
  if(params.email && params.password){
    const res = await fetch(BASE_URL + params.input, optionHeader);
    const data = await res.json();
    if(res.status===201){
      localStorage.setItem('token',data.token);
      return false;
    }
    return data;
  }
};
export default function useLogin(email:string,password:string){
  const { data } = useSWRImmutable({input:"signin",email,password}, fetcher);
  return data;
}