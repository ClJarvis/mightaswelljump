document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
	const guitar = document.createElement('div')
	let guitarLeftSpace = 50
	let guitarBottomSpace = 150
	let isGameOver = false
	let stageCount = 5 

	class Stage {
		constructor(newStageBottom) {
			this.bottom = newStageBottom
			this.left = Math.random() * 315
			this.visual = document.createElement('div')

			const visual = this.visual
			visual.classList.add('stage')
			visual.style.left = this.left + 'px'
			visual.style.bottom = this.bottom + 'px'
			grid.appendChild(visual)
		}
	}

	function createGuitar() {
		grid.appendChild(guitar)
		guitar.classList.add('guitar')
		guitar.style.left = guitarLeftSpace + 'px';
		guitar.style.bottom = guitarBottomSpace + 'px';
	}
	
	function createStage() {
		for (let i = 0; i < stageCount; i++) {
			let stageGap = 600 / stageCount
			let newStageBottom = 100 + i * stageGap
			let newStage = new Stage(newStageBottom)
		}
	} 

	function start() {
		if (!isGameOver) {
			createGuitar()
			createStage()
		}
	}
//add button later 18:11
	start()

})