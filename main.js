var debugDiv = null;
var mainBody = null;
var cards = new Array();
var stage = null;
var hand = null;
var deck = null;
var spots = null;

var UIresizing = false;

var card = { sourceWidth: 235, sourceHeight: 330, relHeight: 0.25, width: 0, height: 0}

var draggedCard = null;

var documentObserver = null;

function onBodyLoad() {
	mainBody = document.getElementById("mainBody");
	
	debugDiv = document.createElement("div");
	debugDiv.className = "Debug";
	debugDiv.innerHTML = "Body loading...";
	
	mainBody.appendChild(debugDiv);
	
	stage = new Stage(mainBody);
	deck = new Deck();
	spots = new Array();
	let numSpots = 6;

	for(let i=0; i< numSpots; i++) {
		spots[i] = new Spot(i);
	}

	documentObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if(Array.from(mutation.addedNodes).includes(stage.div)) {
				stage.onObserve();
				
				hand = new Hand();
				stage.appendAndObserve(deck, deck.onObserve.bind(deck));
				for(let i=0; i<spots.length; i++)
					stage.appendAndObserve(spots[i], spots[i].onObserve.bind(spots[i]));
				
				documentObserver.disconnect();
			}
		});
	});
	
	documentObserver.observe(mainBody, { attributes: false, childList: true, characterData: false });

	mainBody.appendChild(stage.div);	
	debugDiv.innerHTML = "Body successfully loaded.";
}

function onBodyResize() {
	UIresizing = true;
	stage.updateDimensions();
	hand.updateDimensions();
	deck.updateDimensions();
	for(let i=0; i<spots.length; i++) {
		spots[i].updateDimensions();
	}
	for(let i=0; i<cards.length; i++) {
		cards[i].updateDimensions();
		if(cards[i].onSpot != null) {
			let t = cards[i].onSpot.div.style.left;
			cards[i].div.style.left = cards[i].onSpot.div.style.left;
			cards[i].div.style.top = cards[i].onSpot.div.style.top;
		}
	}

	hand.organizeCards();

	UIresizing = false;
}