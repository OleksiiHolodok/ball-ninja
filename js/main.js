//функція початку гри
function startGame() {
	//створюємо стартовий блок
	createStartBlock();
	//виконуєм функцію при нажиманні на кнопку
	startButton.onclick = nachat;	
}

//функція додавання елементів в гру
function nachat() {
	status = "nachat";
	//видаляємо кнопку
	deleteGameBlock();
	//створюємо таймер
	createTimerBlock();
	//створюжмо очки
	createOchkiBlock();
	//створюємо життя
	createLifesBlock();
	//створюємо шар
	createBallBlock();
	//запускаємо таймер
	timerIgra();
}

//починаємо гру
startGame();

//функція яка викликається в кінці гри
function endGame() {
	status = "endGame";
	//видаляємо життя
	deleteLifesBlock();
	//видаляємо очки
	deleteOchkiBlock();
	//очищуємо поле від шариків
	clearIgraPole();
	//видаляємо таймер
	deleteTimerBlock();
	//створюємо кінець гри
	createEndGame();
	//виконуєм функцію при нажиманні на кнопку
	buttonStartAgain.onclick = startGameAgain;
}

//починаємо гру знову
function startGameAgain() {
	//обнуляєм очки
	ochki = 0;
	//обн
	colichestvolifes = 4;
	//видаляєм кінець гри
	deleteEndGame();
	//створюємо стартовий блок
	nachat();
}

//Функція таймеру
function timerIgra() {
	//створюємо таймер
	var chasy = setInterval(function() {
		//змінюємо текст в таймер блоке
		timerBlock.innerText = timerBlock.innerText - 1;
		if(timerBlock.innerText == 0) {
			//видаляємо таймер
			clearInterval(chasy);
			//завершаємо гру			
			endGame();
		}
	}, 1000);
}







