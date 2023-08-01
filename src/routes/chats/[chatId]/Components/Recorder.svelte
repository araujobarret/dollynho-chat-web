<script lang="ts">
	import SpeechRecognition, {
		useSpeechRecognition
	} from 'svelte-speech-recognition/SpeechRecognition'

	let status: 'record' | 'recording' = 'record'

	const { transcriptStore, listening, resetTranscript, browserSupportsSpeechRecognition } =
		useSpeechRecognition()

	const handleRecord = () => {
		if (status === 'record') {
			status = 'recording'
			return
		}
		status = 'record'
	}
</script>

<span class="recorder" on:click={handleRecord}>{status}</span>

<style>
	.recorder {
		cursor: pointer;
	}
</style>
