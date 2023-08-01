// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface BotType {
		id: string
		name: string
		description?: string
		subject: string
		level: string
		imageSrc: string
	}

	interface UserType {
		id: string
		name: string
		imageSrc: string
	}

	interface ConversationType {
		id: string
		bot: BotType
		user: UserType
		messages: MessageType[]
		createdAt: string
	}

	interface ConversationsConnectionType {
		edges: ConversationType[]
	}

	interface MessagesConnectionType {
		edges: MessageType[]
	}

	interface MessageType {
		id: string
		body: string
		sequence: number
		role: string
		createdAt: string
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
