<div class="super-container">
	<main class="container shadow-small">
		<div class="sub-container">
			<slot />
		</div>
	</main>
</div>

<style>
	.super-container {
		background-image: url($lib/img/background.png);
		background-repeat: repeat;
	}

	main {
		margin: auto;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		background-color: white;
		padding: 0 20px;
		overflow: hidden;
	}

	.sub-container {
		margin: 0;
		display: flex;
		flex: 1;
		width: 100%;
		flex-direction: column;
	}
</style>
