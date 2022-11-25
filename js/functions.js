/*=========================
Функції створення елементів
=========================*/

/*
<div id="start-block">
	<div id="game">	
		<button id="start-button">Start</button>
	</div>	
</div>
*/
//Створюємо загрузочну кнопку Strat 
function createStartBlock() {
	//створюємо startBlock
	startBlock = document.createElement("div");
	//присвоїмо id
	startBlock.id = "start-block";
	//створимо startButton
	startButton = document.createElement("button");
	//присвоїмо id
	startButton.id = "start-button";
	//в startButton запишемо текст
	startButton.innerText = "Start";
	//Додаємо елемент game в ігорове поле <div id="startBlock">
	startBlock.appendChild(startButton);
	//Додаємо елемент startBlock в ігорове поле <div id="igraPole">
	igraPole.appendChild(startBlock);
}

/*
<div id="star">Очки: 0</div>
*/
//Створюємо очки
function createOchkiBlock() {
	// створюємо блок div
	star = document.createElement("div");
	//Додаємо тегу div => id="star"
	star.id = "star";
	//в starn запишемо текст
	star.innerText = "Star: 0";
	//Додаємо елемент шар в ігорове поле <div id="game">
	igraPole.appendChild(star);
}

/* 
<div id="lifes">
	<span></span>
	<span></span>
	<span></span>
</div> 
*/
//Створюємо життя
function createLifesBlock() {
	// створюємо блок div
	lifes = document.createElement("div");
	//Додаємо тегу div => id="lifes"
	lifes.id = "lifes";
	//початкова кількість життів
	var tekucheeColichestvolifes = 0;
	while(tekucheeColichestvolifes < colichestvolifes) {
		//створюємо блок span
		var life = document.createElement("span");
		//додаємо id="span"
		life.id = "span";
		//додаємо в блок lifes - life
		lifes.appendChild(life);		
		tekucheeColichestvolifes = tekucheeColichestvolifes + 1;
		
	}	
	//Додаємо елемент життя в ігорове поле <div id="game">
	igraPole.appendChild(lifes);
}

/*
<h2>Таймер:<span id="clock">10</span></h2>
*/
//Створюємо таймер
function createTimerBlock() {
	//створюємо заголовок h2 з текстом Час:
	var h2 = document.createElement("h2");
	h2.id = "time";
	h2.innerText = "Time: ";
	//в коробку timerBlock додаємо тег span
	timerBlock = document.createElement("span");
	//прописуємо span id="timer" і текст 10
	timerBlock.id = "timer";
	timerBlock.innerText = "15";
	//додаємо в заголовок тег span
	h2.appendChild(timerBlock);
	//додаємо в інформаційний блок заголовок з таймером
	infoBlock.appendChild(h2);	
}

/* 
<div id="ball"></div>
*/
//Створюємо шар
function createBallBlock() {
	// створюємо блок div
	var ball = document.createElement("div");
	//створбємо рандомне число або 1 або 2
	var napravlenie = random(2); // 1 - left, 2 - right

	if(napravlenie == 1) {
		ball.className = "ball left"; //якщо випадає 1
	} else {
		ball.className = "ball right"; //якщо випадає 2
	}
	
	//при кліку на шар виконується функція clickBall
	ball.onmousemove = function() {
		//створимо умову для запобігання створення великої кількості шариків
		if(ball.className != "ball vatingDelete") {
			//збільшення очків гри
			ochki += 1;
			//змінюємо текст очків
			star.innerText = "Star:" + " " + ochki;
			//функція видалення та створення шара 
			setTimeout(function() {
				//видалити шар
				ball.remove();

				var suschestvuetBall = document.querySelector(".ball"); //
				if(suschestvuetBall == null) {
					//кількість шарів, які нам треба
					var colichestvoBall = random(3);
					//кількість шарів на полі
					var tekucheeColichestvoBall = 0;
					while(tekucheeColichestvoBall < colichestvoBall) {
						//створюємо шари на полі
						createBallBlock();
						tekucheeColichestvoBall = tekucheeColichestvoBall + 1;					
					}
				}
				
			}, 300)//кінець таймера
		}
		//Додаємо шару новий клас
		ball.className = "ball vatingDelete";		
	}; //кінець події onmousemove
	//створюємо шар в рандомному місці через 100 мілісекунд
	setTimeout(function() {
		ball.style.top = 100 + random(250) + "px";
		ball.style.left = 100 + random(450) + "px";
	}, 100)	
	//запустити рух шарика вниз і видалити його, якщо вийшов за поле
	//та віднімаємо життя
	setTimeout(function() {
		//прибираємо затримку зміни стилей
		ball.style.transition = "all 0s";
		//створюємо таймер який опускає шар
		var timerBall = setInterval(function() {
			if(ball.className == "ball left") {
				ball.style.top = ball.offsetTop + 2 + "px";
				ball.style.left = ball.offsetLeft + 1 + "px";
			} else {
				ball.style.top = ball.offsetTop + 2 + "px";
				ball.style.left = ball.offsetLeft - 1 + "px";
			}
			//змінюємо пизицію шарика опускаючи його на 1 позицію вниз
			
			//якщо шарик вийшов за межі поля
			if(ball.offsetTop > 420){
				//видаляємо шар
				ball.remove();
				//створюємо шар
				createBallBlock();
				//віднімаємо життя
				colichestvolifes = colichestvolifes - 1;
				if(colichestvolifes == 0) {
					endGame();
				}
				//видаляємо блок з життям
				deleteLifesBlock();
				//створюємо блок з життям
				createLifesBlock();
				//Видаляємо таймер
				clearInterval(timerBall);
				
			}
		}, 20)
	}, 1000)

	if(status != "endGame") {
		//Додаємо елемент шар в ігорове поле <div id="game">
		igraPole.appendChild(ball);
	}
	
}

/*
<div id="end-game">
	<h2>Гра закінчена</h2>
	<h3>Ви набрали: 100 очков</h3>
		
</div>
*/
//функція кінець гри
function createEndGame() {
	//створюємо блок <div id="end-game">
	var div = document.createElement("div");
	//прописуємо id = "end-game"
	div.id = "end-game";
	//створюємо <h2>Гра закінчена</h2>
	var h2 = document.createElement("h2");
	h2.innerText = "Game over"
	//створюємо <h3>Ви набрали: N очков</h3>
	var h3 = document.createElement("h3");;
	h3.innerText = "Your result: " + ochki + " stars";
	//Створимо кнопку <button>Start game</button>
	var buttonStartAgain = document.createElement("button");
	//прописуємо id = "buttonStartAgain"
	buttonStartAgain.id = "buttonStartAgain";
	//пропишемо текст в кнопці
	buttonStartAgain.innerText = "try again";
	//додаємо заголовок h2
	div.appendChild(h2);
	//додаємо заголовок h2
	div.appendChild(h3);
	//додаємо кнопку
	div.appendChild(buttonStartAgain);
	//додаємо div на ігрове поле
	igraPole.appendChild(div);
}

/*=========================
Функції видалення елементів
=========================*/

//функція идалення стартового блоку
function deleteGameBlock() {
	//Видаляємо блок
	startBlock.remove();
}

//функція идалення блоку з життям
function deleteLifesBlock() {
	//Видаляємо блок
	lifes.remove();
}

//функція идалення блоку з очками
function deleteOchkiBlock() {
	//Видаляємо блок
	star.remove();
}

//функція видалення таймера
function deleteTimerBlock() {
	//помістимо таймер в перемінну
	var delteTimer = document.querySelector("#time");
	//видалимо блок
	delteTimer.remove();
}

//функція очищення ігового поля
function clearIgraPole() {
	igraPole.innerText = "";
}

//функція видалення кінця гри
function deleteEndGame() {
	//помістимо кінець гри в перемінну
	var deleteKinecGame = document.querySelector("#end-game");
	//Видаляємо блок
	deleteKinecGame.remove();
}

/*==============
Функції загальні
==============*/

//Отримати випадкове число
function random(max) {
	// випадкове число від 1 до максимума
	var randomChislo = 1 + Math.random() * (max + 1);
	// округляємо до цілих число
	randomChislo = Math.floor(randomChislo);
	// повертаємо число
	return randomChislo;
}
