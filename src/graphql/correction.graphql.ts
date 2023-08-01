import { gql } from '@apollo/client/core'

export type CorrectionQuery = {
	correctSentence: {
		correctedPhrase: string | null
		description: string | null
	}
}

export const CORRECTION = gql`
	query correctionQuery($sentence: String!) {
		correctSentence(sentence: $sentence) {
			correctedPhrase
			description
		}
	}
`
