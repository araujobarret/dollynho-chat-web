import { env } from '$env/dynamic/public'
import { split, ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { setClient } from 'svelte-apollo'

let client: ApolloClient<unknown>

const getApolloClient = () => {
	if (!client) {
		const httpLink = new HttpLink({
			uri: env.PUBLIC_GRAPHQL_URL ?? 'http://localhost:3001/graphql'
		})
		let link: ApolloLink

		if (typeof window !== 'undefined') {
			const wsLink = new GraphQLWsLink(
				createClient({
					url: 'ws://localhost:3001/graphql'
				})
			)
			link = split(
				({ query }) => {
					const definition = getMainDefinition(query)
					return (
						definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
					)
				},
				wsLink,
				httpLink
			)
		} else {
			link = httpLink
		}

		client = new ApolloClient({
			link,
			cache: new InMemoryCache()
		})
	}
	return client
}

export const setApolloClient = () => {
	const client = getApolloClient()
	setClient(client)
}
