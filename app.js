document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
	const guitar = document.createElement('div')
	let guitarLeftSpace = 50
	let guitarBottomSpace = 250
	let isGameOver = false
	let stageCount = 5 
	let stages = []
	let upTimerId
	let downTimerId
	let isJumping = true
	let isGoingLeft = false
	let isGoingRight = false
	let leftTimerId
	let rightTimerId

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
		guitarLeftSpace = stages[0].left
		guitar.style.left = guitarLeftSpace + 'px';
		guitar.style.bottom = guitarBottomSpace + 'px';
	}
	
	function createStage() {
		for (let i = 0; i < stageCount; i++) {
			let stageGap = 600 / stageCount
			let newStageBottom = 100 + i * stageGap
			let newStage = new Stage(newStageBottom)
			stages.push(newStage)
			console.log(stages) 
		}
	} 

	function moveStages() {
		if (guitarBottomSpace > 200) {
			stages.forEach(stage => {
				stage.bottom -= 4
				let visual = stage.visual
				visual.style.bottom = stage.bottom + 'px '
			})
		}
	}

	function jump() {
		clearInterval(downTimerId)
		isJumping = true
		upTimerId = setInterval(function () {
			guitarBottomSpace += 20
			guitar.style.bottom  = guitarBottomSpace + 'px'
			if (guitarBottomSpace > 350) {
				fall()
			}
		},30)
	}


	function fall() {
		isJumping = false
		clearInterval(upTimerId)
		downTimerId = setInterval(function() {
			guitarBottomSpace -= 5
			guitar.style.bottom = guitarBottomSpace + 'px'
			if (guitarBottomSpace <= 0){
				gameOver()
			}
			stages.forEach(stage => {
				if (
					(guitarBottomSpace >= stage.bottom) &&
					(guitarBottomSpace <= (stage.bottom + 15)) &&
					((guitarLeftSpace + 60) >= stage.left) &&
		   			(guitarLeftSpace <= (stage.left + 85)) &&
					!isJumping
				) {
				console.log('landed')
				jump()
				}
			})
			
		},20)
	}

	function gameOver() {
		console.log("Game over")
		isGameOver = true
		clearInterval(upTimerId)
		clearInterval(downTimerId)
	}

	function control(e) {
		if (e.key === "ArrowLeft"){
			//mv left
		} else if (e.key === "ArrowRight"){
			//mv rg
		} else if (e.key === "ArrowUp"){
			// move straight
		}
	}


	function start() {
		if (!isGameOver) {
			createStage()
			createGuitar()
			setInterval(moveStages,30)
			jump()
		}
	}
//add button later 18:11
	start()

})