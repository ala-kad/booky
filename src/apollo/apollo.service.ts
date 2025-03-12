import { Injectable, OnModuleInit } from '@nestjs/common';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ExtractJwt } from 'passport-jwt';


@Injectable()
export class ApolloService extends ApolloClient<any> implements OnModuleInit{
       
    constructor() {
      super({
        cache: new InMemoryCache(),
        link: new HttpLink({ uri: 'http://localhost:8000/graphql' }), // Temporary link, will be replaced in onModuleInit
      });
    }
    
    async onModuleInit() {
      const httpLink = new HttpLink({
          uri: 'http://localhost:8000/graphql',
      });

      const token = ExtractJwt.fromAuthHeaderAsBearerToken();
    
      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            'content-type': 'application/json',
            'x-apollo-operation-name': 'some-operation-name', // Provide a non-empty value to enable persisted queries
          },
        };
      });
    
      this.link = authLink.concat(httpLink);
    }
   
     
}
