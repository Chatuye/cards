class StageObserver {
	constructor(stage, element, callBack) {
		this.stage = stage;
		this.element = element;
		this.callBack = callBack;

		this.observer = new MutationObserver(this.onMutation.bind(this));

		this.observer.observe(stage.div, { attributes: false, childList: true, characterData: false });
	}
	
	onMutation(mutations) {
		mutations.forEach(this.mutationHelper.bind(this));
	}

	mutationHelper(mutation) {
		if (Array.from(mutation.addedNodes).includes(this.element.div)) {
			//console.log("Element added: "+element.constructor.name);
			this.callBack();
			this.observer.disconnect();
			//console.log("Observer disconnected.");
		}
	}
}