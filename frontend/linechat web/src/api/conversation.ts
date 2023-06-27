import axios from 'axios';
import { Conversation } from '../types/conversationType';
import { QueryFunctionContext, useQuery } from 'react-query';


async function fetchConversations({ queryKey }: QueryFunctionContext) {

  const [_, username, bearerToken] = queryKey
  const response = await axios.get<Conversation[]>(import.meta.env.VITE_API_URL + "/message/conversations/" + username, {
    headers: {
      Authorization: bearerToken as string,
    }
  });
  return response.data;
}

export const useConversationData = (username: string, bearerToken: string, enabled: boolean) => {
  return useQuery<Conversation[]>(['conversations', username, bearerToken], fetchConversations, {
    enabled: enabled,
  })
}