class Stage {
	constructor() {
		this.div = document.createElement("div");
		this.div.className = "Stage";
		this.clientRect = null;

		let playerSide = document.createElement("div");
		playerSide.className = "PlayerSide";
		this.div.appendChild(playerSide);

		let opponentSide = document.createElement("div");
		opponentSide.className = "OpponentSide";
		this.div.appendChild(opponentSide);

		let spotLight = document.createElement("div");
		spotLight.className = "SpotLight";
		this.div.appendChild(spotLight);

		this.div.addEventListener("contextmenu", this.onContextMenu.bind(this));
		this.div.addEventListener("mousemove", this.onMouseMove.bind(this));
	}

	onObserve() {
		this.updateDimensions();
	}

	updateDimensions() {
		this.clientRect = this.div.getBoundingClientRect();

		card.height = Math.round(this.clientRect.height*card.relHeight);
		card.width = Math.round(card.height * card.sourceWidth/card.sourceHeight);

		if(this.clientRect.width * 0.14 < card.width) {
			card.width = this.clientRect.width * 0.14;
			card.height = card.width * (card.sourceHeight/card.sourceWidth);
		}
	}

	appendAndObserve(element, callBack) {
		var tempObserver = new StageObserver(this, element, callBack);
		this.div.appendChild(element.div);
	}

	onContextMenu(e) {
		e = e || window.event;
		e.preventDefault();
	}


	onMouseMove(e) {
//		var x = e.clientX - this.div.offsetLeft;
		var y = e.clientY - this.div.offsetTop;
		if(hand!=null) {
			if (y > hand.interactionHeightRaise) {
				hand.raise();

				if (draggedCard != null)
					draggedCard.toggleMode("card");
			} else if (y < hand.interactionHeightLower) {
				hand.lower();

				if (draggedCard != null)
					draggedCard.toggleMode("unit");
			}
		}
	}
}