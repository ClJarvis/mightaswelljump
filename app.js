document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
	const guitar = document.createElement('div')
	let guitarLeftSpace = 50
	let startPoint = 150
	let guitarBottomSpace = startPoint
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
	let score = 0
	let speed = 3 

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
				visual.style.bottom = stage.bottom + 'px'

				if(stage.bottom < 10) {
					let firstStage = stages[0].visual
					firstStage.classList.remove('stage')
					stages.shift()
					console.log(stages)
					score++
					var newStage = new Stage(600)
					stages.push(newStage)
				}


			})
		}
	}

	function jump() {
		clearInterval(downTimerId)
		isJumping = true
		upTimerId = setInterval(function () {
			guitarBottomSpace += 20
			guitar.style.bottom  = guitarBottomSpace + 'px'
			if (guitarBottomSpace > startPoint + 200) {
				fall()
				isJumping = false
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
				startPoint= guitarBottomSpace
				jump()
				isJumping = true
				}
			})
			
		},25)
	}

	function gameOver() {
		console.log("Game over")
		isGameOver = true
		while(grid.firstChild){
			grid.removeChild(grid.firstChild)
		}
		grid.innerHTML = score
		clearInterval(upTimerId)
		clearInterval(downTimerId)
		clearInterval(leftTimerId)
		clearInterval(rightTimerId)
	}

	function control(e) {
		guitar.style.bottom = guitarBottomSpace + 'px'
		if (e.key === "ArrowLeft"){
			moveLeft( )
		} else if (e.key === "ArrowRight"){
			moveRight()
		} else if (e.key === "ArrowUp"){
			moveStraight()
		}
	}

	function moveLeft() {
		if (isGoingLeft){
			clearInterval(rightTimerId)
			isGoingRight = false
		}
		isGoingLeft = true
		leftTimerId = setInterval(function () {
			if (guitarLeftSpace >= 0){
			guitarLeftSpace -= 5
			guitar.style.left = guitarLeftSpace + 'px'
		} else moveRight()
		},25)
	}

	function moveRight() {
		if (isGoingLeft) {
			clearInterval(leftTimerId)
			isGoingLeft = false
		}
		isGoingRight = true
		rightTimerId = setInterval(function () {
			 if (guitarLeftSpace <= 340) {
			 	guitarLeftSpace += 5
			 	guitar.style.left = guitarLeftSpace + 'px'
			 } else moveLeft()
		 },25)
	}

	function moveStraight() {
		isGoingRight = false
		isGoingLeft = false
		clearInterval(rightTimerId)
		clearInterval(leftTimerId)
	}

	function start() {
		if (!isGameOver) {
			createStage()
			createGuitar()
			setInterval(moveStages,30)
			jump(startPoint)
			document.addEventListener('keyup', control)
		}
	}
//add button later 18:11
	start()

})